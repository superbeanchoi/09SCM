(function () {
  // 본사·가맹점 관리자 이용가이드 — 목차 구조와 화면 섹션 골격
  // type 'page' = 시작하기 본문, 그 외 = 관리자 화면 하나(같은 섹션 틀 사용)
  var NAV = [
    { id: 'start', label: '시작하기', children: [
      { id: 'start-first', label: '처음 이용하기', type: 'page' },
      { id: 'start-status', label: '이용상태와 사용 범위', type: 'page' },
      { id: 'start-wholesale', label: '도매공급권한', type: 'page' },
      { id: 'start-terms', label: '알아두면 좋은 용어', type: 'page' }
    ]},
    { id: 'dashboard', label: '대시보드', children: [
      { id: 'dashboard-ops', label: '운영현황' }
    ]},
    { id: 'retail', label: '소매관리', children: [
      { id: 'retail-product', label: '상품관리', children: [
        { id: 'retail-product-list', label: '상품목록' },
        { id: 'retail-product-category', label: '상품카테고리' },
        { id: 'retail-product-display', label: '메인상품진열' }
      ]},
      { id: 'retail-order', label: '주문관리', children: [
        { id: 'retail-order-list', label: '주문목록' },
        { id: 'retail-order-chat', label: '채팅주문설정' }
      ]},
      { id: 'retail-sales', label: '소매매출조회' },
      { id: 'retail-member', label: '회원관리' },
      { id: 'retail-settings', label: '소매설정' }
    ]},
    { id: 'wholesale', label: '도매관리', children: [
      { id: 'wholesale-shop', label: '도매상품 주문하기' },
      { id: 'wholesale-orders', label: '주문내역' },
      { id: 'wholesale-mine', label: '내 도매상품' },
      { id: 'wholesale-receive', label: '주문접수관리' },
      { id: 'wholesale-sales', label: '도매매출조회' },
      { id: 'wholesale-settings', label: '도매설정' }
    ]},
    { id: 'franchise', label: '가맹점관리', children: [
      { id: 'franchise-list', label: '가맹점 목록' },
      { id: 'franchise-fee', label: '이용료관리' },
      { id: 'franchise-sales', label: '통합매출조회' },
      { id: 'franchise-notice', label: '공지사항' }
    ]},
    { id: 'system', label: '시스템관리', children: [
      { id: 'system-member', label: '회원정보' },
      { id: 'system-fee', label: '이용료관리' },
      { id: 'system-notification', label: '알림설정' },
      { id: 'system-notice', label: '공지사항' }
    ]}
  ];

  var SCREEN_SECTIONS = [
    { id: 'overview', label: '한눈에' },
    { id: 'steps', label: '이렇게 사용해요' },
    { id: 'cases', label: '상황별로 달라져요' },
    { id: 'trouble', label: '안 될 때' }
  ];

  var leaves = [];
  var parentOf = {};

  function walk(nodes, trail) {
    nodes.forEach(function (node) {
      if (node.children) {
        parentOf[node.id] = trail.slice();
        walk(node.children, trail.concat(node));
      } else {
        node.trail = trail.slice();
        leaves.push(node);
      }
    });
  }
  walk(NAV, []);

  var menuEl = document.getElementById('menu');
  var contentEl = document.getElementById('content');
  var titleEl = document.getElementById('pageTitle');
  var appEl = document.getElementById('app');

  function renderMenu(nodes, container) {
    nodes.forEach(function (node) {
      if (node.children) {
        var group = document.createElement('div');
        group.className = 'menu-group';
        group.dataset.id = node.id;
        var head = document.createElement('button');
        head.type = 'button';
        head.className = 'menu-item';
        head.innerHTML = '<span></span><span class="chev">▸</span>';
        head.firstChild.textContent = node.label;
        head.addEventListener('click', function () { group.classList.toggle('open'); });
        var sub = document.createElement('div');
        sub.className = 'submenu';
        renderMenu(node.children, sub);
        group.appendChild(head);
        group.appendChild(sub);
        container.appendChild(group);
      } else {
        var item = document.createElement('button');
        item.type = 'button';
        item.className = 'menu-item';
        item.dataset.id = node.id;
        var text = document.createElement('span');
        text.textContent = node.label;
        item.appendChild(text);
        item.addEventListener('click', function () { location.hash = node.id; });
        container.appendChild(item);
      }
    });
  }
  renderMenu(NAV, menuEl);

  function findLeaf(id) {
    for (var i = 0; i < leaves.length; i++) if (leaves[i].id === id) return i;
    return -1;
  }

  function subTrail(leaf) {
    return leaf.trail.slice(1).map(function (t) { return t.label; }).join(' > ');
  }

  function sectionHTML(id, label, body) {
    return '<section class="guide-section" id="' + id + '"><h2>' + label + '</h2>' + body + '</section>';
  }

  function placeholder() {
    return '<div class="placeholder">내용 작성 예정</div>';
  }

  function render(id) {
    var index = findLeaf(id);
    if (index < 0) { index = 0; }
    var leaf = leaves[index];

    document.querySelectorAll('.menu-item.active').forEach(function (el) { el.classList.remove('active'); });
    var active = menuEl.querySelector('.menu-item[data-id="' + leaf.id + '"]');
    if (active) active.classList.add('active');
    leaf.trail.forEach(function (t) {
      var group = menuEl.querySelector('.menu-group[data-id="' + t.id + '"]');
      if (group) group.classList.add('open');
    });

    titleEl.textContent = leaf.trail[0].label;
    document.title = leaf.label + ' | 09SCM 이용가이드';

    var sub = subTrail(leaf);
    var head = '<div class="screen-head">' + (sub ? '<span class="eyebrow"></span>' : '') + '<h1></h1></div>';

    var main = '';
    var toc = '';
    if (leaf.type === 'page') {
      main = sectionHTML('body', '본문', placeholder());
      toc = '<a href="#body" data-anchor="body">본문</a>';
    } else {
      SCREEN_SECTIONS.forEach(function (s) {
        main += sectionHTML(s.id, s.label, placeholder());
        toc += '<a href="#' + s.id + '" data-anchor="' + s.id + '">' + s.label + '</a>';
      });
      main += '<section class="guide-section" id="more"><details class="guide-more"><summary>더 자세히 보기</summary>' + placeholder() + '</details></section>';
      toc += '<a href="#more" data-anchor="more">더 자세히 보기</a>';
    }

    var prev = leaves[index - 1];
    var next = leaves[index + 1];
    var pager = '<nav class="pager">' +
      (prev ? '<a href="#' + prev.id + '">◀ ' + prev.label + '</a>' : '<span></span>') +
      (next ? '<a href="#' + next.id + '">' + next.label + ' ▶</a>' : '') +
      '</nav>';

    contentEl.innerHTML =
      '<div class="grid12">' +
        '<div class="main-col col-8">' + head + main + pager + '</div>' +
        '<aside class="mini-col col-4"><div class="mini-toc"><h3>이 화면에서</h3>' + toc + '</div></aside>' +
      '</div>';
    contentEl.querySelector('.screen-head h1').textContent = leaf.label;
    var eb = contentEl.querySelector('.screen-head .eyebrow');
    if (eb) eb.textContent = sub;

    contentEl.querySelectorAll('[data-anchor]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var target = document.getElementById(a.dataset.anchor);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    window.scrollTo(0, 0);
    appEl.classList.remove('nav-open');
  }

  function route() {
    render(location.hash.replace('#', ''));
  }
  window.addEventListener('hashchange', route);

  document.getElementById('menuBtn').addEventListener('click', function () { appEl.classList.add('nav-open'); });
  document.getElementById('scrim').addEventListener('click', function () { appEl.classList.remove('nav-open'); });

  route();
})();
