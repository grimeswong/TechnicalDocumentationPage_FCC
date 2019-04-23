$(document).ready(function(){
    $('.expandable').click(function() {
        $(this).siblings('.nav-sub-links:first').toggle('fast')
    });
});
