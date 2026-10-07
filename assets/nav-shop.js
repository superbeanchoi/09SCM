// 소매몰 이용가이드 — 목차 구조
// type 'page' = 소개·용어 등 본문, 그 외 = 소매몰 화면 하나
window.GUIDE_NAV = [
  { id: 'start', label: '시작하기', children: [
    { id: 'start-intro', label: '09SCM 소매몰 소개', type: 'page' },
    { id: 'start-login', label: '회원가입/로그인' },
    { id: 'start-gate', label: '대문화면' },
    { id: 'start-terms', label: '알아두면 좋은 용어', type: 'page' }
  ]},
  { id: 'browse', label: '둘러보기', children: [
    { id: 'browse-main', label: '메인화면' },
    { id: 'browse-list', label: '상품목록' },
    { id: 'browse-pickup', label: '픽업상품' },
    { id: 'browse-delivery', label: '배달상품' },
    { id: 'browse-detail', label: '상품상세' }
  ]},
  { id: 'order', label: '주문하기', children: [
    { id: 'order-cart', label: '장바구니' },
    { id: 'order-pay', label: '주문·결제' },
    { id: 'order-chat', label: '채팅주문' }
  ]},
  { id: 'check', label: '주문조회', children: [
    { id: 'check-quick', label: '간편주문조회' },
    { id: 'check-history', label: '주문내역' },
    { id: 'check-detail', label: '주문상세' },
    { id: 'check-cancel', label: '취소·반품' }
  ]},
  { id: 'etc', label: '기타', children: [
    { id: 'etc-info', label: '내정보' },
    { id: 'etc-address', label: '배달지관리' },
    { id: 'etc-withdraw', label: '회원탈퇴' }
  ]}
];
