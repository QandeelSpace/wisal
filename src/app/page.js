"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import * as THREE from "three";
import PageShell from "./components/PageShell";
import { ServiceIcon } from "./components/Icons";

const heroImages = [
  "/images/hero_celebration.png",
  "/images/gallery_corporate.png",
  "/images/gallery_islamic.png",
  "/images/hero_memorial.png",
];

function HomeContent({ lang, theme, t }) {
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [showOpener, setShowOpener] = useState(true);
  const [openerFading, setOpenerFading] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null); // holds Three.js refs for scroll updates

  // Hero slideshow
  useEffect(() => {
    const iv = setInterval(() => {
      setActiveHeroIndex((p) => (p + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(iv);
  }, []);

  // Cinematic opener
  useEffect(() => {
    const t1 = setTimeout(() => setOpenerFading(true), 3000);
    const t2 = setTimeout(() => setShowOpener(false), 4800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Track scroll for Three.js reactivity
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Three.js background — big, scroll-reactive
  useEffect(() => {
    if (typeof window === "undefined") return;
    const container = canvasRef.current;
    if (!container) return;

    let animId;
    let canvas;
    let onMouse, onResize, onScrollInternal;
    let initialized = false;

    try {
      container.innerHTML = "";
      canvas = document.createElement("canvas");
      canvas.style.cssText = "width:100%;height:100%;display:block;";
      container.appendChild(canvas);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 2000);
      camera.position.z = 70;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const goldColor = theme === "celebration" ? 0xc8a84b : 0xc4b298;

      // ── Large nested orbit rings ──────────────────────────────
      const ringGroup = new THREE.Group();
      const ringConfigs = [
        { r: 18, tube: 0.18, opacity: 0.22 },
        { r: 14, tube: 0.15, opacity: 0.18 },
        { r: 10, tube: 0.12, opacity: 0.14 },
        { r: 7,  tube: 0.09, opacity: 0.10 },
      ];
      const ringMeshes = ringConfigs.map(({ r, tube, opacity }, i) => {
        const mat = new THREE.MeshBasicMaterial({
          color: goldColor, wireframe: false,
          transparent: true, opacity,
        });
        const geo = new THREE.TorusGeometry(r, tube, 12, 100);
        const mesh = new THREE.Mesh(geo, mat);
        if (i === 1) { mesh.rotation.x = Math.PI / 2.5; mesh.rotation.z = 0.4; }
        if (i === 2) { mesh.rotation.x = Math.PI / 4; mesh.rotation.y = Math.PI / 5; }
        if (i === 3) { mesh.rotation.x = -Math.PI / 3; mesh.rotation.z = -0.6; }
        ringGroup.add(mesh);
        return { mesh, baseMat: mat };
      });
      scene.add(ringGroup);

      // ── Outer wireframe halo ──────────────────────────────────
      const haloMat = new THREE.MeshBasicMaterial({ color: goldColor, wireframe: true, transparent: true, opacity: 0.06 });
      const haloGeo = new THREE.TorusGeometry(26, 0.15, 6, 120);
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.rotation.x = Math.PI / 6;
      scene.add(halo);

      // ── Gold floating particles ───────────────────────────────
      const flakeGeo = new THREE.OctahedronGeometry(0.35, 0);
      const flakes = Array.from({ length: 160 }, () => {
        const mat = new THREE.MeshBasicMaterial({
          color: goldColor, transparent: true,
          opacity: 0.25 + Math.random() * 0.55,
        });
        const m = new THREE.Mesh(flakeGeo, mat);
        m.position.set(
          (Math.random() - 0.5) * 160,
          (Math.random() - 0.5) * 160,
          (Math.random() - 0.5) * 120
        );
        m.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        const s = 0.5 + Math.random() * 2.2;
        m.scale.set(s, s, s);
        scene.add(m);
        return {
          mesh: m,
          vy: 0.025 + Math.random() * 0.055,
          sx: Math.random() * Math.PI * 2,
          sy: (Math.random() - 0.5) * 0.015,
          rx: (Math.random() - 0.5) * 0.015,
          baseMat: mat,
        };
      });

      // ── Star-field dots ───────────────────────────────────────
      const starGeo = new THREE.BufferGeometry();
      const starCount = 400;
      const starPos = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount * 3; i++) starPos[i] = (Math.random() - 0.5) * 400;
      starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
      const starMat = new THREE.PointsMaterial({ color: goldColor, size: 0.3, transparent: true, opacity: 0.25 });
      scene.add(new THREE.Points(starGeo, starMat));

      // store refs for scroll updates
      sceneRef.current = { ringMeshes, flakes, haloMat, starMat, ringGroup };

      let mx = 0, my = 0, tx = 0, ty = 0;
      onMouse = (e) => {
        mx = (e.clientX - window.innerWidth / 2) / 400;
        my = (e.clientY - window.innerHeight / 2) / 400;
      };
      onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("mousemove", onMouse);
      window.addEventListener("resize", onResize);

      let scrollProgress = 0;
      onScrollInternal = () => {
        scrollProgress = Math.min(window.scrollY / (window.innerHeight * 0.8), 1);
      };
      window.addEventListener("scroll", onScrollInternal, { passive: true });

      let elapsedTime = 0;
      let lastTime = performance.now();

      const animate = () => {
        animId = requestAnimationFrame(animate);
        const now = performance.now();
        const delta = (now - lastTime) / 1000;
        lastTime = now;
        elapsedTime += delta;

        // Scroll-driven scale & opacity boost (modest growth to fit in half screen)
        const boost = 1 + scrollProgress * 0.25;
        ringGroup.scale.setScalar(boost);
        halo.scale.setScalar(boost);

        // Ring opacity increases with scroll
        ringMeshes.forEach(({ mesh, baseMat }, i) => {
          baseMat.opacity = Math.min(ringConfigs[i].opacity * (1 + scrollProgress * 3), 0.65);
        });
        haloMat.opacity = 0.06 + scrollProgress * 0.18;
        starMat.opacity = 0.25 + scrollProgress * 0.45;

        // Flake opacity brightens on scroll
        flakes.forEach((f) => {
          f.baseMat.opacity = Math.min((0.25 + Math.random() * 0.3) * (1 + scrollProgress * 1.5), 0.9);
          f.mesh.position.y += f.vy;
          f.mesh.position.x += Math.sin(elapsedTime + f.sx) * 0.015;
          f.mesh.rotation.x += f.rx;
          f.mesh.rotation.y += f.sy;
          if (f.mesh.position.y > 90) {
            f.mesh.position.y = -90;
            f.mesh.position.x = (Math.random() - 0.5) * 160;
          }
        });

        // Slow orbit rotation — speeds up on scroll
        const rotSpeed = 0.0006 + scrollProgress * 0.0012;
        ringGroup.rotation.y += rotSpeed;
        ringGroup.rotation.x += rotSpeed * 0.5;
        halo.rotation.z += 0.0003;

        // Mouse parallax
        tx += (mx - tx) * 0.025;
        ty += (my - ty) * 0.025;
        camera.position.x = tx * 5;
        camera.position.y = -ty * 5;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      };
      animate();
      initialized = true;
    } catch (e) {
      console.warn("WebGL initialization failed or is unsupported on this browser:", e);
      if (canvas && container.contains(canvas)) {
        container.removeChild(canvas);
      }
    }

    return () => {
      if (initialized) {
        if (animId) cancelAnimationFrame(animId);
        if (onMouse) window.removeEventListener("mousemove", onMouse);
        if (onResize) window.removeEventListener("resize", onResize);
        if (onScrollInternal) window.removeEventListener("scroll", onScrollInternal);
      }
      if (canvas && container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
  }, [theme]);

  const services = [
    { slug: "weddings", img: "/images/hero_celebration.png", ...t.serviceCategories.weddings },
    { slug: "family", img: "/images/hero_celebration.png", ...t.serviceCategories.family },
    { slug: "corporate", img: "/images/gallery_corporate.png", ...t.serviceCategories.corporate },
    { slug: "memorials", img: "/images/hero_memorial.png", ...t.serviceCategories.memorials },
    { slug: "islamic", img: "/images/gallery_islamic.png", ...t.serviceCategories.islamic },
    { slug: "vip", img: "/images/gallery_corporate.png", ...t.serviceCategories.vip },
  ];

  return (
    <>
      {/* WebGL BG */}
      <div ref={canvasRef} className="webgl-canvas-container" />

      {/* Cinematic Opener */}
      {showOpener && (
        <div
          className={`cinematic-opener ${openerFading ? "fade-out" : ""}`}
          onClick={() => { setOpenerFading(true); setTimeout(() => setShowOpener(false), 600); }}
        >
          <svg className="opener-monogram" width="100" height="100" viewBox="0 0 100 100" fill="none">
            <path d="M50 5L95 50L50 95L5 50L50 5Z" stroke="var(--gold)" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="16" stroke="var(--gold)" strokeWidth="1" />
            <circle cx="50" cy="50" r="4" fill="var(--gold)" />
          </svg>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--gold)", fontSize: "1.75rem", letterSpacing: "6px", marginTop: "2rem", textTransform: "uppercase", fontWeight: 400 }}>
            WISAL | وصال
          </h2>
          <span style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "4px", color: "#6b6e78", marginTop: "0.75rem" }}>
            Connecting Hearts, Honoring Traditions
          </span>
          <span style={{ fontSize: "0.65rem", color: "#464a53", marginTop: "2.5rem", letterSpacing: "2px" }}>
            {lang === "ar" ? "انقر للمتابعة" : "Click anywhere to continue"}
          </span>
        </div>
      )}

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-carousel">
          {heroImages.map((src, i) => (
            <div
              key={src}
              className={`hero-slide ${i === activeHeroIndex ? "active" : ""}`}
              style={{ backgroundImage: `url(${src})`, filter: "brightness(0.3) contrast(1.1)" }}
            />
          ))}
        </div>
        <div className="hero-overlay" />
        <div className="container" style={{ position: "relative", zIndex: 2, width: "100%" }}>
          <div className="hero-content">
            <span className="hero-tag">{t.tagline}</span>
            <h1 className="hero-title">{t.heroSubtitle}</h1>
            <p className="hero-desc">{t.heroDesc}</p>
            <div className="hero-actions">
              <Link href="/contact" className="btn-primary">
                {t.requestConsultation}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </Link>
              <Link href="/about" className="btn-outline">
                {t.navAbout}
              </Link>
            </div>
          </div>
        </div>

        {/* Calligraphy overlay */}
        <div className="bg-calligraphy" style={{ top: "20%", left: "5%", transform: "rotate(-6deg)", fontSize: "clamp(5rem, 15vw, 16rem)" }}>
          وصال
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="section" style={{ paddingTop: "var(--space-xl)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span className="section-label">03 // {lang === "ar" ? "خدماتنا" : "Our Services"}</span>
            <h2 className="section-title">{t.servicesTitle}</h2>
            <p className="body-text" style={{ maxWidth: 560, margin: "1rem auto 0" }}>{t.servicesSubtitle}</p>
          </div>
          <div className="service-preview-grid">
            {services.map((svc) => (
              <Link key={svc.slug} href={`/services/${svc.slug}`} className="service-card">
                <div className="service-card-image">
                  <img
                    src={svc.img}
                    alt={svc.label}
                    style={svc.slug === "memorials" ? { filter: "grayscale(0.8)" } : {}}
                  />
                </div>
                <div className="service-card-body">
                  <span className="service-card-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <ServiceIcon slug={svc.slug} size={14} color="var(--gold)" />
                    {svc.label}
                  </span>
                  <div className="service-card-title">{t.divisions[svc.slug]?.title || svc.label}</div>
                  <p className="service-card-desc">{svc.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="section" style={{ background: "rgba(0,0,0,0.01)", borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <div className="spread">
            <div className="spread-visual">
              <div className="img-frame" style={{ height: "520px" }}>
                <img src="/images/gallery_corporate.png" alt="WISAL Coordination" className="spread-image" style={{ height: "100%" }} />
              </div>
            </div>
            <div className="spread-text">
              <span className="section-label">01 // {lang === "ar" ? "تراثنا" : "The Heritage"}</span>
              <h2 className="section-title" style={{ color: "var(--gold)" }}>{t.aboutSubtitle}</h2>
              <p className="body-text">{t.aboutText}</p>
              <div style={{ borderLeft: lang === "ar" ? "none" : "2px solid var(--gold)", borderRight: lang === "ar" ? "2px solid var(--gold)" : "none", paddingLeft: lang === "ar" ? 0 : "1.5rem", paddingRight: lang === "ar" ? "1.5rem" : 0, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", color: "var(--gold)", marginBottom: "0.35rem" }}>{t.missionTitle}</h3>
                  <p className="body-text" style={{ fontSize: "var(--text-sm)" }}>{t.missionText}</p>
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", color: "var(--gold)", marginBottom: "0.35rem" }}>{t.visionTitle}</h3>
                  <p className="body-text" style={{ fontSize: "var(--text-sm)" }}>{t.visionText}</p>
                </div>
              </div>
              <Link href="/about" className="btn-text">
                {t.discoverMore}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-sm" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="section-label">07 // {lang === "ar" ? "آراء عملائنا" : "Client Reflections"}</span>
            <h2 className="section-title">{t.testimonialsTitle}</h2>
          </div>
          <div className="testimonials-grid">
            {t.testimonials.map((item, i) => (
              <div key={i} className="testimonial-card">
                <p className="testimonial-quote">"{item.text}"</p>
                <cite className="testimonial-author">— {item.author}</cite>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section style={{ padding: "5rem 0", background: "linear-gradient(135deg, rgba(200,168,75,0.06) 0%, transparent 100%)", borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>
            {lang === "ar" ? "هل أنت مستعد لبدء التخطيط؟" : "Ready to Start Planning?"}
          </h2>
          <p className="body-text" style={{ maxWidth: 480, margin: "0 auto 2.5rem" }}>
            {lang === "ar" ? "تواصل مع فريق وصال الكونسيرج الآن لبدء رحلتك." : "Connect with WISAL's concierge team today and let's create something extraordinary."}
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-primary">
              {t.requestConsultation}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </Link>
            <a href="https://wa.me/962790000000" target="_blank" rel="noopener noreferrer" className="btn-outline">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default function Home() {
  return (
    <PageShell>
      {(props) => <HomeContent {...props} />}
    </PageShell>
  );
}
