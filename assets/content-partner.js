// 본사·가맹점 관리자 이용가이드 — 화면별 본문
// 키는 nav-partner.js의 leaf id. 값이 없는 섹션은 화면에 나타나지 않는다.
window.GUIDE_CONTENT = window.GUIDE_CONTENT || {};

var HOME_APPLY = 'https://zero-scm-homepage-mockup.csb62929.chatgpt.site/apply';
var FRANCHISE_APPLY = 'https://superbeanchoi.github.io/09SCM-Shop/index.html?view=franchise-signup';

window.GUIDE_CONTENT['start-intro'] = {
  shots: [
    { device: 'pc', src: '../assets/img/partner/intro-pc.webp', alt: '09SCM 관리자 대시보드 화면', caption: '09SCM 대시보드 화면' }
  ],
  sections: [
    { id: 'sec1', label: "09SCM 관리자란", html:
      "<p>본사와 가맹점이 각자의 계정으로 소매몰을 운영하고, 도매 거래와 매출을 한곳에서 관리하는 관리자예요.</p>" },
    { id: 'sec2', label: "이런 분이 사용해요", html:
      "<ul><li><b>본사</b> 소속 가맹점을 관리하고, 소매몰과 도매 거래를 함께 운영해요.</li><li><b>가맹점</b> 본사에 소속되어 자신의 소매몰을 운영하고, 도매 상품을 주문하거나 공급해요.</li></ul>" +
      "<p>소매몰에서 주문하는 손님은 관리자 계정이 없어요. 손님은 소매몰에서 바로 주문해요.</p>" },
    { id: 'sec3', label: "할 수 있는 일", html:
      "<ul><li><a href=\"#dashboard-ops\"><b>대시보드</b></a> 처리해야 할 주문, 매출 흐름, 공지를 한눈에 확인해요.</li><li><a href=\"#retail-product-list\"><b>소매관리</b></a> 소매몰에서 판매할 상품과 주문, 회원, 매출을 관리해요.</li><li><a href=\"#wholesale-shop\"><b>도매관리</b></a> 다른 계정의 도매 상품을 주문하거나, 내 상품을 도매로 공급해요.</li><li><a href=\"#franchise-list\"><b>가맹점관리</b></a> 본사만 쓰는 메뉴예요. 가맹점 목록, 이용료, 통합 매출, 공지사항을 관리해요.</li><li><a href=\"#system-member\"><b>시스템관리</b></a> 내 회원정보, 이용료, 알림설정, 공지사항을 관리해요.</li></ul>" },
    { id: 'sec4', label: "시작부터 운영까지", html:
      "<ol><li><b>신청</b> 본사는 <a href=\"https://zero-scm-homepage-mockup.csb62929.chatgpt.site/apply\" target=\"_blank\" rel=\"noopener noreferrer\">도입신청</a>, 가맹점은 <a href=\"https://superbeanchoi.github.io/09SCM-Shop/index.html?view=franchise-signup\" target=\"_blank\" rel=\"noopener noreferrer\">가입신청</a>을 해요.</li><li><b>승인</b> 본사는 UDID 운영자가 승인하면 계정과 소매몰이 만들어져요. 가맹점은 신청하면 계정이 바로 만들어지고(이용대기), 본사가 검토한 뒤 이용을 승인해요.</li><li><b>로그인</b> 아이디와 비밀번호로 로그인해요. <a href=\"#start-login\">가입신청·로그인</a></li><li><b>사전 준비</b> 가맹점은 이용을 승인받기 전에 PayApp 연동과 정기결제 카드 등록을 마쳐요. PayApp 연동이 완료되어야 이용승인을 받을 수 있어요.</li><li><b>운영 시작</b> 이용승인이 되면 소매몰과 도소매 기능을 정상적으로 사용해요.</li></ol>" },
    { id: 'sec5', label: "계정에 따라 메뉴가 달라요", html:
      "<p>본사인지 가맹점인지, 가맹점은 도매공급권한이 있는지에 따라 보이는 메뉴가 달라요.</p>" +
      "<div class=\"table-wrap\"><table class=\"wide\"><thead><tr><th>메뉴</th><th class=\"c\">본사</th><th class=\"c\">가맹점<br>(도매공급권한 있음)</th><th class=\"c\">가맹점<br>(도매공급권한 없음)</th></tr></thead><tbody><tr><td>대시보드</td><td class=\"c\">○</td><td class=\"c\">○</td><td class=\"c\">○</td></tr><tr><td>대시보드의 도매 판매 영역</td><td class=\"c\">○</td><td class=\"c\">○</td><td class=\"c\">×</td></tr><tr><td>소매관리</td><td class=\"c\">○</td><td class=\"c\">○</td><td class=\"c\">○</td></tr><tr><td>소매관리 &gt; 상품목록의 [도매상품전환] 버튼</td><td class=\"c\">○</td><td class=\"c\">○</td><td class=\"c\">×</td></tr><tr><td>도매관리 &gt; 도매상품 주문하기, 주문내역</td><td class=\"c\">○</td><td class=\"c\">○</td><td class=\"c\">○</td></tr><tr><td>도매관리 &gt; 내 도매상품, 주문접수관리, 도매매출조회, 도매설정</td><td class=\"c\">○</td><td class=\"c\">○</td><td class=\"c\">×</td></tr><tr><td>가맹점관리</td><td class=\"c\">○</td><td class=\"c\">×</td><td class=\"c\">×</td></tr><tr><td>시스템관리 &gt; 회원정보, 알림설정, 공지사항</td><td class=\"c\">○</td><td class=\"c\">○</td><td class=\"c\">○</td></tr><tr><td>시스템관리 &gt; 이용료관리</td><td class=\"c\">×</td><td class=\"c\">○</td><td class=\"c\">○</td></tr></tbody></table></div>" +
      "<p>본사는 도매공급권한을 항상 가지고 있어요. 가맹점의 도매공급권한은 본사가 정해요.</p>" +
      "<p>가맹점은 이용상태에 따라서도 보이는 메뉴가 달라져요. 자세한 내용은 <a href=\"#start-login\">가입신청·로그인</a>에서 확인해요.</p>" }
  ]
};

window.GUIDE_CONTENT['start-login'] = {
  shots: [
    { device: 'pc', src: '../assets/img/partner/login-pc.webp', alt: '09SCM 관리자 로그인 화면(PC)', caption: 'PC 화면' },
    { device: 'mobile', src: '../assets/img/partner/login-mobile.webp', alt: '09SCM 관리자 로그인 화면(모바일)', caption: '모바일 화면' }
  ],
  overview:
    '<p>별도의 회원가입 화면은 없어요. 본사는 도입신청, 가맹점은 가입신청을 한 뒤 아이디와 비밀번호로 로그인해요.</p>' +
    '<div class="link-row">' +
      '<a href="' + HOME_APPLY + '" target="_blank" rel="noopener noreferrer">본사 도입신청</a>' +
      '<a href="' + FRANCHISE_APPLY + '" target="_blank" rel="noopener noreferrer">가맹점 가입신청</a>' +
    '</div>',
  steps:
    '<ol>' +
      '<li><b>신청하기</b> 본사는 도입신청, 가맹점은 가입신청을 해요. 로그인 화면 아래쪽 [솔루션 도입신청]을 눌러도 도입신청 페이지가 새 창으로 열려요.</li>' +
      '<li><b>입력하기</b> 로그인 화면에서 아이디와 비밀번호를 입력해요. 비밀번호는 가려서 보여요.</li>' +
      '<li><b>로그인하기</b> [로그인]을 누르거나, 입력란에서 Enter를 눌러요.</li>' +
      '<li><b>첫 화면 확인하기</b> 로그인하면 대시보드가 열려요. 이용대기 상태의 가맹점은 시스템관리가 열려요.</li>' +
    '</ol>',
  cases:
    '<h3>본사와 가맹점</h3>' +
    '<p>로그인 방법은 같고, 로그인한 뒤 보이는 메뉴가 달라요. <a href="#start-intro">09SCM 관리자 소개</a>에서 확인해요.</p>' +
    '<p>로그인하면 화면 오른쪽 위에 계정 유형(본사/가맹점), 상호명, 아이디가 표시돼요. 지금 어떤 계정으로 들어와 있는지 여기서 확인해요.</p>' +

    '<h3>가맹점 이용상태에 따라</h3>' +
    '<p>이용상태는 가맹점 계정에 적용돼요. 본사는 이용상태가 없어요.</p>' +
    '<div class="table-wrap"><table class="wide">' +
      '<thead><tr><th>이용상태</th><th>로그인</th><th>이렇게 달라져요</th></tr></thead>' +
      '<tbody>' +
        '<tr><td>이용대기</td><td>가능</td><td>시스템관리만 보여요. PayApp 연동, 정기결제 카드 등록처럼 이용을 시작하기 전에 필요한 준비를 할 수 있어요. 소매몰은 접근제한 화면이 보이고, 주문을 받을 수 없어요.</td></tr>' +
        '<tr><td>이용승인</td><td>가능</td><td>모든 메뉴를 정상적으로 사용해요.</td></tr>' +
        '<tr><td>이용제한</td><td>가능</td><td>모든 메뉴가 보이지만, 새로 시작하는 일이 막혀요. 새 도매 주문([주문하기], [바로구매]), 도매상품 등록, 소매상품·소매정보 등록, [도매상품전환]을 할 수 없어요. 이미 진행 중인 주문은 계속 처리할 수 있어요. 소매몰도 새 주문을 받을 수 없고, 화면 맨 위에 안내 문구가 계속 표시돼요.</td></tr>' +
        '<tr><td>이용불가</td><td>불가</td><td>로그인할 수 없어요. 본사에 문의해요.</td></tr>' +
      '</tbody></table></div>'
};

window.GUIDE_CONTENT['start-terms'] = {
  sections: [
    { id: 'sec1', label: "계정과 상태", html:
      "<div class=\"table-wrap\"><table><thead><tr><th>용어</th><th>뜻</th></tr></thead><tbody><tr><td>본사</td><td>09SCM을 도입해 소속 가맹점을 관리하는 계정이에요.</td></tr><tr><td>가맹점</td><td>본사에 소속된 계정이에요.</td></tr><tr><td>소매몰 회원</td><td>소매몰에서 주문하는 손님이에요. 관리자 계정은 아니에요.</td></tr><tr><td>공급자 / 구매자</td><td>도매 거래에서 상품을 파는 계정 / 사는 계정이에요. 본사와 가맹점 모두 될 수 있어요.</td></tr><tr><td>이용상태</td><td>가맹점 계정의 이용 단계예요. 이용대기, 이용승인, 이용제한, 이용불가가 있어요. <a href=\"#start-login\">가입신청·로그인</a>에서 자세히 확인해요.</td></tr><tr><td>도매공급권한</td><td>도매 상품을 등록해 공급할 수 있는 권한이에요. 보유 / 미보유로 나뉘고, 이용상태와 별개로 본사가 정해요.</td></tr></tbody></table></div>" },
    { id: 'sec2', label: "주문과 결제", html:
      "<div class=\"table-wrap\"><table><thead><tr><th>용어</th><th>뜻</th></tr></thead><tbody><tr><td>주문경로</td><td>주문이 들어온 방법이에요. <b>링크주문</b>은 소매몰에서 직접 하는 주문이고, 여러 상품을 한 주문으로 묶을 수 있어요. <b>채팅주문</b>은 오픈채팅방에 정해진 형식으로 메시지를 보내면 자동으로 접수되는 주문이에요. 채팅주문은 항상 픽업·현장결제이고, 상품마다 따로 주문이 만들어져요. 접수된 뒤의 처리는 두 경로가 같아요.</td></tr><tr><td>수령방식</td><td>소매 주문을 받는 방법이에요. 픽업, 배달이 있어요. 배달은 카드결제만 가능하고 항상 선결제예요.</td></tr><tr><td>결제수단</td><td>카드결제, 계좌이체, 현장결제가 있어요. 현장결제는 픽업할 때 결제하는 방식이라 주문이 들어올 때는 항상 결제대기예요.</td></tr><tr><td>결제상태</td><td>결제대기, 결제완료, 결제취소 3가지예요.</td></tr><tr><td>처리상태 (소매)</td><td>픽업은 주문접수 → 픽업대기 → 픽업완료, 배달은 주문접수 → 배달대기 → 배달중 → 배달완료 순서로 바뀌어요.</td></tr><tr><td>처리상태 (도매)</td><td>주문접수 → 배송대기 → 배송중 → 배송확정 순서로 바뀌어요.</td></tr><tr><td>취소·반품 상태</td><td>취소요청, 반품요청이 들어오면 승인하거나 반려해요. 취소승인, 반품승인, 취소반려, 반품반려가 있어요.</td></tr><tr><td>공통 픽업가능기간</td><td>한 주문에 담긴 상품들의 픽업가능기간이 겹치는 기간이에요. 주문할 때 주문에 저장되어, 나중에 상품 설정을 바꿔도 이미 들어온 주문은 달라지지 않아요. 픽업이 아닌 배달 주문에는 없어요.</td></tr><tr><td>노쇼후보</td><td>픽업 주문 중 공통 픽업가능기간이 지났는데 아직 픽업완료가 되지 않은 건이에요. 처리상태가 주문접수 또는 픽업대기이고, 기간 종료일 다음날 0시부터 노쇼후보로 표시돼요. 상태값이 아니라 표시라서 처리상태는 그대로이고 주문이 자동으로 취소되지도 않아요. 실제 노쇼인지는 판매자가 확인하고, [취소처리]에서 처리 주체를 노쇼처리로 선택해 처리해요. 노쇼로 처리한 건은 회원정보의 노쇼 이력에 쌓여요.</td></tr><tr><td>환불구분</td><td>전체환불, 부분환불이 있어요. 결제대기 상태에서 취소한 주문은 환불할 금액이 없어서 표시하지 않아요.</td></tr></tbody></table></div>" },
    { id: 'sec3', label: "채팅주문", html:
      "<div class=\"table-wrap\"><table><thead><tr><th>용어</th><th>뜻</th></tr></thead><tbody><tr><td>채팅주문상품명</td><td>채팅으로 주문받을 때 쓰는 상품의 짧은 이름이에요. 소매몰에 보이는 정식 상품명과 별개이고, 현재 판매 중이면서 소매몰에 노출 중인 상품 사이에서는 같은 이름을 쓸 수 없어요.</td></tr><tr><td>회원주문 코드</td><td>회원을 확인하는 숫자 4자리 코드예요. 채팅 주문 메시지 끝에 붙여요.</td></tr><tr><td>채팅주문 닉네임</td><td>회원이 오픈채팅방에서 쓰는 닉네임이에요. 회원주문 코드와 함께 대조해 본인인지 확인해요. 등록하지 않은 회원은 채팅주문을 이용할 수 없어요.</td></tr><tr><td>매칭 실패 건</td><td>회원주문 코드나 닉네임이 맞지 않아 자동으로 접수되지 못한 채팅 메시지예요. 목록에 쌓이고, 판매자가 확인해서 직접 매칭하거나 삭제해요.</td></tr></tbody></table></div>" },
    { id: 'sec4', label: "상품과 수량", html:
      "<div class=\"table-wrap\"><table><thead><tr><th>용어</th><th>뜻</th></tr></thead><tbody><tr><td>상품코드</td><td>상품마다 붙는 번호로, P 뒤에 숫자 4자리가 와요. 예: P0231. 도매·소매 구분 없이 하나의 번호 체계를 함께 써요.</td></tr><tr><td>상품출처</td><td>내 상품이 어디서 왔는지를 나타내요. 내도매상품(내가 등록한 도매상품), 도매주문상품(도매로 주문해 받은 상품), 내소매상품(소매몰용으로 직접 등록한 상품)이 있어요.</td></tr><tr><td>소매정보</td><td>소매몰에서 판매하기 위해 소매몰마다 따로 설정하는 정보예요. 한 소매몰 안에서 같은 상품코드에는 소매정보를 1개만 만들 수 있어요.</td></tr><tr><td>보유수량</td><td>내가 가지고 있는 전체 수량이에요. 내도매상품은 등록한 도매수량, 도매주문상품은 배송확정된 구매 수량의 합, 내소매상품은 등록할 때 입력한 수량이에요.</td></tr><tr><td>판매가능수량</td><td>보유수량 중 소매몰에서 팔도록 정한 수량이에요. 보유수량보다 많을 수 없어요.</td></tr><tr><td>주문가능수량</td><td>도매에서 구매자가 한 번에 주문할 수 있는 최대 수량이에요. 도매수량에서 소매몰에 배정한 판매가능수량을 뺀 만큼이에요. 소매몰에 배정한 수량은 도매로 주문받을 수 없어요.</td></tr><tr><td>판매상태</td><td>판매중, 품절이 있어요.</td></tr><tr><td>노출여부</td><td>노출, 미노출이 있어요. 판매상태와 서로 영향을 주지 않아요.</td></tr></tbody></table></div>" },
    { id: 'sec5', label: "매출", html:
      "<div class=\"table-wrap\"><table><thead><tr><th>용어</th><th>뜻</th></tr></thead><tbody><tr><td>결제총액</td><td>결제가 완료된 금액의 합계예요. 나중에 결제가 취소되어도 결제총액에서 빼지 않아요.</td></tr><tr><td>취소·환불액</td><td>취소·반품이 승인되어 돌려준 금액의 합계예요.</td></tr><tr><td>매출액</td><td>결제총액에서 취소·환불액을 뺀 금액이에요. 취소·환불이 더 크면 마이너스가 될 수 있어요.</td></tr></tbody></table></div>" +
      "<p>매출은 화면을 열거나 새로고침한 시점의 값을 한국 시간 기준으로 보여줘요. 하루는 00:00:00부터 23:59:59까지예요. 이용료로 받은 금액(이용료 수납액)은 매출액에 포함하지 않아요.</p>" },
    { id: 'sec6', label: "PayApp", html:
      "<div class=\"table-wrap\"><table><thead><tr><th>용어</th><th>뜻</th></tr></thead><tbody><tr><td>PayApp</td><td>결제를 처리하는 외부 서비스예요. 09SCM에서는 결제 처리에만 사용하고, 정산과 수수료는 다루지 않아요.</td></tr><tr><td>PayApp 연동정보</td><td>판매자 아이디, 연동 KEY, 연동 VALUE예요. 연동에 성공하면 연동완료, 그렇지 않으면 미연동으로 표시돼요.</td></tr></tbody></table></div>" }
  ]
};
