(function( $ ){
  // Define element to append to
  var $twitterSection = $('.section.twitter');
  // http://www.simonwhatley.co.uk/parsing-twitter-usernames-hashtags-and-urls-with-javascript
  String.prototype.parseLinks = function() {
    return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function( url ) {
      return url.link( url );
    });
  };
  String.prototype.parseUsers = function() {
    return this.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
      var username = u.replace("@","");
      return u.link("http://twitter.com/"+username);
    });
  };
  String.prototype.parseHash = function() {
    return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
      var tag = t.replace("#","%23");
      return t.link("http://search.twitter.com/search?q="+tag);
    });
  };
  // Date formatting
  function formatDate( date ) {
    var newDate = new Date ( date ),
        weekday = newDate.toString().substr(0,3),
        day = newDate.getDate(),
        month = parseInt( newDate.getMonth(), 0 ) + 1,
        year = newDate.getFullYear().toString().substr(2, 2),
        hours = newDate.getHours(),
        minutes = newDate.getMinutes();
    // Determine AM/PM + Adjust hours
    amOrPm = hours < 12 ? "AM" : "PM";
    hours = hours < 12 ? hours : hours - 12;
    hours = hours === 0 ? 12 : hours;
    // Tack a zero on, if needed
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    // Return formatted string
    return month + "/" + day + "/" + year + " at " + hours + ":" + minutes + amOrPm;
  }
	// Define twitter feed url
  var twitterFeed =  window.location.href + 'assets/php/twitter.php';
  // Grab tweets
  $.getJSON( twitterFeed, function( tweets ) {
    // Define the list
    var $tweetUl = $('<ul class="vertical tight tweet-list" />');
    // Loop over tweets
    $.each( tweets, function( i, tweet) {
      // Define list items and append to list
      var theTweet = tweet.text.parseLinks().parseUsers().parseHash();
      var createdAt = formatDate( tweet.created_at );
      var $tweetLi = [
        '<li>',
          '<span class="tweet">',
            theTweet,
          '</span>',
          ' <span class="date">&times; ',
            '<a href="#">',
              createdAt,
            '</a>',
          '</span>',
        '</li>'
      ].join('');
      $tweetUl.append( $tweetLi );
    });
    // Remove loading message
    // Assumes a 'Loading...' <p class="loading"> is in the markup
    $('p.loading').remove();
    // Append list to the pge
    $twitterSection.append( $tweetUl );
  });
}( jQuery ));