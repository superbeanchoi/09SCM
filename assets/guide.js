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

  function shotsHTML(shots, caption) {
    if (!shots || !shots.length) { return ''; }
    var items = shots.map(function (s) {
      var grow = shots.length > 1 && s.ratio ? ' style="flex:' + Math.round(s.ratio * 1000) + ' 1 0%"' : '';
      return '<figure class="shot-item shot-' + s.device + '"' + grow + '><img src="' + s.src + '" alt="' + s.alt + '" loading="lazy"></figure>';
    }).join('');
    return '<div class="shot"><div class="shot-row' + (shots.length > 1 ? ' shot-pair' : '') + '">' + items + '</div>' +
      (caption ? '<p class="shot-caption">' + caption + '</p>' : '') + '</div>';
  }

  function placeholder() {
    return '<div class="placeholder">내용 작성 예정</div>';
  }

  function render(id, secId) {
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
    var shots = c ? shotsHTML(c.shots, c.shotCaption) : '';
    if (leaf.type === 'page') {
      var secs = c && c.sections ? c.sections : [{ id: 'body', label: leaf.label, html: placeholder() }];
      secs.forEach(function (s) {
        main += sectionHTML(s.id, s.label, s.html);
        toc += '<a href="#' + s.id + '" data-anchor="' + s.id + '">' + s.label + '</a>';
      });
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
        '<div class="main-col col-9">' + head + main + pager + '</div>' +
        '<aside class="mini-col col-3"><div class="mini-toc"><h3>바로가기</h3>' + toc + '</div></aside>' +
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

    applyTableTemplate(contentEl);

    window.scrollTo(0, 0);
    appEl.classList.remove('nav-open');
    if (secId) {
      var t = document.getElementById(secId);
      if (t) {
        var det = t.querySelector('details');
        if (det) det.open = true;
        t.scrollIntoView({ block: 'start' });
      }
    }
  }

  /* ---------- 표 템플릿: 컬럼 유형별 폭·정렬 ---------- */
  // 항목(1열) 300px 고정·왼쪽 / 기호(○ × 등) 200px 고정·가운데 / 짧은 값(6자 이하) 120px 고정·왼쪽 / 그 외 가변·왼쪽
  // 가변 컬럼이 없으면 1열이 가변(최소 200px). 표 최소 폭은 컬럼 폭 합계이며 좁으면 .table-wrap 안에서 가로 스크롤.
  function applyTableTemplate(root) {
    var MARK = /^[○×△◎●\-–]$/;
    root.querySelectorAll('.guide-section table').forEach(function (tb) {
      var rows = tb.querySelectorAll('tbody tr');
      var n = tb.querySelectorAll('thead th').length;
      if (!rows.length || !n) return;
      var kinds = [];
      for (var c = 0; c < n; c++) {
        var cells = [];
        rows.forEach(function (r) { if (r.children[c]) cells.push(txt(r.children[c])); });
        var kind = 'text';
        if (cells.every(function (v) { return MARK.test(v); })) kind = 'mark';
        else if (c > 0 && cells.every(function (v) { return v.length <= 6; })) kind = 'short';
        if (c === 0) kind = kind === 'mark' ? 'mark' : 'item';
        kinds.push(kind);
      }
      var hasFlex = kinds.indexOf('text') > -1;
      var fixed = 0, flexMin = 240;
      var cg = document.createElement('colgroup');
      kinds.forEach(function (k, i) {
        var col = document.createElement('col');
        if (k === 'mark') { col.style.width = '200px'; fixed += 200; }
        else if (k === 'short') { col.style.width = '120px'; fixed += 120; }
        else if (k === 'item') {
          if (hasFlex) { col.style.width = '300px'; fixed += 300; } else { flexMin = 200; }
        }
        cg.appendChild(col);
        tb.querySelectorAll('tr').forEach(function (r) {
          if (r.children[i] && k === 'mark') r.children[i].classList.add('c');
        });
      });
      tb.insertBefore(cg, tb.firstChild);
      tb.classList.add('tpl');
      if (kinds.length === 2 && kinds[0] === 'item') tb.classList.add('t2'); // 2열 설명표는 좁은 화면에서도 스크롤 없이 표시
      else tb.style.minWidth = Math.max(560, fixed + flexMin) + 'px';
    });
  }

  function route() {
    var parts = location.hash.replace('#', '').split('/');
    render(parts[0], parts[1]);
  }
  window.addEventListener('hashchange', route);

  document.getElementById('menuBtn').addEventListener('click', function () { appEl.classList.add('nav-open'); });
  document.getElementById('scrim').addEventListener('click', function () { appEl.classList.remove('nav-open'); });

  /* ---------- 푸터(타이틀 · 배포 버전 · 배포일) ---------- */
  var rel = window.GUIDE_RELEASE;
  if (rel) {
    var ft = document.createElement('footer');
    ft.className = 'site-footer';
    ft.textContent = rel.title + ' · ' + rel.version + ' · ' + rel.date;
    document.querySelector('.main').appendChild(ft);
  }

  /* ---------- 키워드 검색 (현재 가이드 안에서만) ---------- */
  var searchIndex = null;
  var searchEl, inputEl, listEl, results = [], activeIdx = -1;

  function norm(t) { return String(t).toLowerCase().replace(/\s+/g, ''); }
  function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function txt(el) { return (el.textContent || '').replace(/\s+/g, ' ').trim(); }

  function buildIndex() {
    var idx = [];
    var box = document.createElement('div');
    var contents = window.GUIDE_CONTENT || {};
    leaves.forEach(function (leaf) {
      var path = leaf.trail.map(function (t) { return t.label; });
      idx.push({ leaf: leaf, secId: '', secLabel: '', unit: '', rank: 0, path: path });
      var c = contents[leaf.id];
      if (!c) return;
      var secs = [];
      if (leaf.type === 'page') {
        secs = c.sections || [];
      } else {
        SCREEN_SECTIONS.forEach(function (s) { if (c[s.id]) secs.push({ id: s.id, label: s.label, html: c[s.id] }); });
        if (c.more) secs.push({ id: 'more', label: '더 자세히 보기', html: c.more });
      }
      secs.forEach(function (sec) {
        idx.push({ leaf: leaf, secId: sec.id, secLabel: sec.label, unit: '', rank: 1, path: path });
        box.innerHTML = sec.html;
        var seen = {};
        box.querySelectorAll('h3, tr, li, p').forEach(function (el) {
          if (el.tagName === 'TR' && el.querySelector('th')) return;
          if (el.tagName === 'P' && el.closest('li, td')) return;
          if (el.tagName === 'LI' && el.querySelector('ul, ol')) return;
          var t = el.tagName === 'TR' ? Array.prototype.map.call(el.cells, txt).join(' · ').replace(/^([^·]*) · /, '$1 — ') : txt(el);
          if (!t || seen[t]) return;
          seen[t] = 1;
          var head = el.tagName === 'TR' ? txt(el.cells[0]) : (el.tagName === 'H3' ? t : '');
          idx.push({ leaf: leaf, secId: sec.id, secLabel: sec.label, unit: t, head: head, row: el.tagName === 'TR', rank: 2, path: path });
        });
      });
    });
    return idx;
  }

  function runSearch(q) {
    var words = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    var out = [];
    searchIndex.forEach(function (e) {
      var hay = e.rank === 0 ? norm(e.path.join('') + e.leaf.label) : e.rank === 1 ? norm(e.secLabel) : norm(e.secLabel + e.unit);
      for (var i = 0; i < words.length; i++) { if (hay.indexOf(words[i]) < 0) return; }
      var score = 0;
      var nl = norm(e.leaf.label), ns = norm(e.secLabel), nh = norm(e.head || ''), nu = norm(e.unit);
      words.forEach(function (w) {
        if (e.rank === 0 && nl.indexOf(w) >= 0) score += 100;
        if (ns.indexOf(w) >= 0) score += 60;
        if (nh.indexOf(w) >= 0) score += 80;
        if (nu.indexOf(w) >= 0) score += 30;
      });
      score -= e.rank;
      if (e.rank === 0) score += 50;
      out.push({ e: e, score: score });
    });
    out.sort(function (a, b) { return b.score - a.score; });
    var shown = [], bySec = {};
    out.forEach(function (r) {
      var e = r.e, key = e.leaf.id + '/' + e.secId;
      if (!e.row && bySec[key] && e.unit) return;
      if (!e.row) bySec[key] = true;
      shown.push(r.e);
    });
    return shown.slice(0, 8);
  }

  function mark(text, words) {
    var out = esc(text);
    words.forEach(function (w) {
      var re = new RegExp('(' + esc(w).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
      out = out.replace(re, '<mark>$1</mark>');
    });
    return out;
  }

  function snippet(unit, words) {
    var low = unit.toLowerCase(), at = -1;
    for (var i = 0; i < words.length; i++) { var k = low.indexOf(words[i]); if (k >= 0 && (at < 0 || k < at)) at = k; }
    if (at < 0) at = 0;
    var start = Math.max(0, at - 20);
    var piece = unit.substr(start, 70);
    return (start > 0 ? '…' : '') + piece + (start + 70 < unit.length ? '…' : '');
  }

  function renderResults() {
    var q = inputEl.value.trim();
    if (!q) { listEl.hidden = true; return; }
    if (!searchIndex) searchIndex = buildIndex();
    results = runSearch(q);
    activeIdx = results.length ? 0 : -1;
    var words = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!results.length) {
      listEl.innerHTML = '<div class="search-empty">검색 결과가 없어요.</div>';
    } else {
      listEl.innerHTML = results.map(function (e, i) {
        var path = e.path.concat([e.leaf.label]);
        if (e.secLabel) path.push(e.secLabel);
        return '<a class="search-item' + (i === 0 ? ' active' : '') + '" role="option" data-i="' + i + '" href="#' + e.leaf.id + (e.secId ? '/' + e.secId : '') + '">' +
          '<span class="search-path">' + path.map(esc).join(' › ') + '</span>' +
          (e.unit ? '<span class="search-snip">' + mark(snippet(e.unit, words), words) + '</span>' : '') + '</a>';
      }).join('');
    }
    listEl.hidden = false;
  }

  function setActive(n) {
    var items = listEl.querySelectorAll('.search-item');
    if (!items.length) return;
    activeIdx = (n + items.length) % items.length;
    items.forEach(function (el, i) { el.classList.toggle('active', i === activeIdx); });
    items[activeIdx].scrollIntoView({ block: 'nearest' });
  }

  function closeSearch() {
    listEl.hidden = true;
    searchEl.classList.remove('open');
  }

  function goResult(e) {
    var h = e.leaf.id + (e.secId ? '/' + e.secId : '');
    closeSearch();
    inputEl.value = '';
    inputEl.blur();
    if (location.hash === '#' + h) { route(); } else { location.hash = h; }
  }

  function initSearch() {
    var right = document.createElement('div');
    right.className = 'topbar-right';
    right.innerHTML =
      '<div class="search" id="search">' +
        '<button type="button" class="search-btn" id="searchBtn" aria-label="검색">' +
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg></button>' +
        '<input type="search" id="searchInput" class="search-input" placeholder="키워드 검색 ( / )" autocomplete="off" aria-label="키워드 검색">' +
        '<div class="search-list" id="searchList" role="listbox" hidden></div>' +
      '</div>';
    document.querySelector('.topbar').appendChild(right);
    searchEl = right.querySelector('#search');
    inputEl = right.querySelector('#searchInput');
    listEl = right.querySelector('#searchList');

    inputEl.addEventListener('input', renderResults);
    inputEl.addEventListener('focus', renderResults);
    inputEl.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(activeIdx + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(activeIdx - 1); }
      else if (e.key === 'Enter') { e.preventDefault(); if (results[activeIdx]) goResult(results[activeIdx]); }
      else if (e.key === 'Escape') { closeSearch(); inputEl.blur(); }
    });
    listEl.addEventListener('mousedown', function (e) {
      var a = e.target.closest('.search-item');
      if (!a) return;
      e.preventDefault();
      goResult(results[+a.dataset.i]);
    });
    right.querySelector('#searchBtn').addEventListener('click', function () {
      searchEl.classList.add('open');
      inputEl.focus();
    });
    document.addEventListener('mousedown', function (e) { if (!searchEl.contains(e.target)) closeSearch(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === '/' && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) {
        e.preventDefault();
        searchEl.classList.add('open');
        inputEl.focus();
      }
    });
  }
  initSearch();

  route();
})();
