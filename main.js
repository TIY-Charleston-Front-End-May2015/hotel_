var userDataUrl = 'http://tiy-fee-rest.herokuapp.com/collections/rDigest';
var userEmail;
var userPwd;
var subredditURL = [];
var userId;
var newSubreddit = [];
var getSubredditArray = [];
var baseURL = 'http://www.reddit.com/';
var topThree;
var postDetails;

$(document).ready(function(){
page.init();
})

var page = {

    init: function () {
    page.initStyling();
    page.initEvents();
    },
    initStyling: function() {
    },
    initEvents: function() {
    page.loadSubreddits();
    $('#subredditSearch').on('change', function(e){
      e.preventDefault();
      page.addMoreSubreddits();
    })
    },
    loadSubreddits: function () {
      $.ajax({
        url: baseURL + '.json',
        method: 'GET',
        success: function(data) {
        topThree = data.data.children.slice(0,3);
        postDetails = _.map(topThree, function(el){
            return {
              title: el.data.title,
              subreddit: el.data.subreddit,
              url: el.data.url
            }
          })
        var postTmpl = _.template($('#postTmpl').html());

            _.each(postDetails, function (el) {
              // console.log(videoTmpl(el));
              $('.container').prepend(postTmpl(el));
            });
            },
            error: function (err) {
              console.log("subreddit error:", err);
            }
        });
      },
    addMoreSubreddits: function () {
      baseURL = baseURL + 'r/' + $('#subredditSearch').val();
      page.loadSubreddits();
      baseURL = 'http://www.reddit.com/';
    }
}
