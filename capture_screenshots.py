import os
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

# Create output dir
output_dir = r"c:\Users\ASUS\.gemini\antigravity\scratch\wisal-website\public\screenshots"
os.makedirs(output_dir, exist_ok=True)

chrome_options = Options()
chrome_options.add_argument("--headless=new")
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--window-size=1600,1080")
chrome_options.add_argument("--log-level=3")
chrome_options.binary_location = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

driver = webdriver.Chrome(options=chrome_options)

targets = [
    # English - Celebration
    {"lang": "en", "theme": "celebration", "sections": ["home", "about", "services", "packages", "why", "gallery", "quote"]},
    # Arabic - Celebration
    {"lang": "ar", "theme": "celebration", "sections": ["home", "about", "services", "packages", "why", "gallery", "quote"]},
    # English - Memorial
    {"lang": "en", "theme": "memorial", "sections": ["home", "about", "services", "packages", "why", "gallery", "quote"]},
    # Arabic - Memorial
    {"lang": "ar", "theme": "memorial", "sections": ["home", "about", "services", "packages", "why", "gallery", "quote"]}
]

try:
    for target in targets:
        lang = target["lang"]
        theme = target["theme"]
        print(f"Capturing: Lang={lang}, Theme={theme}...")
        
        # Load URL
        url = f"http://localhost:3000/?lang={lang}&theme={theme}&opener=false"
        driver.get(url)
        time.sleep(3) # Wait for page load and GSAP initial animations
        
        # Capture each section
        for section in target["sections"]:
            try:
                el = driver.find_element(By.ID, section)
                # Scroll into view
                driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", el)
                time.sleep(1) # Wait for smooth scroll / lazy load
                
                # Take viewport screenshot
                filename = f"{lang}_{theme}_{section}_viewport.png"
                filepath = os.path.join(output_dir, filename)
                driver.save_screenshot(filepath)
                print(f" Saved viewport screenshot: {filename}")
            except Exception as e:
                print(f" Error capturing section {section} for {lang}_{theme}: {e}")

finally:
    driver.quit()
    print("Done capturing screenshots!")
