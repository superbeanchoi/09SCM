(function () {
  // 이용가이드 공통 렌더러 — 목차는 nav-*.js(window.GUIDE_NAV)에서 읽는다
    var NAV = window.GUIDE_NAV;

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

  function shotsHTML(shots) {
    if (!shots || !shots.length) { return ''; }
    var items = shots.map(function (s) {
      return '<figure class="shot-item shot-' + s.device + '"><img src="' + s.src + '" alt="' + s.alt + '" loading="lazy"><figcaption>' + s.caption + '</figcaption></figure>';
    }).join('');
    return '<div class="shot' + (shots.length > 1 ? ' shot-pair' : '') + '">' + items + '</div>';
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
    menuEl.querySelectorAll('.menu-group.open').forEach(function (g) { g.classList.remove('open'); });
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
    var c = (window.GUIDE_CONTENT || {})[leaf.id];
    var shots = c ? shotsHTML(c.shots) : '';
    if (leaf.type === 'page') {
      main = sectionHTML('body', '본문', c && c.body ? c.body : placeholder());
      toc = '<a href="#body" data-anchor="body">본문</a>';
    } else {
      SCREEN_SECTIONS.forEach(function (s) {
        if (c && !c[s.id]) { return; }
        main += sectionHTML(s.id, s.label, c ? c[s.id] : placeholder());
        toc += '<a href="#' + s.id + '" data-anchor="' + s.id + '">' + s.label + '</a>';
      });
      if (!c || c.more) {
        main += '<section class="guide-section" id="more"><details class="guide-more"><summary>더 자세히 보기</summary>' + (c ? c.more : placeholder()) + '</details></section>';
        toc += '<a href="#more" data-anchor="more">더 자세히 보기</a>';
      }
    }
    main = shots + main;

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
