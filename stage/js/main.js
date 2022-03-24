/* global window, const*/

$(function () {

    "use strict";

    // navbar change background color 

    $(window).on('scroll load', function () {
        $(window).scrollTop() > 60 ? $('.navbar').addClass('scroll') : $('.navbar').removeClass('scroll');
    });

    // Array Get Sections Name
    // /* Toggle Class Active in Navbar */
    const link = '.navbar .navbar-collapse .nav-item:not(.social) .nav-link',
        sectionsName = [];
    // i is varibale count for loop
    let i;
    // loop push the name sections in array
    for (i = 1; i <= $(link).length; i++) {
        sectionsName.push($(`.navbar .navbar-collapse .nav-item:nth-child(${i}) .nav-link`).attr('href'));
    }
    // change nav link color 
    $(window).on('scroll load', function () {
        sectionsName.forEach(function (item) {
            $(window).scrollTop() >= $(item).offset().top ? $(`${link}[href='${item}']`).parent().addClass('active').siblings().removeClass('active') : false;
        });
    });

    // Scroll to offset Section

    $(link + ', .link').on('click', function (e) {

        $('html').animate({
            scrollTop: Math.ceil($($(this).attr('href')).offset().top)
        }, 1200);
        e.preventDefault();
    });


    // Swiper ready
    const imageSlider = new Swiper('.swiper-container', {
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
        },
        loop: true,
        spaceBetween: 30,
        slidesPerView: 5,
        breakpoints: {
            // when window is <= 580px
            580: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            // when window is <= 768px
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            // when window is <= 992px
            992: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            // when window is <= 1200px
            1200: {
                slidesPerView: 4,
                spaceBetween: 20
            },

        }
    });

    // Modal show 

    $('.lightbox').on('click', function () {
        const dataTarget = $(this).data('target');
        const dataImageSrc = $(this).data('image-src');
        $(`${dataTarget} .image-container img`).attr('src', dataImageSrc)
        $(dataTarget).css('padding-top', $(window).scrollTop()).addClass('active');
    })

    // Modal Exit

    $('.exit, .close-modal, .hide').on('click', function (e) {
        e.preventDefault();
        const dataTarget = $(this).data('target');
        $(dataTarget).removeClass('active');
        if (dataTarget == '#video-modal') {
            const videSrc = $('.stop-video').attr('src');
            $('.stop-video').attr('src', videSrc);
        }
    })

    // Request Go 

    $('#mfb-Container .btn:first-Of-type').on('click', function (e) {
        const dataTarget = $(this).data('target');
        e.preventDefault();
        $(dataTarget).removeClass('active');
        $('html').animate({
            scrollTop: Math.ceil($($(this).attr('href')).offset().top)
        }, 1200);
    })

    // video Show

    $('.show-video').on('click', function (e) {
        e.preventDefault();
        const dataTarget = $(this).attr('href');
        $(dataTarget).addClass('active');
    })
});
// Page Is  Load 
$(document).ready(function () {
    $('.load').fadeOut();
});

