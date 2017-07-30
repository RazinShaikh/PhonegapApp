// Initialize app
var myApp = new Framework7();

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

$$(document).on('deviceready', function() {
    console.log("Getting data from server");
    $$.ajax({
        datatype: 'json',
        type: 'GET',
        cache: true,
        url: 'http://192.168.0.102:8000/activity/',
        success: function(data) {
            var articles = JSON.parse(data);
            addArticlesLatest(articles);
            addArticlesHot(articles);
        }
    });
});


function addArticlesLatest(data) {
    for (var i = 0; i < data.length; i++) {
        htmlStr = "<div class=\"card myCard\"><div class=\"card-content\"><div class=\"card-content-inner\"><div class=\"row\"><div class=\"col-50\"><img src=\"img/1.jpg\" height=\"90\" width=\"147\"></div><div class=\"col-50\">" + data[i].title + "</div></div></div></div></div>"
        $$(pageTab2).append(htmlStr);
    }
}

function addArticlesHot(data) {
    for (var i = 0; i < data.length; i++) {
        htmlStr = "<div class=\"card myCard\"><div class=\"card-content\"><div class=\"card-content-inner\"><div class=\"row\"><div class=\"col-50\"><img src=\"img/2.jpg\" height=\"90\" width=\"147\"></div><div class=\"col-50\">" + data[i].title + "</div></div></div></div></div>"
        $$(pageTab1).append(htmlStr);
    }
}




var mySwiper = myApp.swiper('.swiper-container', {
    speed: 400,
    pagination: '.swiper-pagination'
    // spaceBetween: 100
});
