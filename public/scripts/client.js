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

  //takes a tweet object and returns a tweet <article> element containing the entire html structure of the tweet
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


  //driver code
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  renderTweets(data);

});