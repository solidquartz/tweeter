const { data } = require("jquery");

$(document).ready(function() {

  /////////////////////////////////////////////
  ///////////// Tweet Submission /////////////
  ///////////////////////////////////////////

  $("form").on("submit", function(event) {
    event.preventDefault();
    const $data = $(this).serialize();
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $data
    });
  });


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
            ${tweetData.created_at}
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
      $('#tweets-container').append($tweet);
    }
  };


  /////////////////////////////////////////////
  ////////////// Tweet Fetching //////////////
  ///////////////////////////////////////////

  const loadTweets = () => {
    $.ajax("/tweets", { method: "GET" })
      .done(function(data) {
        renderTweets(data);
      });
  };
  const loaded = loadTweets(data);
  console.log(loaded);

});

