$(document).ready(function(){
    $('.expandable').click(function() {
        $(this).children("i").toggle(".fa-chevron-down");
        $(this).siblings('.nav-sub-links').toggle('fast');
    });

    $('.open-btn-tablet').click(function() {
        $('#navbar').css('left','0');
        $('#main-doc').css('margin-left','15%');
        $('#main-doc').addClass('overlay');
        $('pre').addClass('overlay');
        $('.section-box-container').addClass('overlay');

    });

    $('.close-btn-tablet').click(function() {
        $('#navbar').css('left','-40%');
        $('#main-doc').css('margin-left', '0');
        $('#main-doc').removeClass('overlay');
        $('pre').removeClass('overlay');
        $('.section-box-container').removeClass('overlay');
    });

});
