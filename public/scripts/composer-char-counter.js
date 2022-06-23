$(document).ready(function() {

  $('#tweet-text').on('input', function() {

    let $tweetLength = $(this).val().length;
    const maxChars = 140;

    let $charsRemaining = (maxChars - $tweetLength);

    let $charCounter = $(this).parent().find('output').text($charsRemaining);

    if ($charsRemaining < 0) {
      $($charCounter).addClass("invalid");
}


    //addClass "invalid" when over max characters
    //invalid will be css coded red
    //removeClass when under

    //tweet-text.text(maxChar - $tweetLength)
    //this?
  });

});