# 본사·가맹점 관리자 이용가이드용 목업 캡처 (mock/partner.html -> assets/img/partner/*.webp)
# 사용: python3 tools/capture_partner.py
import io, os
from playwright.sync_api import sync_playwright
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
URL = 'file://' + os.path.join(ROOT, 'mock', 'partner.html')
OUT = os.path.join(ROOT, 'assets', 'img', 'partner')
os.makedirs(OUT, exist_ok=True)

def save(png_bytes, name):
    Image.open(io.BytesIO(png_bytes)).convert('RGB').save(os.path.join(OUT, name + '.webp'), 'WEBP', quality=88)

def login_full(page, name):
    page.add_style_tag(content='.login-demo{display:none!important}')
    page.evaluate("document.activeElement && document.activeElement.blur()")
    save(page.screenshot(), name)

def login(page):
    page.fill('#loginIdInput', 'bonsa'); page.fill('#loginPwInput', 'a1234')
    page.click('#loginSubmitBtn'); page.wait_for_timeout(800)

with sync_playwright() as p:
    b = p.chromium.launch()
    for label, w in (('pc', 1440),):
        ctx = b.new_context(viewport={'width': w, 'height': 900}, device_scale_factor=2)
        page = ctx.new_page()
        page.goto(URL); page.wait_for_timeout(500)
        login_full(page, 'login-' + label)
        if label == 'pc':
            page.fill('#loginIdInput', 'bonsa'); page.fill('#loginPwInput', 'a1234')
            page.click('#loginSubmitBtn'); page.wait_for_timeout(800)
            save(page.screenshot(), 'intro-pc')
        ctx.close()
    # 대시보드: LNB 제외 PC(1440) + 모바일(440)
    ctx = b.new_context(viewport={'width': 1440, 'height': 1500}, device_scale_factor=2)
    page = ctx.new_page(); page.goto(URL); page.wait_for_timeout(500); login(page)
    page.add_style_tag(content='.lnb{display:none!important}')
    page.wait_for_timeout(200)
    save(page.screenshot(), 'dashboard-pc')
    ctx.close()
    ctx = b.new_context(viewport={'width': 440, 'height': 900}, device_scale_factor=2)
    page = ctx.new_page(); page.goto(URL); page.wait_for_timeout(500); login(page)
    save(page.screenshot(), 'dashboard-mobile')
    ctx.close()
    b.close()
