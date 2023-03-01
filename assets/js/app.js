$(function(){

    var userWidth = document.documentElement.scrollWidth,
        posts__slider = $("#posts__slider"),
        slides = 3;

    slides = checkWidth(userWidth, slides);

    $(window).on("scroll", function(){
        slides = checkWidth(userWidth, slides);
    })

    function checkWidth(userWidth, slides) {
        userWidth = document.documentElement.scrollWidth;
        if (userWidth>990) {
            posts__slider.addClass("three");
            posts__slider.removeClass("two");
            posts__slider.removeClass("one");
            return slides = 3;
        } else if (userWidth>575) {
            posts__slider.removeClass("three");
            posts__slider.addClass("two");
            posts__slider.removeClass("one");
            return slides = 2;
        } else {
            posts__slider.removeClass("three");
            posts__slider.removeClass("two");
            posts__slider.addClass("one");
            return slides = 1;
        }
    }

    $("[data-slider]").slick({
        infinite: true,
        autoplay: true,
        dots: true,
        autoplaySpeed: 2000
    });

    $("[data-slider_posts]").slick({
        infinite: true,
        slidesToShow: slides,
        slidesToScroll: slides
    });

    var header = $("#header"),
        nav = $("#nav"),
        introH = $("#intro__slider").innerHeight(),
        scrollOffset = $(window).scrollTop();

    checkScroll(scrollOffset);

    $(window).on("scroll", function(){

        scrollOffset = $(this).scrollTop();

        checkScroll(scrollOffset);
    });

    function checkScroll(scrollOffset){

        if ( scrollOffset >= introH ) {
            header.addClass("fixed");
            nav.addClass("fixed");

        } else {
            header.removeClass("fixed");
            nav.removeClass("fixed");
        }
    }

    $("[data-scroll]").on("click", function(event){
        event.preventDefault();

        var $this = $(this),
            blockId = $this.data('scroll'),
            blockOffset = $(blockId).offset().top-50;

        $("#nav a").removeClass("active");
        $this.addClass("active");

        navToggle();

        $("html, body").animate({
            scrollTop: blockOffset
        });

    });

    $("#nav-toggle").on("click", function(event){
        event.preventDefault();
        navToggle();
    });

    function navToggle() {
        $("#nav").toggleClass("active");
        $("#nav-toggle").toggleClass("active");
    }

    $("#projects__button").on("click", function(event){
        event.preventDefault();

        var min = 0,
            max = 5;

        var corrector = $("button.projects__btn.active").data('show');

        console.log(corrector);

        switch(corrector) {
            case '.all':
                min = 0;
                max = 5;
                break;
            case '.web--design':
                min = 0;
                max = 1;
                break;
            case '.mobile--app':
                min = 2;
                max = 3;
                break;
            case '.illustration':
                min = 4;
                max = 5;
                break;
            case '.photography':
                min = 6;
                max = 8;
                break;
        }

        for (let i = 0; i < 3; i++) {
            itemLoader(min, max);
        }
    });

    function itemCreator(min, max) {
        var categories = ['#web--design', '#web--design2', '#mobile--app', '#mobile--app2', '#illustration', '#illustration2', '#photography', '#photography2', '#photography3'];
        let rand = Math.round(min - 0.5 + Math.random()*(max - min + 1));

        let randomObject = categories[rand];

        return $(randomObject);
    }

    function itemLoader(min, max) {
        console.log(min, max);
        var newItem = itemCreator(min, max);
        $(newItem).clone().appendTo("#projects__content");
    }



    /* Buttons in Projects */

    $("[data-show]").on("click", function(event){
        event.preventDefault();

        var $this = $(this),
            blockClass = $this.data('show');

        $(".projects__btn").removeClass("active");
        $(this).addClass("active");

        $(".projects__item").addClass("hovered");
        $(blockClass).removeClass("hovered");
        $(blockClass).addClass("active");

    });

});
