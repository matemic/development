$(document).ready(function () {
    const element = function (el, heightContainer) {
        let navHeight = $(heightContainer).outerHeight();
        return $(el).click(function (e) {
            let hash = $(this).attr('href');
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 1000);
            e.preventDefault();
        })
    }

    element('.scroll-down-link', '.navbar');
    element('.header a', '.navbar');
    setTimeout(() => element('.nav-link', '.navbar'), 500);
});