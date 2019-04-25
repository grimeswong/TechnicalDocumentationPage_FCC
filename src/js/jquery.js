$(document).ready(function(){
    $('.expandable').click(function() {
        $(this).children("i").toggle(".fa-chevron-down");
        $(this).siblings('.nav-sub-links').toggle('fast');
    });

    $('.open-btn-tablet').click(function() {
        $('#navbar').fadeIn(500).css({'display':'block', 'left':'0'});
        $('#main-doc').css('margin-left','15%');
        $('main').css('background-color','rgba(0,0,0,0.6)')
    });

    $('.close-btn-tablet').click(function() {
        $('#navbar').fadeOut(500).css({'display':'none', 'left':'0'});
        $('#main-doc').css('margin-left', '0');
        $('main').css('background-color','rgb(255,255,255)');
    });

});
