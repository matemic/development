$(document).ready(function()  {
const element = function(el, heightContainer) {
    return $(el).click(function(e) {
        let navHeight =  $(heightContainer).outerHeight();
        let hash = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(hash).offset().top - navHeight
        }
    , 1000);
        
        e.preventDefault();
    });
}

element('.nav-link', '.navigation');
element('.scroll-down-link', '.navigation');
});
