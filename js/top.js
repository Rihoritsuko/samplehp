'use strict';

(function (global, $) {

  var init = function init() {
    global.setWindowScroll('.l-footer__backTop', 0, 700);
    global.setWindowScroll('#p-top-mv__scroll', 'p-top-about', 500, 50);
    global.setSns('.js-share_tw', '.js-share_fb', '.js-share_line');
    global.setNav();
    global.setMovie();
    global.checkImgsLoad(global.setSlider);
    setMvHeight();
    hoverPlay();
    scrollAnime();
  };

  var setMvHeight = function setMvHeight() {
    if (device.mobile()) {
      var func = function func() {
        var $mv = $('.p-top-mv');
        if (device.portrait()) {
          $mv.css({ 'height': window.innerHeight });
        } else {
          $mv.css({ 'height': '200vh' });
        }
      };
      func();
      $(window).on('orientationchange', function () {
        setTimeout(func, 500);
      });
    }
  };
  var scrollAnime = function scrollAnime() {

    var duration = 1.5;

    $('.p-top-about__title2').waypoint({
      handler: function handler() {
        TweenMax.to($(this.element), duration, { autoAlpha: 1, x: 0, ease: Expo.easeOut });
        this.destroy();
      },
      offset: '70%'
    });

    $('.p-top-about__text').waypoint({
      handler: function handler() {
        TweenMax.to($(this.element), duration, { autoAlpha: 1, y: 0, ease: Expo.easeOut });
        this.destroy();
      },
      offset: '70%'
    });

    $('.p-top-members__txt').waypoint({
      handler: function handler() {
        TweenMax.to($(this.element), duration, { autoAlpha: 1, y: 0, ease: Expo.easeOut });
        this.destroy();
      },
      offset: '70%'
    });

    $('.p-top-members__title2').waypoint({
      handler: function handler() {
        TweenMax.to($(this.element), duration, { autoAlpha: 1, x: 0, ease: Expo.easeOut });
        this.destroy();
      },
      offset: '70%'
    });

    $('.p-top-donation__txt').waypoint({
      handler: function handler() {
        TweenMax.to($(this.element), duration, { autoAlpha: 1, x: 0, ease: Expo.easeOut });
        this.destroy();
      },
      offset: '70%'
    });

    $('.p-top-donation__txt2').waypoint({
      handler: function handler() {
        TweenMax.to($(this.element), duration, { autoAlpha: 1, y: 0, ease: Expo.easeOut });
        this.destroy();
      },
      offset: '70%'
    });

    $('.p-top-about__drawing').waypoint({
      handler: function handler() {
        TweenMax.to($(this.element), duration, { autoAlpha: 1, y: 0, ease: Expo.easeOut });
        this.destroy();
      },
      offset: '70%'
    });

    $('.c-section__title').waypoint({
      handler: function handler() {
        $(this.element).addClass('is-show');
        this.destroy();
      },
      offset: '70%'
    });

    $('.p-top-animePhoto').waypoint({
      handler: function handler() {
        var $this = $(this.element);
        $this.addClass('is-show');
        setTimeout(function () {
          $this.addClass('is-end');
        }, 1300);
        this.destroy();
      },
      offset: '70%'
    });

    $('.p-top-heros__logo').waypoint({
      handler: function handler() {
        TweenMax.to($(this.element), duration, { autoAlpha: 1, y: 0, ease: Expo.easeOut });
        this.destroy();
      },
      offset: '70%'
    });

    $('.p-top-heros__peoples').waypoint({
      handler: function handler() {
        TweenMax.to($(this.element), duration, { autoAlpha: 1, y: 0, ease: Expo.easeOut });
        this.destroy();
      },
      offset: '90%'
    });
  };
  var hoverPlay = function hoverPlay() {
    var $elm = $('.p-top-mv__play');
    var $elmChild = $('.p-top-mv__playSlide');
    var anim;
    $elm.on('mouseenter', function () {
      if (anim) {
        anim.restart();
      } else {
        anim = TweenMax.to($elmChild, 0.2, { x: '100%', onComplete: function onComplete() {
            TweenMax.set($elmChild, { x: '-100%' });
            TweenMax.to($elmChild, 0.2, { x: '0%' });
          } });
      }
    });
  };

  // IEのチェック
  global.checkMicrosoft();

  $(function () {
    init();
  });
})(window, jQuery);