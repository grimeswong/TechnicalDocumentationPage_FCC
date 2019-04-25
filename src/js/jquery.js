$(document).ready(function(){
    $('.expandable').click(function() {
        $(this).children("i").toggle(".fa-chevron-down");
        $(this).siblings('.nav-sub-links').toggle('fast');
    });
});
