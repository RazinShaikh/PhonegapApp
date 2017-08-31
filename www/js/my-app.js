// Initialize app
var myApp = new Framework7();

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main');

myApp.onPageInit('home-1', loadArticleList());


function addArticlesLatest(data) {
    for (var i = 0; i < data.length; i++) {
        htmlStr = "<div class=\"card myCard\" onclick=\"viewArticle(" + data[i].id + ");\"><div class=\"card-content\"><div class=\"card-content-inner\"><div class=\"row\"><div class=\"col-50\"><img id=\"img_latest_"+i+"\" src=\"\" height=\"90\" width=\"147\"></div><div class=\"col-50\">" + data[i].title + "</div></div></div></div></div>"
        $$(pageTab2).append(htmlStr);
    }
}

function addArticlesHot(data) {
    for (var i = 0; i < data.length; i++) {
        htmlStr = "<div class=\"card myCard\" onclick=\"viewArticle(" + data[i].id + ");\"><div class=\"card-content\"><div class=\"card-content-inner\"><div class=\"row\"><div class=\"col-50\"><img id=\"img_hot_"+i+"\" src=\"\" height=\"90\" width=\"147\"></div><div class=\"col-50\">" + data[i].title + "</div></div></div></div></div>"
        	$$(pageTab1).append(htmlStr);
    }
}

function addThumbnailsLatest(data) {
    for (var i = 0; i < data.length; i++) {
        $$('#img_latest_'+i).attr("src", "data:image/jpg;base64," + data[i]);
    }
}

function addThumbnailsHot(data) {
    for (var i = 0; i < data.length; i++) {
        $$('#img_hot_'+i).attr("src", "data:image/jpg;base64," + data[i]);
    }
}


var mySwiper = myApp.swiper('.swiper-container', {
    speed: 400,
    pagination: '.swiper-pagination'
    // spaceBetween: 100
});

function loadArticleList() {
    console.log("Getting article list from server");
    $$.ajax({
        datatype: 'json',
        type: 'GET',
        cache: true,
        url: 'http://192.168.0.102:8080/activity.json',
        success: function(data) {
            var articles = JSON.parse(data);
            addArticlesLatest(articles);
            addArticlesHot(articles);
        }
    });
    $$.ajax({
        datatype: 'json',
        type: 'GET',
        cache: true,
        url: 'http://192.168.0.102:8080/thumbs.json',
        success: function(data) {
            var thumbs = JSON.parse(data);
            addThumbnailsLatest(thumbs);
            addThumbnailsHot(thumbs);
        }
    });

}



function viewArticle(id) {
    console.log("Fetching article " + id + " from server");
    mainView.router.loadPage('article.html');
    $$.ajax({
        datatype: 'json',
        type: 'GET',
        cache: true,
        url: 'http://192.168.0.102:8080/activity/'+id+'.json',
        success: function(data) {
            var article = JSON.parse(data);
            $$('#articleTitle').html(article.title);
            $$('#articleBody').html(article.body);
            console.log("data loaded");
        }
    });
}

myApp.onPageInit('about', function (page) {
  console.log('About page initialized');
  console.log(page);
});





