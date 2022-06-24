$(document).ready(function() {

  /////////////////////////////////////////////
  ////////////// Tweet Rendering /////////////
  ///////////////////////////////////////////

  //(callback) takes a tweet object and returns a tweet <article> element containing the entire html structure of the tweet
  const createTweetElement = function(tweetData) {

    let $tweet = $(`<article class="tweet-section">
        <header class="tweet-header">
          <div class="user-info">
            <img src="${tweetData.user.avatars}" width="64px" height="64px" class="profile-pic">
            <h3 class="profile-name">
              ${tweetData.user.name}
            </h3>
          </div>
          <h3 class="username">
            ${tweetData.user.handle}
          </h3>
        </header>
        <article class="tweet">
          ${tweetData.content.text}
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
      alert("Speak up! Please enter some text into your tweet 🐦");
      return;
    }
    if ($("#tweet-text").val().length > 140) {
      alert("tl;dr please use fewer than 140 characters 🐦");
      return;
    }

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $data
    })
      .then(function() {
        $("#tweets-container").empty();
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


