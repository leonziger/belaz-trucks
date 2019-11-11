import $ from 'jquery';

const screenWidth = $(window).width();
if ( screenWidth <= 991) {
    $('[href^="#"]').click(function(){
        const mainHeader = document.querySelector('.main-header');
        const mainHeaderPosition = getComputedStyle(mainHeader).position;
        const link = $(this).attr('href');
        let coordinates = $(link).offset().top;

        if ( mainHeaderPosition === 'fixed') {
            coordinates = $(link).offset().top-$('.main-header').height();
        }

        $('html, body').animate({scrollTop:coordinates}, 1000);
    });
}
