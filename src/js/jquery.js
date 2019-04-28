$(document).ready(function(){
    $('.expandable').click(function() {
        $(this).children("i").toggle(".fa-chevron-down");
        $(this).siblings('.nav-sub-links').toggle('fast');
    });

    $('.open-btn').click(function() {
        $('#navbar').css('left','0');
        if ($(window).outerWidth() > 767) {
          $('#main-doc').css('margin-left','14%');
        }
        $('#main-doc').addClass('overlay');
        $('pre').addClass('overlay');
        $('.section-box-container').addClass('overlay');

    });

    $('.close-btn').click(function() {
      closeButtonAction();
    });

    /*** For mobile view only
      *  close the navbar when a sub link is clicked
      */
    if ($(window).outerWidth() < 768) {
      $('.nav-sub-links').click(function() {
        closeButtonAction();
      });
    }

});

function closeButtonAction() {
      $('#navbar').css('left','-100%');
      $('#main-doc').css('margin-left', '0');
      $('#main-doc').removeClass('overlay');
      $('pre').removeClass('overlay');
      $('.section-box-container').removeClass('overlay');
}
