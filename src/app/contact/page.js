"use client";
import { useState } from "react";
import Link from "next/link";
import PageShell from "../components/PageShell";
import { ServiceIcon } from "../components/Icons";

// Dynamic form fields per service type
const serviceFields = {
  weddings: ["eventDate", "venueLocation", "guests", "budget", "notes"],
  family: ["eventDate", "venueLocation", "guests", "budget", "notes"],
  corporate: ["organizationName", "eventFormat", "eventDate", "attendeeCount", "avNeeds", "venueLocation", "notes"],
  memorials: ["funeralType", "eventDate", "venueLocation", "guests", "notes"],
  islamic: ["eventDate", "venueLocation", "guests", "notes"],
  vip: ["eventDate", "venueLocation", "budget", "notes"],
};

const funeralTypes = {
  en: ["Funeral Coordination", "Condolence Gathering", "Memorial Ceremony", "Janazah (Islamic Funeral)", "Cemetery Arrangements"],
  ar: ["تنسيق مراسم الجنازة", "بيت العزاء", "حفل التأبين", "مراسم الجنازة الإسلامية", "ترتيبات المقبرة"],
};

const eventFormats = {
  en: ["Conference", "Gala Dinner", "Product Launch", "Seminar", "Workshop", "Diplomatic Event"],
  ar: ["مؤتمر", "عشاء رسمي", "إطلاق منتج", "ندوة", "ورشة عمل", "حدث دبلوماسي"],
};

function buildWhatsAppMessage(formData, selectedService, lang, t) {
  const isAr = lang === "ar";
  const svcLabel = t.serviceCategories[selectedService]?.label || selectedService;
  if (isAr) {
    return encodeURIComponent(`مرحباً وصال،\nأود الاستفسار عن خدمة: ${svcLabel}\n\nالاسم: ${formData.fullName}\nالهاتف: ${formData.phone}\nالتاريخ: ${formData.eventDate || "غير محدد"}\nالمكان: ${formData.venueLocation || "غير محدد"}\n\n${formData.notes || ""}`);
  }
  return encodeURIComponent(`Hello WISAL,\nI'm inquiring about: ${svcLabel}\n\nName: ${formData.fullName}\nPhone: ${formData.phone}\nDate: ${formData.eventDate || "TBD"}\nVenue: ${formData.venueLocation || "TBD"}\n\n${formData.notes || ""}`);
}

function ContactContent({ lang, t }) {
  const isAr = lang === "ar";
  const [step, setStep] = useState(0); // 0=urgency, 1=service, 2=details, 3=contact, 4=confirm
  const [isUrgent, setIsUrgent] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "", phone: "", whatsapp: "", email: "",
    eventDate: "", venueLocation: "", guests: "", budget: "", notes: "",
    funeralType: "", organizationName: "", eventFormat: "", attendeeCount: "", avNeeds: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const stepCount = 5; // 0-4

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, service: selectedService, urgent: isUrgent, language: lang, submittedAt: new Date().toISOString() }),
      });
      setSubmitStatus(res.ok ? "success" : "error");
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields = selectedService ? (serviceFields[selectedService] || []) : [];

  // Wizard step progress indicator
  const WizardProgress = () => (
    <div className="wizard-progress">
      {t.stepLabels.map((label, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", flex: 1, flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            {i > 0 && (
              <div className={`wizard-connector ${step > i - 1 ? "done" : ""}`} />
            )}
            <div className={`wizard-step-circle ${step === i ? "active" : ""} ${step > i ? "done" : ""}`}
              style={{
                width: 34, height: 34, borderRadius: "50%",
                border: `2px solid ${step >= i ? "var(--gold)" : "var(--border-color)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "var(--text-sm)", fontWeight: 600,
                background: step > i ? "var(--gold)" : step === i ? "var(--gold-gradient)" : "var(--bg-color)",
                color: step >= i ? "#0d0e10" : "var(--text-muted)",
                flexShrink: 0,
                transition: "all 0.3s",
              }}
            >
              {step > i ? "✓" : i + 1}
            </div>
            {i < stepCount - 1 && (
              <div className={`wizard-connector ${step > i ? "done" : ""}`} />
            )}
          </div>
          <span className="wizard-step-label" style={{ marginTop: "0.4rem" }}>{label}</span>
        </div>
      ))}
    </div>
  );

  // — Step 0: Urgency —
  if (step === 0) {
    return (
      <>
        <UrgencyBanner isAr={isAr} t={t} />
        <div className="contact-page">
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
              <span className="section-label">09 // {isAr ? "طلب الخدمة" : "Service Request"}</span>
              <h1 className="display-title" style={{ color: "var(--gold)", marginBottom: "0.75rem" }}>{t.contactTitle}</h1>
              <p className="body-text">{t.contactSubtitle}</p>
            </div>
            <WizardProgress />
            <div className="wizard-panel">
              <h2 style={{ fontFamily: isAr ? "var(--font-arabic)" : "var(--font-display)", fontSize: "var(--text-3xl)", textAlign: "center", marginBottom: "0.5rem" }}>
                {t.urgentQuestion}
              </h2>
              <p className="body-text" style={{ textAlign: "center", maxWidth: 420, margin: "0 auto" }}>
                {isAr ? "هذا يساعدنا على توفير الدعم الفوري لك في حالات الطوارئ." : "This helps us provide immediate support for time-sensitive situations."}
              </p>
              <div className="urgency-card-group">
                {/* YES — Urgent */}
                <div
                  className="urgency-card"
                  onClick={() => { setIsUrgent(true); setStep(1); }}
                >
                  <span className="urgency-card-icon" style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
                    <ServiceIcon slug="urgent" size={40} color="var(--gold)" />
                  </span>
                  <div className="urgency-card-title">{t.urgentYes}</div>
                  <p className="urgency-card-sub" style={{ fontFamily: isAr ? "var(--font-arabic)" : "var(--font-body)" }}>
                    {isAr ? "مناسبة عاجلة أو طارئة تحتاج مساعدة فورية" : "Urgent event or emergency needing immediate help"}
                  </p>
                </div>
                {/* NO — Planning */}
                <div
                  className="urgency-card"
                  onClick={() => { setIsUrgent(false); setStep(1); }}
                >
                  <span className="urgency-card-icon" style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
                    <ServiceIcon slug="planning" size={40} color="var(--gold)" />
                  </span>
                  <div className="urgency-card-title">{t.urgentNo}</div>
                  <p className="urgency-card-sub" style={{ fontFamily: isAr ? "var(--font-arabic)" : "var(--font-body)" }}>
                    {isAr ? "أخطط لمناسبة قادمة وأريد الاستفسار" : "Planning a future event and want to inquire"}
                  </p>
                </div>
              </div>

              {/* Urgent contact info box */}
              <div className="urgent-info-box" style={{ marginTop: "3rem" }}>
                <div className="urgent-info-title">
                  {isAr ? "تحتاج مساعدة فورية الآن؟" : "Need Immediate Help Right Now?"}
                </div>
                <p className="urgent-info-desc" style={{ fontFamily: isAr ? "var(--font-arabic)" : "var(--font-body)" }}>
                  {t.urgentMsg}
                </p>
                <div className="urgent-actions">
                  <a href="tel:+96265000000" className="urgent-btn-call">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 5.9 5.9l.51-.51a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 16.92z" />
                    </svg>
                    {t.urgentCallNow}: +962 6 500 0000
                  </a>
                  <a href="https://wa.me/962790000000" target="_blank" rel="noopener noreferrer" className="urgent-btn-wa">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                    {t.urgentWhatsApp}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // — Step 1: Service Selection —
  if (step === 1) {
    return (
      <>
        <UrgencyBanner isAr={isAr} t={t} />
        <div className="contact-page">
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
              <span className="section-label">09 // {isAr ? "طلب الخدمة" : "Service Request"}</span>
              <h1 className="display-title" style={{ color: "var(--gold)", marginBottom: "0.75rem" }}>{t.contactTitle}</h1>
            </div>
            <WizardProgress />
            <div className="wizard-panel">
              <h2 style={{ fontFamily: isAr ? "var(--font-arabic)" : "var(--font-display)", fontSize: "var(--text-2xl)", marginBottom: "0.5rem", textAlign: "center" }}>
                {t.selectService}
              </h2>
              <p className="body-text" style={{ textAlign: "center" }}>{t.selectServiceSub}</p>
              <div className="service-selection-grid">
                {Object.entries(t.serviceCategories).map(([key, cat]) => (
                  <div
                    key={key}
                    className={`service-option ${selectedService === key ? "selected" : ""}`}
                    onClick={() => setSelectedService(key)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && setSelectedService(key)}
                  >
                    <span className="service-option-icon" style={{ display: "block", marginBottom: "0.75rem" }}>
                      <ServiceIcon slug={key} size={28} color="var(--gold)" />
                    </span>
                    <div className="service-option-label">{cat.label}</div>
                    <p className="service-option-desc">{cat.desc}</p>
                  </div>
                ))}
              </div>
              <div className="wizard-actions">
                <button className="btn-outline" onClick={() => setStep(0)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                  {t.back}
                </button>
                <button
                  className="btn-primary"
                  disabled={!selectedService}
                  onClick={() => selectedService && setStep(2)}
                  style={{ opacity: selectedService ? 1 : 0.5, cursor: selectedService ? "pointer" : "not-allowed" }}
                >
                  {t.next}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // — Step 2: Service Details —
  if (step === 2) {
    const svc = t.serviceCategories[selectedService];
    return (
      <>
        <UrgencyBanner isAr={isAr} t={t} />
        <div className="contact-page">
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
              <span className="section-label" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                <ServiceIcon slug={selectedService} size={14} color="var(--gold)" /> {svc?.label}
              </span>
              <h1 className="display-title" style={{ color: "var(--gold)", marginBottom: "0.75rem" }}>{t.fillDetails}</h1>
              <p className="body-text">{t.fillDetailsSub}</p>
            </div>
            <WizardProgress />
            <div className="wizard-panel">
              <div className="form-grid">
                {fields.includes("organizationName") && (
                  <div className="form-group full">
                    <label className="form-label">{t.form.organizationName}</label>
                    <input className="form-input" name="organizationName" value={formData.organizationName} onChange={handleInput} />
                  </div>
                )}
                {fields.includes("funeralType") && (
                  <div className="form-group full">
                    <label className="form-label">{t.form.funeralType}</label>
                    <select className="form-select" name="funeralType" value={formData.funeralType} onChange={handleInput}>
                      <option value="">—</option>
                      {funeralTypes[lang].map((opt, i) => (
                        <option key={i} value={funeralTypes.en[i]}>{opt}</option>
                      ))}
                    </select>
                  </div>
                )}
                {fields.includes("eventFormat") && (
                  <div className="form-group full">
                    <label className="form-label">{t.form.eventFormat}</label>
                    <select className="form-select" name="eventFormat" value={formData.eventFormat} onChange={handleInput}>
                      <option value="">—</option>
                      {eventFormats[lang].map((opt, i) => (
                        <option key={i} value={eventFormats.en[i]}>{opt}</option>
                      ))}
                    </select>
                  </div>
                )}
                {fields.includes("eventDate") && (
                  <div className="form-group">
                    <label className="form-label">{t.form.eventDate}</label>
                    <input className="form-input" type="date" name="eventDate" value={formData.eventDate} onChange={handleInput} />
                  </div>
                )}
                {fields.includes("venueLocation") && (
                  <div className="form-group">
                    <label className="form-label">{t.form.venueLocation}</label>
                    <input className="form-input" name="venueLocation" value={formData.venueLocation} onChange={handleInput} />
                  </div>
                )}
                {fields.includes("guests") && (
                  <div className="form-group">
                    <label className="form-label">{t.form.guests}</label>
                    <input className="form-input" type="number" name="guests" value={formData.guests} onChange={handleInput} />
                  </div>
                )}
                {fields.includes("attendeeCount") && (
                  <div className="form-group">
                    <label className="form-label">{t.form.attendeeCount}</label>
                    <input className="form-input" type="number" name="attendeeCount" value={formData.attendeeCount} onChange={handleInput} />
                  </div>
                )}
                {fields.includes("budget") && (
                  <div className="form-group">
                    <label className="form-label">{t.form.budget}</label>
                    <input className="form-input" name="budget" value={formData.budget} onChange={handleInput} placeholder={isAr ? "مثال: 5000 دينار" : "e.g. JOD 5,000"} />
                  </div>
                )}
                {fields.includes("avNeeds") && (
                  <div className="form-group full">
                    <label className="form-label">{t.form.avNeeds}</label>
                    <input className="form-input" name="avNeeds" value={formData.avNeeds} onChange={handleInput} placeholder={isAr ? "مثال: شاشات عرض، معدات صوت..." : "e.g. Projectors, PA system..."} />
                  </div>
                )}
                {fields.includes("notes") && (
                  <div className="form-group full">
                    <label className="form-label">{t.form.notes}</label>
                    <textarea className="form-textarea" name="notes" value={formData.notes} onChange={handleInput} rows={4} />
                  </div>
                )}
              </div>
              <div className="wizard-actions">
                <button className="btn-outline" onClick={() => setStep(1)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                  {t.back}
                </button>
                <button className="btn-primary" onClick={() => setStep(3)}>
                  {t.next}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // — Step 3: Contact Info —
  if (step === 3) {
    return (
      <>
        <UrgencyBanner isAr={isAr} t={t} />
        <div className="contact-page">
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
              <span className="section-label">09 // {isAr ? "معلومات التواصل" : "Contact Information"}</span>
              <h1 className="display-title" style={{ color: "var(--gold)", marginBottom: "0.75rem" }}>{t.yourInfo}</h1>
              <p className="body-text">{t.yourInfoSub}</p>
            </div>
            <WizardProgress />
            <div className="wizard-panel">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">{t.form.fullName} *</label>
                  <input className="form-input" name="fullName" value={formData.fullName} onChange={handleInput} required />
                </div>
                <div className="form-group">
                  <label className="form-label">{t.form.phone} *</label>
                  <input className="form-input" type="tel" name="phone" value={formData.phone} onChange={handleInput} required />
                </div>
                <div className="form-group">
                  <label className="form-label">{t.form.whatsapp}</label>
                  <input className="form-input" type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleInput} placeholder={isAr ? "اختياري" : "Optional"} />
                </div>
                <div className="form-group">
                  <label className="form-label">{t.form.email}</label>
                  <input className="form-input" type="email" name="email" value={formData.email} onChange={handleInput} />
                </div>
              </div>
              <div className="wizard-actions">
                <button className="btn-outline" onClick={() => setStep(2)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                  {t.back}
                </button>
                <button
                  className="btn-primary"
                  disabled={!formData.fullName || !formData.phone}
                  onClick={() => (formData.fullName && formData.phone) && setStep(4)}
                  style={{ opacity: (formData.fullName && formData.phone) ? 1 : 0.5, cursor: (formData.fullName && formData.phone) ? "pointer" : "not-allowed" }}
                >
                  {t.next}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // — Step 4: Confirm / Submit —
  if (step === 4) {
    const svc = t.serviceCategories[selectedService];
    const waMsg = buildWhatsAppMessage(formData, selectedService, lang, t);

    if (submitStatus === "success") {
      return (
        <div className="contact-page">
          <div className="container">
            <div className="wizard-panel" style={{ textAlign: "center", padding: "4rem 0" }}>
              <div className="submit-success-icon">✓</div>
              <h2 style={{ fontFamily: isAr ? "var(--font-arabic)" : "var(--font-display)", fontSize: "var(--text-3xl)", color: "var(--gold)", marginBottom: "1rem" }}>
                {isAr ? "تم استلام طلبك!" : "Request Received!"}
              </h2>
              <p className="body-text" style={{ maxWidth: 480, margin: "0 auto 2.5rem" }}>{t.success}</p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/" className="btn-outline">{isAr ? "العودة للرئيسية" : "Back to Home"}</Link>
                <a href={`https://wa.me/962790000000?text=${waMsg}`} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  {t.orWhatsApp}
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        <UrgencyBanner isAr={isAr} t={t} />
        <div className="contact-page">
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
              <span className="section-label">09 // {isAr ? "مراجعة الطلب" : "Review & Confirm"}</span>
              <h1 className="display-title" style={{ color: "var(--gold)", marginBottom: "0.75rem" }}>{t.reviewRequest}</h1>
              <p className="body-text">{t.reviewSub}</p>
            </div>
            <WizardProgress />
            <div className="wizard-panel">
              <div className="confirm-block">
                <div className="confirm-row">
                  <span className="confirm-key">{isAr ? "الخدمة" : "Service"}</span>
                  <span className="confirm-val" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    <ServiceIcon slug={selectedService} size={14} color="var(--gold)" /> {svc?.label}
                  </span>
                </div>
                <div className="confirm-row">
                  <span className="confirm-key">{isAr ? "الاسم" : "Name"}</span>
                  <span className="confirm-val">{formData.fullName}</span>
                </div>
                <div className="confirm-row">
                  <span className="confirm-key">{isAr ? "الهاتف" : "Phone"}</span>
                  <span className="confirm-val">{formData.phone}</span>
                </div>
                {formData.email && (
                  <div className="confirm-row">
                    <span className="confirm-key">{isAr ? "البريد" : "Email"}</span>
                    <span className="confirm-val">{formData.email}</span>
                  </div>
                )}
                {formData.eventDate && (
                  <div className="confirm-row">
                    <span className="confirm-key">{isAr ? "التاريخ" : "Date"}</span>
                    <span className="confirm-val">{formData.eventDate}</span>
                  </div>
                )}
                {formData.venueLocation && (
                  <div className="confirm-row">
                    <span className="confirm-key">{isAr ? "المكان" : "Venue"}</span>
                    <span className="confirm-val">{formData.venueLocation}</span>
                  </div>
                )}
                {formData.guests && (
                  <div className="confirm-row">
                    <span className="confirm-key">{isAr ? "عدد الحضور" : "Guests"}</span>
                    <span className="confirm-val">{formData.guests}</span>
                  </div>
                )}
                {formData.budget && (
                  <div className="confirm-row">
                    <span className="confirm-key">{isAr ? "الميزانية" : "Budget"}</span>
                    <span className="confirm-val">{formData.budget}</span>
                  </div>
                )}
                {formData.notes && (
                  <div className="confirm-row">
                    <span className="confirm-key">{isAr ? "ملاحظات" : "Notes"}</span>
                    <span className="confirm-val">{formData.notes}</span>
                  </div>
                )}
              </div>

              {submitStatus === "error" && (
                <div style={{ marginTop: "1.5rem", padding: "1rem 1.5rem", border: "1px solid #8c2a2a", borderRadius: "8px", background: "rgba(140,42,42,0.04)", color: "#8c2a2a", fontSize: "var(--text-sm)", textAlign: "center" }}>
                  ⚠️ {t.error}
                </div>
              )}

              <div className="wizard-actions" style={{ flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                  <button className="btn-outline" onClick={() => setStep(3)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                    {t.back}
                  </button>
                  <button className="btn-primary" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? t.submitting : t.submitRequest}
                    {!isSubmitting && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                    )}
                  </button>
                </div>

                {/* OR WhatsApp Alternative */}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", width: "100%" }}>
                  <div style={{ flex: 1, height: "1px", background: "var(--border-subtle)" }} />
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "2px" }}>
                    {isAr ? "أو" : "or"}
                  </span>
                  <div style={{ flex: 1, height: "1px", background: "var(--border-subtle)" }} />
                </div>

                <a
                  href={`https://wa.me/962790000000?text=${waMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                  {t.orWhatsApp}
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
}

function UrgencyBanner({ isAr, t }) {
  return (
    <div className="urgency-banner" style={{ position: "fixed", top: 68, left: 0, right: 0, zIndex: 999 }}>
      <span className="urgency-banner-text">
        {isAr ? "🔴 دعم طوارئ الجنازة متاح 24/7 — " : "🔴 Emergency Funeral Support Available 24/7 —"}
        <strong style={{ color: "var(--gold)", marginLeft: "0.35rem" }}>+962 6 500 0000</strong>
      </span>
      <div className="urgency-banner-links">
        <a href="tel:+96265000000" className="urgency-cta urgency-cta-call">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 5.9 5.9l.51-.51a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 16.92z" /></svg>
          {isAr ? "اتصل الآن" : "Call Now"}
        </a>
        <a href="https://wa.me/962790000000" target="_blank" rel="noopener noreferrer" className="urgency-cta urgency-cta-wa">
          WhatsApp
        </a>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <PageShell>
      {(props) => <ContactContent {...props} />}
    </PageShell>
  );
}
