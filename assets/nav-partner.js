// 본사·가맹점 관리자 이용가이드 — 목차 구조
// type 'page' = 시작하기 본문, 그 외 = 관리자 화면 하나
window.GUIDE_NAV = [
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
