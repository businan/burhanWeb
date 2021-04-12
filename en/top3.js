$(document).ready(function () {
  $('.projects-slider').owlCarousel({
    items: 1,
    autoplay: true,
    autoplayTimeout: 8000,
    nav: false,
    dots: true,
    mouseDrag: false,
    loop: false,
    responsiveClass: true,
    smartSpeed: 1000,
    animateOut: 'slideOutUp',
    rewind: true,
    responsive: { 0: { mouseDrag: true }, 600: { mouseDrag: false } },
  });
  $('.blog-slider').owlCarousel({
    items: 3,
    autoplay: true,
    autoplayTimeout: 5000,
    nav: false,
    dots: false,
    loop: false,
    margin: 50,
    responsiveClass: true,
    autoplayHoverPause: true,
    rewind: true,
    responsive: {
      0: { items: 1 },
      700: { items: 2, margin: 15 },
      1200: { items: 3, margin: 30 },
      1550: { margin: 50 },
    },
  });
});
function _resize() {
  $('.slider-menu').height($(window).height());
  $('.projects-slider').height($(window).height());
}
$(document).ready(function () {
  _resize();
});
$(document).ready(function () {
  _resize();
});
$(document).ready(function () {
  $('#header').css('transition', 'all .2s');
  $('#header').css('-webkit-transition', 'all .2s');
  $('#header').css('-moz-transition', 'all .2s');
  $('#header').css('-ms-transition', 'all .2s');
  $('#header').css('-o-transition', 'all .2s');
  $('#header .flex-in .right ul li a').click(function () {
    if ($(this).parent().hasClass('active')) {
      $('#header .flex-in .right ul li').removeClass('active');
    } else {
      $('#header .flex-in .right ul li').removeClass('active');
      $(this).parent().addClass('active');
    }
    $('.tab-hover-list a:nth-of-type(1)').addClass('current');
    $('.tab-hover-img img:nth-of-type(1)').addClass('current');
  });
  $('.right-fixed').height($('.tab-hover-hizmet').height() + 5);
});
$(document).ready(function () {
  $('.tab-hover-list a').hover(function () {
    var tab_id = $(this).attr('data-tab');
    $('.tab-hover-list a').removeClass('current');
    $('.tab-content-proje').removeClass('current');
    $(this).addClass('current');
    $('#' + tab_id).addClass('current');
  });
  $('.tab-hover-hizmet a:nth-of-type(1)').addClass('current');
  $('.sub-menu-right-text:nth-of-type(1)').addClass('current');
  $('.tab-hover-hizmet a').hover(function () {
    var tab_id = $(this).attr('data-tab');
    $('.tab-hover-hizmet a').removeClass('current');
    $('.tab-content-hizmet').removeClass('current');
    $(this).addClass('current');
    $('#' + tab_id).addClass('current');
  });
  $(window).click(function () {
    $('#header .flex-in .right ul li').removeClass('active');
    $('.slider-menu .menu-slider-in .draggable-pos ul li').removeClass('mobile-active-hover');
  });
  $('#header .flex-in .right ul').click(function (e) {
    e.stopPropagation();
  });
});
window.m_click = 0;
window.m_click_sub = 0;
$(document).ready(function () {
  $('#mobile-menu').css('transition', 'all .4s');
  $('#mobile-menu').css('-webkit-transition', 'all .4s');
  $('#mobile-menu').css('-moz-transition', 'all .4s');
  $('#mobile-menu').css('-ms-transition', 'all .4s');
  $('#mobile-menu').css('-o-transition', 'all .4s');
  $('.mobile-right-menu').css('transition', 'all .2s');
  $('.mobile-right-menu').css('-webkit-transition', 'all .2s');
  $('.mobile-right-menu').css('-moz-transition', 'all .2s');
  $('.mobile-right-menu').css('-ms-transition', 'all .2s');
  $('.mobile-right-menu').css('-o-transition', 'all .2s');
  $('#header .flex-in .right .mobile-menu-icon').click(function () {
    $('#mobile-menu').addClass('active-mobile-menu');
    $('body').css('overflow-y', 'hidden');
  });
  $('#mobile-menu .mobile-right-menu .top .mobile-menu-close').click(function () {
    $('#mobile-menu').removeClass('active-mobile-menu');
    $('body').css('overflow-y', 'scroll');
  });
});
window.scroll_down = 0;
$(document).on('scroll', function () {
  if (
    $(document).scrollTop() > $(CCM_CID == 1 || CCM_CID == 160 ? '.slider-menu' : '.sub-page-header').height() ||
    document.documentElement.scrollTop > $(CCM_CID == 1 || CCM_CID == 160 ? '.slider-menu' : '.sub-page-header').height()
  ) {
    $('#header').addClass('header-scroll');
    window.scroll_down = 1;
    setTimeout(function () {
      if ($('#header').hasClass('header-scroll')) {
        $('#header').css('position', 'fixed');
      }
    }, 500);
  } else {
    $('#header').removeClass('header-scroll');
    window.scroll_down = 0;
    $('#header').css('position', 'absolute');
    $('#header .flex-in .right ul li').removeClass('active');
  }
});
var iScrollPos = 0;
$(window).scroll(function () {
  if (window.scroll_down == 1) {
    var iCurScrollPos = $(this).scrollTop();
    if (iCurScrollPos > iScrollPos && iCurScrollPos > 50) {
      $('#header').removeClass('header-scroll-up');
      $('#header .flex-in .right ul li').removeClass('active');
    } else {
      $('#header').addClass('header-scroll-up');
    }
    iScrollPos = iCurScrollPos;
  } else {
    $('#header').removeClass('header-scroll-up');
  }
});
$(document).ready(function () {
  $('.video-popup-on').css('transition', 'all .4s');
  $('.video-popup-on').css('-webkit-transition', 'all .4s');
  $('.video-popup-on').css('-moz-transition', 'all .4s');
  $('.video-popup-on').css('-ms-transition', 'all .4s');
  $('.video-popup-on').css('-o-transition', 'all .4s');
  $('.video-work').click(function () {
    this.paused ? this.play() : this.pause();
  });
});
function video_popup() {
  if ($('.video-popup-on').hasClass('active-popup-video')) {
    $('.video-popup-on').removeClass('active-popup-video');
    $('.video-work').get(0).pause();
  } else {
    $('.video-popup-on').addClass('active-popup-video');
    $('.video-work').get(0).play();
  }
}
$(document).ready(function () {
  $('.get-offer-popup').css('transition', 'all .4s');
  $('.get-offer-popup').css('-webkit-transition', 'all .4s');
  $('.get-offer-popup').css('-moz-transition', 'all .4s');
  $('.get-offer-popup').css('-ms-transition', 'all .4s');
  $('.get-offer-popup').css('-o-transition', 'all .4s');
});
function get_offer() {
  if ($('.get-offer-popup').hasClass('active-popup-offer')) {
    $('.get-offer-popup').removeClass('active-popup-offer');
    $('#form-get-offer')[0].reset();
  } else {
    $('.get-offer-popup').addClass('active-popup-offer');
  }
}
$(document).ready(function () {
  $('.scroll-down-btn').click(function () {
    $('html, body').animate({ scrollTop: $('.projects-slider').offset().top }, 1500);
  });
});
window.tick_count = 0;
window.tick_stop = 0;
window.setInterval_sc = 8;
window.dragPos = 0;
window.dragOn = 1;
$(window).resize(function () {
  if ($(window).width() <= 500) {
    window.setInterval_sc = 14;
  }
});
$(document).ready(function () {
  if ($(window).width() <= 500) {
    window.setInterval_sc = 14;
  }
  $('.slider-menu .menu-slider-in ul li .item .text-out .title-menu a span').css({
    transition: 'all .4s',
    '-webkit-transition': 'all .4s',
    '-moz-transition': 'all .4s',
    '-ms-transition': 'all .4s',
    '-o-transition': 'all .4s',
  });
  $('.slider-menu .menu-slider-in ul li .item .text-out .bottom').css({
    transition: 'all .4s',
    '-webkit-transition': 'all .4s',
    '-moz-transition': 'all .4s',
    '-ms-transition': 'all .4s',
    '-o-transition': 'all .4s',
  });
  setTimeout(function () {
    $('.slider-menu .menu-slider-in').css({
      left: -$('.slider-menu .menu-slider-in .draggable-pos ul').width(),
    });
  }, 500);
  var start, stop;
  var div = $('.slider-menu .menu-slider-in .draggable-pos').draggable({
    drag: function (event, ui) {
      if (-$('.slider-menu .menu-slider-in .draggable-pos ul').width() + 10 >= ui.position.left) {
        ui.position.left = 0;
      }
      if (ui.position.left >= $('.slider-menu .menu-slider-in .draggable-pos ul').width() - 10) {
        ui.position.left = 0;
      }
    },
    axis: 'x',
    start: function (event, ui) {
      start = ui.position.left;
      $('.slider-menu .menu-slider-in ul li .item').css('cursor', 'grabbing');
      window.dragOn = 0;
    },
    stop: function (event, ui) {
      stop = ui.position.left;
      $('.slider-menu .menu-slider-in ul li .item').css('cursor', 'grab');
      window.tick_count = ui.position.left;
      window.dragOn = 1;
      if (start < stop) {
        window.dragPos = 1;
      } else {
        window.dragPos = 0;
      }
    },
  });
  setInterval(function () {
    if (window.dragOn == 1) {
      $('.slider-menu .menu-slider-in .draggable-pos').css('left', '' + window.tick_count + 'px');
      if (window.dragPos == 0) {
        if (window.tick_count < -$('.slider-menu .menu-slider-in .draggable-pos ul').width()) {
          window.tick_count = 0;
        }
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          if (!$('.slider-menu .menu-slider-in .draggable-pos ul li').hasClass('mobile-active-hover')) {
            window.tick_count--;
          }
        } else {
          if (window.tick_stop == 0) {
            window.tick_count--;
          }
        }
      } else {
        if (window.tick_count >= $('.slider-menu .menu-slider-in .draggable-pos ul').width()) {
          window.tick_count = 0;
        }
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          if (!$('.slider-menu .menu-slider-in .draggable-pos ul li').hasClass('mobile-active-hover')) {
            window.tick_count++;
          }
        } else {
          if (window.tick_stop == 0) {
            window.tick_count++;
          }
        }
      }
    }
  }, window.setInterval_sc);
  $('.slider-menu .menu-slider-in ul').clone().appendTo('.slider-menu .menu-slider-in .draggable-pos');
  $('.slider-menu .menu-slider-in ul:nth-of-type(1)').clone().prependTo('.slider-menu .menu-slider-in .draggable-pos');
  $('.slider-menu .menu-slider-in .draggable-pos').hover(
    function () {
      window.tick_stop = 1;
    },
    function () {
      window.tick_stop = 0;
    }
  );
  $('.slider-menu .menu-slider-in .draggable-pos ul li .item').hover(
    function () {
      if ($(window).width() <= 1366) {
        $('.slider-menu .menu-slider-in .draggable-pos ul li').removeClass('mobile-active-hover');
        $(this).parent().addClass('mobile-active-hover');
      }
    },
    function () {}
  );
});
$(document).ready(function () {
  $('.services .items article .link a').click(function () {
    if ($(this).parent().parent().hasClass('link-click')) {
      $(this).parent().parent().removeClass('link-click');
    } else {
      $(this).parent().parent().addClass('link-click');
    }
    setTimeout(function () {
      $(this).parent().parent().removeClass('link-click');
    }, 200);
  });
});
$(document).ready(function () {
  $('.services .items article').on('mouseenter mouseleave', hoverDirection);
  $('.sub-page-contact .items article').on('mouseenter mouseleave', hoverDirection);
});
function hoverDirection(event) {
  var $overlay = $(this).find('.bg-services'),
    side = getMouseDirection(event),
    animateTo,
    positionIn = { top: '0%', left: '0%' },
    positionOut = (function () {
      switch (side) {
        case 0:
          return { top: '-100%', left: '0%' };
          break;
        case 1:
          return { top: '0%', left: '100%' };
          break;
        case 2:
          return { top: '100%', left: '0%' };
          break;
        default:
          return { top: '0%', left: '-100%' };
          break;
      }
    })();
  if (event.type === 'mouseenter') {
    animateTo = positionIn;
    $overlay.css(positionOut);
  } else {
    animateTo = positionOut;
  }
  $overlay.stop(true).animate(animateTo, 200, 'linear');
}
function getMouseDirection(event) {
  var $item = $(event.currentTarget),
    offset = $item.offset(),
    w = $item.outerWidth(),
    h = $item.outerHeight(),
    x = (event.pageX - offset.left - w / 2) * (w > h ? h / w : 1),
    y = (event.pageY - offset.top - h / 2) * (h > w ? w / h : 1),
    direction = Math.round((Math.atan2(y, x) * (180 / Math.PI) + 180) / 90 + 3) % 4;
  return direction;
}
window.postSuccess = false;
$(function () {
  $('#teklif-btn').on('click', function (e) {
    var formData = $('#form-get-offer').serialize();
    $.post(
      '//' + document.domain + '/app/themes/MediaFVP/js/ajax/ajax.php',
      formData + '&tip=teklifal',
      function (response) {
        $('.modal-teklif-al').removeClass('pop-modal-error');
        $('.modal-teklif-al').removeClass('pop-modal-warning');
        $('.modal-teklif-al').removeClass('pop-modal-succes');
        $('.modal-teklif-al').modal('show');
        if (response.hata) {
          $('.modal-glob .modal-dialog .modal-content .bottom .title-error').html('Hata!').show();
          $('.modal-glob .modal-dialog .modal-content .bottom .error-desc').html(response.hata).show();
          $('.modal-teklif-al').addClass('pop-modal-error');
        } else if (response.uyari) {
          $('.modal-glob .modal-dialog .modal-content .bottom .title-error').html('UyarÄ±!').show();
          $('.modal-glob .modal-dialog .modal-content .bottom .error-desc').html(response.uyari).show();
          $('.modal-teklif-al').addClass('pop-modal-warning');
          $('#form-get-offer')[0].reset();
          get_offer();
        } else {
          $('.modal-glob .modal-dialog .modal-content .bottom .title-error').html('BaÅŸarÄ±lÄ±!').show();
          $('.modal-glob .modal-dialog .modal-content .bottom .error-desc').html(response.basarili).show();
          $('.modal-teklif-al').addClass('pop-modal-succes');
          $('#form-get-offer')[0].reset();
          get_offer();
          window.postSuccess = true;
        }
      },
      'json'
    );
    e.preventDefault();
  });
});
function pageRefresh() {
  if (window.postSuccess == true) {
    location.reload();
  }
}
(function (root, factory) {
  if (typeof exports === 'object') {
    module.exports = factory(root);
  } else if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else {
    root.LazyLoad = factory(root);
  }
})(typeof global !== 'undefined' ? global : this.window || this.global, function (root) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    root = window;
  }
  const defaults = {
    src: 'data-src',
    srcset: 'data-srcset',
    selector: '.lazyload',
    root: null,
    rootMargin: '0px',
    threshold: 0,
  };
  const extend = function () {
    let extended = {};
    let deep = false;
    let i = 0;
    let length = arguments.length;
    if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
      deep = arguments[0];
      i++;
    }
    let merge = function (obj) {
      for (let prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
          if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
            extended[prop] = extend(true, extended[prop], obj[prop]);
          } else {
            extended[prop] = obj[prop];
          }
        }
      }
    };
    for (; i < length; i++) {
      let obj = arguments[i];
      merge(obj);
    }
    return extended;
  };
  function LazyLoad(images, options) {
    this.settings = extend(defaults, options || {});
    this.images = images || document.querySelectorAll(this.settings.selector);
    this.observer = null;
    this.init();
  }
  LazyLoad.prototype = {
    init: function () {
      if (!root.IntersectionObserver) {
        this.loadImages();
        return;
      }
      let self = this;
      let observerConfig = {
        root: this.settings.root,
        rootMargin: this.settings.rootMargin,
        threshold: [this.settings.threshold],
      };
      this.observer = new IntersectionObserver(function (entries) {
        Array.prototype.forEach.call(entries, function (entry) {
          if (entry.isIntersecting) {
            self.observer.unobserve(entry.target);
            let src = entry.target.getAttribute(self.settings.src);
            let srcset = entry.target.getAttribute(self.settings.srcset);
            if ('img' === entry.target.tagName.toLowerCase()) {
              if (src) {
                entry.target.src = src;
              }
              if (srcset) {
                entry.target.srcset = srcset;
              }
            } else {
              entry.target.style.backgroundImage = 'url(' + src + ')';
            }
          }
        });
      }, observerConfig);
      Array.prototype.forEach.call(this.images, function (image) {
        self.observer.observe(image);
      });
    },
    loadAndDestroy: function () {
      if (!this.settings) {
        return;
      }
      this.loadImages();
      this.destroy();
    },
    loadImages: function () {
      if (!this.settings) {
        return;
      }
      let self = this;
      Array.prototype.forEach.call(this.images, function (image) {
        let src = image.getAttribute(self.settings.src);
        let srcset = image.getAttribute(self.settings.srcset);
        if ('img' === image.tagName.toLowerCase()) {
          if (src) {
            image.src = src;
          }
          if (srcset) {
            image.srcset = srcset;
          }
        } else {
          image.style.backgroundImage = "url('" + src + "')";
        }
      });
    },
    destroy: function () {
      if (!this.settings) {
        return;
      }
      this.observer.disconnect();
      this.settings = null;
    },
  };
  root.lazyload = function (images, options) {
    return new LazyLoad(images, options);
  };
  if (root.jQuery) {
    const $ = root.jQuery;
    $.fn.lazyload = function (options) {
      options = options || {};
      options.attribute = options.attribute || 'data-src';
      new LazyLoad($.makeArray(this), options);
      return this;
    };
  }
  return LazyLoad;
});
jQuery(window).load(function () {
  setTimeout(function () {
    lazyload();
  }, 2000);
});
