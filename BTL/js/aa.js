$(document).ready(function() {
    $(window).scroll(function() { 
        if($(this).scrollTop()) {
            $('#go-to-top').fadeIn();
        } else {
            $('#go-to-top').fadeOut();
        }
    });
});
$('#go-to-top').click(function() {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
});