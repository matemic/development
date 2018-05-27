$(document).ready(function () {
    const element = function (el, heightContainer) {
        let navHeight = $(heightContainer).outerHeight();
        $(el).click(function (e) {
            let hash = $(this).attr('href');
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 1000);
            e.preventDefault();
        })
        $(window).click(function() {
            if ( $('.navbar-collapse').is('.collapse.show')) {
            $('.navbar-collapse').removeClass('show');
            }
        })
    }

    element('.scroll-down-link', '.navbar');
    element('.header a', '.navbar');
    element('.nav-link', '.navbar');
    
});