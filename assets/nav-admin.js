// 통합관리자 이용가이드 — 목차 구조
// type 'page' = 시작하기 본문, 그 외 = 관리자 화면 하나
window.GUIDE_NAV = [
  { id: 'start', label: '시작하기', children: [
    { id: 'start-login', label: '로그인' },
    { id: 'start-terms', label: '용어집', type: 'page' }
  ]},
  { id: 'dashboard', label: '대시보드', children: [
    { id: 'dashboard-ops', label: '운영현황' }
  ]},
  { id: 'hq-franchise', label: '본사/가맹점 관리', children: [
    { id: 'hq-list', label: '본사 관리' },
    { id: 'franchise-list', label: '가맹점 정보' }
  ]},
  { id: 'trade', label: '거래/매출 현황', children: [
    { id: 'trade-all', label: '전체 현황' },
    { id: 'trade-hq', label: '본사별 현황' },
    { id: 'trade-franchise', label: '가맹점별 현황' }
  ]},
  { id: 'system', label: '시스템 관리', children: [
    { id: 'system-notice', label: '공지사항' },
    { id: 'system-terms', label: '약관 관리' }
  ]}
];
