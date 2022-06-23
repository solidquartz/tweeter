$(document).ready(function() {
  console.log("Hi!");

  //takes a tweet object and returns a tweet <article> element containing the entire html structure of the tweet
  const createTweetElement = function() {

    //creates a hardcoded tweet
    const $tweet = $(`<article class="tweet-section">
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


  // //takes in an array of objects and appends each one to the #tweets-container.
  // const renderTweets = function() {
  //leverages the createTweetElement functions by passing the object to it, then using the returned jQuery object by appending it to the #tweets-container section

  //loops through tweets
  //calls createTweetElement for each tweet
  //takes return value and appends it to the tweet container
  // };






  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  };

  const $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log("$tweet is: ", $tweet); // to see what it looks like
  $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.



});