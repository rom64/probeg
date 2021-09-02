$( document ).ready(function() {

    /*loadSvg*/
    $('[data-svg]').each(function(){
        var $this = $(this);
        var $svg = $this.data('svg');
        var $filename = $svg.split('\\').pop().split('/').pop().replace(".svg", "");

        $this.load($svg, function(responseTxt, statusTxt){
            if(statusTxt == "success"){
                $this.find('svg').addClass('svg svg-'+$filename+'');
            }
        });
    });
    thumbImg();

});


function fontSize() {
    if($(window).width() < 767){

        $('html').css({fontSize: 15+'px'});
    }

    if($(window).width() > 767){
        var width = 1366; // ширина, от которой идет отсчет
        var fontSize = 15; // минимальный размер шрифта
        var bodyWidth = $('html').width();
        var multiplier = bodyWidth / width;
        if ($('html').width() >= width) fontSize = Math.floor(fontSize * multiplier);
        if ($('html').width() < width) fontSize = Math.floor(fontSize * multiplier);
        $('html').css({fontSize: fontSize+'px'});
    }
}

$(function() { fontSize(); });
$(window).resize(function() { fontSize(); });


$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 1300);
});



function thumbImg() {
    $('[data-thumb]').each(function () {
        var $this = $(this);
        var img = $this.find('img').attr('src');
        var size = $this.data('thumb');
        $this.css({
            'background-image': 'url(' + img + ')',
            'background-size': '' + size + ''
        });
    });
    return false;
}
//first-slider
$('.selection__left').slick({
    dots: true,
    infinite: true,
    autoplay: false,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    //variableWidth: true,

});
//slider-review
$('.review__slider').slick({
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive:[
        {
            breakpoint: 767,
            settings: {
                autoplay: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,

            }
        }
    ]

});
/*$(window).resize(function() {
    if($(window).width() < 768){
        $('.review__clients').slick({
            dots: true,
            arrows: false,
            slidesToShow: 4,
            slidesToScroll: 4,


        });
    }else{
        $('.review__clients').slick('unslick');
    }
});*/
$(window).on('resize', function(e){
    // Переменная, по которой узнаем запущен слайдер или нет.
    // Храним её в data
    var init = $(".review__clients").data('init-slider');
    // Если мобильный
    if(window.innerWidth < 768){
        // Если слайдер не запущен
        if(init != 1){
            // Запускаем слайдер и записываем в data init-slider = 1
            $('.review__clients').slick({
                arrows: false,
                dots: true,
                slidesToShow: 4,
                slidesToScroll: 4
            }).data({'init-slider': 1});
        }
    }
    // Если десктоп
    else {
        // Если слайдер запущен
        if(init == 1){
            // Разрушаем слайдер и записываем в data init-slider = 0
            $('.review__clients').slick('unslick').data({'init-slider': 0});
        }
    }
}).trigger('resize');
/*$('.review__clients').slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: false,
    mobileFirst: true,
    arrows: false,
    dots: true,
    responsive: [
        {
            breakpoint: 767,
            settings: "unslick"
        }
    ]
});*/
/*var acc = document.getElementsByClassName("accordion__btn");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });

}*/
// accordion
/*$(document).ready(function() {
    $('.accordion__text').not($(this).next()).slideUp(500);
    //прикрепляем клик по заголовкам acc-head
    $('.accordion__btn').on('click', acc_slide);
});

function acc_slide(){
//скрываем все кроме того, что должны открыть
    $('.accordion__text').not($(this).next()).slideUp(500);
// открываем или скрываем блок под заголовком, по которому кликнули
    $('.accordion__btn').removeClass('in');
    $(this).toggleClass('in').next().slideToggle(500);

}*/

$(document).ready(function() {
    // $('.accordion__text').not($(this).next()).slideUp(500);
    //прикрепляем клик по заголовкам acc-head
    $('.accordion__btn').on('click', acc_slide);
});

function acc_slide(e){
//скрываем все кроме того, что должны открыть
    $('.accordion__text').not($(this).next()).slideUp(500);
// открываем или скрываем блок под заголовком, по которому кликнули


    if($(e.target).hasClass('in')){
        $('.accordion__btn').removeClass('in');
    }
    else{
        $('.accordion__btn').removeClass('in');
        $(this).toggleClass('in');
    }






    $(this).next().slideToggle(500);

}
// mob-menu
$('.header__mob-menu').on('click', function () {
    $('.header__content').toggleClass('open');

    $('body').toggleClass('overflow-hidden');
});
$('.header__menu-link').on('click', function(){
    $('.header__content').removeClass('open');
})
$('.header__close').on('click', function () {
    $('.header__content').toggleClass('open');

    $('body').toggleClass('overflow-hidden');
});

/*$(".count").each(function() {
    $(this)
        .prop("Counter", 0)
        .animate(
            {
                Counter: $(this).text()
            },
            {
                duration: 8000,
                easing: $(this).data("esing"),
                step: function(now) {
                    $(this).text(Math.ceil(now));
                }
            }
        );
});*/


var options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
}
var callback = function(entries, observer) {
    entries.map(item => {
        if(item.isIntersecting) {
            $('.count').each(function () {
                $(this).prop('Counter',0).animate({
                    Counter: $(this).text()
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    }
                });
            });
        }

    })
};
var observer = new IntersectionObserver(callback, options);
observer.observe(document.querySelector('.count'));


$(".review__item-text").mCustomScrollbar({
    theme:"dark"
});