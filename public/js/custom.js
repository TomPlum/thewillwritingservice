$(document).ready(function(){
    $(".nav-button a").click(function(){
        $(".nav-overlay").fadeToggle(200);
        $(this).toggleClass('nav-btn-open').toggleClass('nav-btn-close');
    });
});
$('.nav-overlay').on('click', function(){
    $(".nav-overlay").fadeToggle(200);
    $(".nav-button a").toggleClass('nav-btn-open').toggleClass('nav-btn-close');
    open = false;
});

$(window).scroll(function() {
    //console.log("Page Scroll: " + $(".navbar-default").offset().top);
    if ($(".navbar-default").offset().top > 70) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
        $(".menu-logo").addClass("menu-logo-collapse");
        $(".nav-link").addClass("navbar-nav-collapse");
        $(".navbar-nav > li").addClass("shrink-list")
        //$(".navbar-default").addClass("navbar-default-up");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
        $(".menu-logo").removeClass("menu-logo-collapse");
        $(".nav-link").removeClass("navbar-nav-collapse");
        $(".navbar-nav > li").removeClass("shrink-list")
        //$(".navbar-default").removeClass("navbar-default-up");
    }
});
