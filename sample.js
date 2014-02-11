$( document ).ready(function() {

  startCounter();
  positionCounterHorizontal();

  $( window ).resize( function () {
    positionCounterHorizontal();
  });

  $( '.how_long' ).on( 'click',function(e) {
    e.preventDefault();
    animateToCounter();
  });

  function width() {
    return $( window ).width();
  }

  function animateToCounter() {
    var distance;

    if ( width() > 550 ) {
      distance = $( '#countdown_anchor' ).offset().top - 100;
    } else {
      distance = $( '#countdown_anchor' ).offset().top - 150;
    }

    $( "html, body" ).animate( { scrollTop: distance }, 'normal' );
  }

  function startCounter() {
    var expiryDate = new Date(2014, 2-1, 3, 9);

    $( '#countdown-container' ).countdown( { until: expiryDate, timezone: -6, format: 'dHMS', layout: '<div class="day-number countdown-number">{dn}</div><div class="hour-number countdown-number">{hn}</div><div class="minute-number countdown-number">{mn}</div><div class="second-number countdown-number">{sn}</div>', onTick: watchCountdown } );
  }

  function watchCountdown(periods) {
    var today          = new Date();
    var expiryDate     = new Date(2014, 2-1, 3, 9);
    var nowToExpiry    = Math.round( ( expiryDate.getTime() - today.getTime() ) / 1000 ) ;
    var launchToExpiry = 604800;

    revealHowLong( nowToExpiry );
    positionSignupBlock( today );

    if ( nowToExpiry <= launchToExpiry ) {
      var secondsRemaining = $.countdown.periodsToSeconds( periods );
      var percentage       = secondsRemaining / launchToExpiry;

      positionProgressBar( percentage );
      positionCounterVertical( percentage );
    }
  }

  function positionProgressBar( percentage ){
    var modifier, initialBarPos, adjustedBarPos;

    if ( width() > 550  ) {
      modifier       = 200 * percentage;
      initialBarPos  = -2003;
      adjustedBarPos = Math.round( ( initialBarPos * percentage ) + modifier );
    } else {
      initialBarPos  = -1260;
      adjustedBarPos = Math.round( ( initialBarPos * percentage ) - 615);
    }

    var newBarPosition = '0px ' + adjustedBarPos + 'px';
    $( '.progress_bar' ).css( 'background-position', newBarPosition );
  }

  function revealHowLong(nowToExpiry) {
    var revealTime = 583200;

    if ( nowToExpiry <= revealTime ) {
      $( '.how_long' ).css( { display: 'block', height: 'auto' } );
    }
  }

  function positionSignupBlock( today ) {
    var feb1 = new Date( 2014, 2-1, 1, 9 ).getTime();
    var feb2 = new Date( 2014, 2-1, 2, 9 ).getTime();

    if ( ( today.getTime() < feb1 ) && ( today.getTime() > feb2 ) ) {
      if ( width() > 550 ) {
        $( '.signup' ).css( 'bottom', '115px' );
      } else {
        $( '.signup' ).css( 'bottom', '80px' );
      }
    }
  }

  function positionCounterVertical(percentage) {
    var modifier;
    var condition        = ( width() > 550 );
    var initialCountPos  = ( condition ) ? 1788 : 1253 ;
    var rawModifier      = 8 + ( 24 * percentage ) - ( 12 * percentage );
    var adjustCountPos   = Math.round( initialCountPos * percentage );
    var newCountPosition = adjustedCountPos + modifier + 'px';

    if ( width() > 550 ) {
      modifier  = ( rawModifier < 20 ) ? ( rawModifier + 12 ) : rawModifier;
    } else {
      modifier  = 5 + ( 18 * percentage );
    }

    $( '.countdown-area-block' ).css( 'bottom', newCountPosition );
  }

  function positionCounterHorizontal() {
    var condition = width() <= 550;
    var widthDiff = ( condition ) ? ( 551 - width ) : ( 768 - width() );
    var maxDiff   = ( condition ) ? 231 : 217;
    var adjDiff   = 0 + ( maxDiff - widthDiff );
    var result    = ( 1/maxDiff ) * adjDiff;
    var position  = ( condition ) ? ( ( 104 * result ) - 12 ) : ( ( 99 * result ) - 25 ) ;

    if ( width() <= 550 ) {
      $( '.countdown-area-block' ).css( 'right', position + 'px' );
      $( '.how_long' ).css( 'right', position + 7 + 'px' );
    } else if ( width() >= 961 ) {
      $( '.countdown-area-block' ).css( 'right', '125px' );
      $( '.how_long' ).css( 'right', '214px' );
    } else if ( width() > 767 && width() < 961 ) {
      $( '.countdown-area-block' ).css( 'right', '19px' );
      $( '.how_long' ).css( 'right', '107px' );
    } else {
      $( '.countdown-area-block' ).css( 'right', position + 'px' );
      $( '.how_long' ).css( 'right', position + 22 + 'px' );
    }
  }

  function facebookShare() {
    share1 = new FacebookShare("It's Parditime!",
                               "http://parditime.jonpardi.com",
                               "http://d3kvkbo6ejfu6s.cloudfront.net/uploads/client_4/campaign_180/image/4921/127ca3ab4127/album.jpg",
                               "It's almost Parditime...watch the clock and be the first to find out!", null);
    share1.show_facebook_modal();
  }

  function postToTwitter() {
    var tweetUrl = "https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Fparditime.jonpardi.com&text=Make%20sure%20you%27re%20on%20the%20list%20for%20%23PardiTime%20with%20%40JonPardi%2C%20check%20it%20out%20at%20http%3A%2F%2Fparditime.jonpardi.com";
    window.open(tweetUrl,'Post to Twitter!','height=400,width=500' );
  }
});