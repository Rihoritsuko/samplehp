'use strict';

(function (global, $) {

  // staff stylingの設定 ////////////////////////
  var checkImgsLoad = function checkImgsLoad(callback) {
    var $elms = $('.checkImgsLoad');
    var len = $elms.length;
    var count = 0;

    $elms.each(function () {
      var src;
      var _this = this;
      var $img = $('<img>');

      if (_this.tagName === 'IMG') {
        src = _this.src;
      } else {
        src = $(_this).css('background-image');
        src = src.replace(/url\(|\)|"|'/g, '');
      }

      $img.on('load', function () {
        count++;
        if (len === count) {
          console.log('img load end');
          callback();
        }
      });
      $img[0].src = src;
    });
  };
  global.checkImgsLoad = checkImgsLoad;
})(window, jQuery);
'use strict';

(function (global, $) {

  // snsを制御 ////////////////////////
  var checkMicrosoft = function checkMicrosoft(twElm, fbElm, lineElm, goElm) {
    var isIE = false;
    var ua = navigator.userAgent;
    if (ua.match(/MSIE/) || ua.match(/Trident/) || ua.match(/Edge/)) {
      document.body.classList.add('is-microsoft');
    }
  };
  global.checkMicrosoft = checkMicrosoft;
})(window, jQuery);
'use strict';

(function (global, $) {

  var setMovie = function setMovie() {

    var ytPlayer;
    var ytPlayer2;

    // 動画のdomを取得
    // var movieElm = 'p-top-movie__iframe--top';
    // var movieElmDom = document.getElementById(movieElm);
    // var movieID = movieElmDom.getAttribute('data-movie');

    var movieElm2 = 'p-top-movie__iframe--bottom';
    var movieElmDom2 = document.getElementById(movieElm2);
    var movieID2 = movieElmDom2.getAttribute('data-movie');

    var $movie = $('#p-top-mv__play');
    var $box = $('.p-top-movie__wrap--top');

    var $movie2 = $('#p-top-movie');
    var $box2 = $('.p-top-movie__wrap--bottom');

    var $under = $('.p-cover');
    var $close = $('.p-top-movie__close');

    var youtubeInit = function youtubeInit() {

      // youtubeAPIを生成
      var tag = document.createElement('script');
      var firstScriptTag = document.getElementsByTagName('script')[0];
      tag.src = 'https://www.youtube.com/iframe_api';
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // youtubeを生成
      var onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {

        console.log(' === movie ready === ');

        // ytPlayer = new YT.Player(movieElm,{
        //   videoId: movieID,
        //   playerVars:{
        //     'autoplay': 0,
        //     'controls': 2,
        //     'enablejsapi': 1,
        //     'iv_load_policy': 3,
        //     'disablekb':1,
        //     'showinfo':0,
        //     'rel':0,
        //     'modestbranding': 1,
        //     'playsinline': 1
        //   },
        //   events:{
        //     'onReady': onPlayerReady,
        //     'onStateChange': onPlayerStateChange
        //   }
        // });

        ytPlayer2 = new YT.Player(movieElm2, {
          videoId: movieID2,
          playerVars: {
            'autoplay': 0,
            'controls': 2,
            'enablejsapi': 1,
            'iv_load_policy': 3,
            'disablekb': 1,
            'showinfo': 0,
            'rel': 0,
            'modestbranding': 1,
            'playsinline': 1
          },
          events: {
            'onReady': onPlayerReady2,
            'onStateChange': onPlayerStateChange2
          }
        });
      };
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    };

    var showModal = function showModal($dom) {
      $under.fadeIn(300);
      $dom.addClass('is-show');
    };

    var removeModal = function removeModal(obj, $dom) {
      $under.fadeOut(300);
      $dom.removeClass('is-show');
      obj.stopVideo();
    };

    var stateChangeFunc = function stateChangeFunc(obj, $dom) {
      var state = obj.getPlayerState();
      if (state === 0) {
        removeModal(obj, $dom);
      } else if (state === 1) {
        if (!$dom.is('is-show')) {
          console.log(1);
        }
      } else if (state === 3) {
        showModal($dom);
      }
    };

    var onPlayerStateChange = function onPlayerStateChange() {
      stateChangeFunc(ytPlayer, $movie);
    };
    var onPlayerReady = function onPlayerReady() {
      $close.add($under).on('click.n1', function () {
        removeModal(ytPlayer, $movie);
      });
    };

    var onPlayerStateChange2 = function onPlayerStateChange2() {
      stateChangeFunc(ytPlayer2, $movie2);
    };
    var onPlayerReady2 = function onPlayerReady2() {
      $close.add($under).on('click.n2', function () {
        removeModal(ytPlayer2, $movie2);
      });
    };

    youtubeInit();
  };
  global.setMovie = setMovie;
})(window, jQuery);
'use strict';

(function (global, $) {

  // ナビゲーションを制御 ////////////////////////
  var setNav = function setNav() {
    var $gnav = $('.l-gnav');
    var $cover = $('.l-gnav__cover');
    var $open = $('.l-header__btn');
    var $close = $('.l-gnav__close');

    $open.on('click', function () {
      $cover.fadeIn(300);
      $gnav.addClass('is-show');
    });
    $close.add($cover).on('click', function () {
      $cover.fadeOut(300);
      $gnav.removeClass('is-show');
    });
  };
  global.setNav = setNav;
})(window, jQuery);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (global, $) {

  TweenMax.set(['.is-first'], { autoAlpha: 0 });

  var setSlider = function setSlider() {
    var Slider = function () {
      function Slider() {
        _classCallCheck(this, Slider);

        this.reqId; // requestAnimationをキャンセルするID
        this.circumference = 15 * 2 * Math.PI; // 円周
        this.totalTime = 1000 * 7; // 切り替わる時間
        this.piece = this.circumference / this.totalTime; // 1msで進む円周
        this.current = 0; // 円周の合計値
        this.currentTime; // 今の時間
        this.oldTime = performance.now(); // 前の時間
        this.delta; // 1reqあたりの円周の増加量;
      }

      _createClass(Slider, [{
        key: 'setElm',
        value: function setElm() {
          this.$timer = $('#timer');
          this.$count = $('#p-top-mv__count');
          this.$slider = $('.p-top-mv__slider');
          this.$child = $('.p-top-mv__sliderChild');
          this.$prev = $('.p-top-mv__prev a');
          this.$next = $('.p-top-mv__next a');
        }
      }, {
        key: 'add',
        value: function add() {
          this.currentTime = performance.now();
          this.delta = (this.currentTime - this.oldTime) * this.piece;
          this.current += this.delta;
          this.$timer[0].style.strokeDasharray = this.current + ' ' + this.circumference;
          this.oldTime = this.currentTime;
        }
      }, {
        key: 'loop',
        value: function loop() {
          if (this.current >= this.circumference) {
            this.current = 0;
            this.$slider.slick('slickNext');
          }
          this.add();
          this.reqId = window.requestAnimationFrame(this.loop.bind(this));
        }
      }, {
        key: 'slick',
        value: function slick() {
          var length = this.$child.length;
          var _this = this;

          this.$slider.on('init', function (event, slick) {
            TweenMax.to('.is-first', 2, { ease: Circ.easeOut, autoAlpha: 1 });
            $('.slick-current').addClass('now-current');
          });

          this.$slider.slick({
            prevArrow: this.$prev,
            nextArrow: this.$next,
            rtl: true,
            swipe: false
          }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            var $current = $('.slick-current');
            _this.$count[0].innerHTML = nextSlide + 1;
            _this.current = 0;
            $current.prev().addClass('now-current');
            $current.next().addClass('now-current');
          }).on('afterChange', function (event, slick, currentSlide, nextSlide) {
            $('.slick-slide:not(.slick-current)').removeClass('now-current');
          });
        }
      }, {
        key: 'init',
        value: function init() {
          this.setElm();
          this.slick();
          this.loop();
        }
      }]);

      return Slider;
    }();

    var slider = new Slider();
    slider.init();
  };
  global.setSlider = setSlider;
})(window, jQuery);
'use strict';

(function (global, $) {

  // snsを制御 ////////////////////////
  var setSns = function setSns(twElm, fbElm, lineElm, goElm) {

    var title = encodeURIComponent(document.title);
    var hash = encodeURIComponent('HEROs');
    var url = encodeURIComponent(document.querySelector('meta[property="og:url"]').getAttribute('content'));

    var tw = document.querySelectorAll(twElm);
    var fb = document.querySelectorAll(fbElm);
    var line = document.querySelectorAll(lineElm);
    var google = document.querySelectorAll(goElm);

    if (tw.length) {
      for (var i = 0, len = tw.length; i < len; i++) {
        tw[i].setAttribute('href', 'https://twitter.com/share?url=' + url + '&text=' + title + '&hashtags=' + hash);
      }
    }

    if (fb.length) {
      for (var _i = 0, _len = fb.length; _i < _len; _i++) {
        fb[_i].setAttribute('href', 'https://www.facebook.com/sharer/sharer.php?u=' + url);
      }
    }

    if (line.length) {
      for (var _i2 = 0, _len2 = line.length; _i2 < _len2; _i2++) {
        line[_i2].setAttribute('href', 'http://line.me/R/msg/text/?' + title + '%20' + url);
      }
    }

    if (google.length) {
      for (var _i3 = 0, _len3 = google.length; _i3 < _len3; _i3++) {
        google[_i3].setAttribute('href', 'http://line.me/R/msg/text/?' + title + '%20' + url);
      }
    }
  };
  global.setSns = setSns;
})(window, jQuery);
'use strict';

(function (global, $) {

  var setWindowScroll = function setWindowScroll(clickElm, toElm, speed, margin) {
    var $elm = $(clickElm);
    var $all = $('html, body');

    var getOffset = function getOffset() {
      var to = document.getElementById(toElm);
      var rect = to.getBoundingClientRect();
      var scrollTop = window.pageOffset || document.documentElement.scrollTop;
      return rect.top + scrollTop + (margin ? margin : 0);
    };

    $elm.on('click', function (e) {
      e.preventDefault();
      $all.animate({ scrollTop: toElm ? getOffset() : 0 }, speed);
    });
  };
  global.setWindowScroll = setWindowScroll;
})(window, jQuery);