import $ from 'jquery';


$(window).scroll(function (){
  if ($(this).scrollTop() > 0){
    $('.scroll-up').fadeIn();
  } else{
    $('.scroll-up').fadeOut();
  }
});

$('.scroll-up').click(function (){
  $('body,html').animate({
    scrollTop:0
  }, 800);
});
