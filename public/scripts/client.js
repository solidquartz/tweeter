
$(document).ready(function() {

  //hides error messages by default
  $("figure").hide();

  /////////////////////////////////////////////
  ////////////// Tweet Rendering /////////////
  ///////////////////////////////////////////

  //protects against cross-site scripting
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //(callback) takes a tweet object and returns a tweet <article> element containing the entire html structure of the tweet
  const createTweetElement = function(tweetData) {

    let $tweet = $(`<article class="tweet-section">
        <header class="tweet-header">
          <div class="user-info">
            <img src="${escape(tweetData.user.avatars)}" width="64px" height="64px" class="profile-pic">
            <h3 class="profile-name">
              ${escape(tweetData.user.name)}
            </h3>
          </div>
          <h3 class="username">
            ${escape(tweetData.user.handle)}
          </h3>
        </header>
        <article class="tweet">
          ${escape(tweetData.content.text)}
        </article>
        <footer>
          <p class="date-posted">
           ${timeago.format(tweetData.created_at)}
          </p>
    <div>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>

        </footer>
        </article>
    `);

    return $tweet;
  };


  //takes in an array of objects and appends each one to the #tweets-container.
  const renderTweets = function(data) {

    $("#tweets-container").empty();

    for (const tweetData of data) {
      const $tweet = $(createTweetElement(tweetData));
      $('#tweets-container').prepend($tweet);
    }
  };


  /////////////////////////////////////////////
  ///////////// Tweet Submission /////////////
  ///////////////////////////////////////////

  $("form").on("submit", function(event) {
    event.preventDefault();

    const $data = $(this).serialize();

    if ($("#tweet-text").val().length === 0) {

      const $emptyError = $(`
        <p class="warning">
          Speak up! Please enter some text into your tweet 🐦
        </p>`
      );

      $("figure").append($emptyError);
      $("figure").slideDown();
      return;

    } else {
      $("figure").slideUp(300);
      $("figure").empty();
    }


    if ($("#tweet-text").val().length > 140 && $("#tweet-text")) {

      const $longError = $(`
        <p class="warning">
          tl;dr please use fewer than 140 characters 🐦
        </p>`
      );

      $("figure").append($longError);
      $("figure").slideDown();
      return;

    } else {
      $("figure").slideUp(300);
      $("figure").empty();
    }

    if ($("#tweet-text").val().length <= 140 && $("#tweet-text"))
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: $data
      })
        .then(function() {
          $('form').trigger("reset");
          $(".counter").text("140");
          loadTweets();
        });
  });


  /////////////////////////////////////////////
  ////////////// Tweet Fetching //////////////
  ///////////////////////////////////////////

  const loadTweets = function() {
    $.ajax("/tweets", { method: "GET" })
      .then(function(data) {
        renderTweets(data);
      });
  };
  loadTweets();
});