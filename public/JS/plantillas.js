var swiper = new swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 20,
    effect: 'fade',
    loop: true,
    spped: 300,
    mousewheel: {
        invert: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
});