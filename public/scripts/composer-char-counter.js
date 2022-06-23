$(document).ready(function() {

  //counts the number of characters input into the compose tweet form. shows the number of characters remaining. turns the counter red when the number is negative.
  $('#tweet-text').on('input', function() {

    let $tweetLength = $(this).val().length;
    const maxChars = 140;

    let $charsRemaining = (maxChars - $tweetLength);

    let $charCounter = $(this).parent().find('output').text($charsRemaining);

    if ($charsRemaining < 0) {
      $($charCounter).addClass("invalid");
    }

    if ($charsRemaining > 0) {
      $($charCounter).removeClass("invalid");
    }

  });

});