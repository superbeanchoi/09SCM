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

def login_box(page, name):
    page.add_style_tag(content='.login-demo{display:none!important}')
    page.evaluate("document.activeElement && document.activeElement.blur()")
    box = page.locator('.login-box').bounding_box()
    pad = 32
    clip = {'x': max(box['x'] - pad, 0), 'y': max(box['y'] - pad, 0), 'width': box['width'] + pad * 2, 'height': box['height'] + pad * 2}
    save(page.screenshot(clip=clip), name)

with sync_playwright() as p:
    b = p.chromium.launch()
    for label, w in (('pc', 1440),):
        ctx = b.new_context(viewport={'width': w, 'height': 900}, device_scale_factor=2)
        page = ctx.new_page()
        page.goto(URL); page.wait_for_timeout(500)
        login_box(page, 'login-' + label)
        if label == 'pc':
            page.fill('#loginIdInput', 'bonsa'); page.fill('#loginPwInput', 'a1234')
            page.click('#loginSubmitBtn'); page.wait_for_timeout(800)
            save(page.screenshot(), 'intro-pc')
        ctx.close()
    b.close()
