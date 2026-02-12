// [1] HTML 인클루드 함수
function includeHTML(callback) {
    const elements = document.querySelectorAll('[data-include]');
    let count = 0;

    if (elements.length === 0) return;

    elements.forEach(el => {
        const file = el.getAttribute('data-include');
        fetch(file)
            .then(res => res.text())
            .then(data => {
                el.innerHTML = data;
                count++;
                // 모든 인클루드(헤더, 푸터)가 완료되면 콜백 함수 실행
                if (count === elements.length && callback) {
                    callback();
                }
            });
    });
}

// [2] 헤더/푸터가 로드된 후 실행할 디자인 관련 함수들
function initCommonDesign() {
    console.log("헤더 푸터 로드 완료! 이제 GNB 이벤트를 연결합니다.");
    


    // GNB 호버: 배경 내려오기 + 서브메뉴 펼치기 + 헤더 배경 투명
    $(".gnb").mouseenter(function(){
			$("#header").addClass("gnb-open");
			$(".wrap-gnb").stop().animate({"height":"350px"},300);
			$(".gnb > li > .sub").stop().animate({"height":"220px"},600);
    });

    $(".gnb").mouseleave(function(){
        $("#header").removeClass("gnb-open");
        $(".wrap-gnb").stop().animate({"height":"0px"},500);
        $(".gnb > li > .sub").stop().animate({"height":"0px"},200);
    });

// gnb 스크롤했을때!! 
    $(window).scroll(function() {
      if ($(this).scrollTop() > 50) {
				$('#header').addClass('scrolled');
				$('.mo-main-page-header').addClass('scrolled');
      } else {
				$('#header').removeClass('scrolled');
				$('.mo-main-page-header').removeClass('scrolled');
      }
    });
// -------------------------------------


    // gnb 위치 심볼
    $('.gnb li').on('mouseenter', function() {
        const target = $(this);
        const width = target.width(); // 마우스 올린 메뉴 너비
        const left = target.position().left; // 마우스 올린 메뉴 시작 위치
        
        // 심볼을 해당 위치의 중앙으로 이동
        $('.nav-indicator').css({
					'left': left + (width / 2) + 'px',
					'opacity': 1
        });
    });

    //모바일용 gnb 나타내기!!
    $(".mo-gnb-btn img").click(function () {
      $(".mo-header, .wrap-mo-gnb, .mo-top-area").toggleClass("active"); 
      $(".menu-ico, .close-ico").toggle(); 
      // 뒷배경 스크롤 방지 (아까 배운 꿀렁임 방지 적용!)
      $("body").toggleClass("no-scroll");
  });

    // 탭메뉴
    $('.mo-main-menu li').click(function() {
      $('.mo-main-menu li').removeClass('active');
      $(this).addClass('active');

      const tabId = $(this).attr('data-tab');

      $('.tab-content').removeClass('active');
      $('#' + tabId).addClass('active');
    });


    //footer > family site, 그룹사바로가기 클릭했을 때 나타나는 서브메뉴
    $(".site-con").mouseenter(function(){
        $(".site-con ul").stop().slideDown(500);
    });
    $(".site-con").mouseleave(function(){
        $(".site-con ul").stop().slideUp(500);
    });


    $('.top-ban-btn').click(function(){
            $('.top-ban').stop().slideUp(500);
        });
        $(".top-btn").click(function(){
            $('html, body').stop().animate({scrollTop : 0}, 500);
        });


// gnb 스크롤했을때!! 
$(window).scroll(function() {
  if ($(this).scrollTop() > 50) {
      $('#header').addClass('scrolled');
  } else {
      $('#header').removeClass('scrolled');
  }
});



    // //마우스 스크롤했을때 헤더에 배경색상넣기
    // window.addEventListener('scroll', function () { 
    // const header = document.getElementById('header');
    // if (window.scrollY > 50) {
    // header.classList.add('scrolled');
    // } else {
    // header.classList.remove('scrolled');
    // }
    // });





    // 탑버튼 스크롤 하면 나타나기 
    const topBtn = document.querySelector('.top-btn');

    window.addEventListener('scroll', () => {
    if (window.scrollY > 250) {
        topBtn.style.display = 'block';
    } else {
        topBtn.style.display = 'none';
    }
    });




    $(window).resize(function() {
        if (window.matchMedia("(min-width: 1280px)").matches) {
            $("body").removeClass("no-scroll");
            $(".wrap-mo-gnb, .mo-top-area").removeClass("active");
            $(".close-ico").hide();
            $(".menu-ico").show();
        }
    });
  }


  // [3] 실제 실행 부분: HTML 인클루드가 완료된 후 initCommonDesign을 실행해라!
document.addEventListener("DOMContentLoaded", () => {
    includeHTML(initCommonDesign);
});
