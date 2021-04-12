$(document).ready(function () {
  $('.story-footer-slider').owlCarousel({
    items: 3,
    autoplay: true,
    autoplayTimeout: 5000,
    nav: true,
    dots: true,
    loop: true,
    responsiveClass: true,
    autoplayHoverPause: true,
    responsive: {
      0: { margin: 20, items: 1, stagePadding: 50, nav: false },
      500: { margin: 30, items: 1, stagePadding: 100, nav: false },
      700: { margin: 60, items: 1, stagePadding: 150 },
      1200: { margin: 60, items: 1, stagePadding: 300 },
      1366: { margin: 60, items: 1, stagePadding: 300 },
      1511: { stagePadding: 0 },
      1600: { stagePadding: 50 },
      1700: { stagePadding: 100 },
      1870: { stagePadding: 185 },
    },
  });
});
$(window).resize(function () {
  setTimeout(function () {
    if ($(window).width() >= 1510) {
      $('.footer .story-footer .story-footer-slider .owl-nav').width(
        $('.footer .story-footer .story-footer-slider .owl-stage-outer .owl-stage .owl-item.active-mid .items').width() + 90
      );
    } else {
      $('.footer .story-footer .story-footer-slider .owl-nav').width(
        $('.footer .story-footer .story-footer-slider .owl-stage-outer .owl-stage .owl-item.active .items').width() + 105
      );
    }
    if ($(window).width() <= 1200) {
      $('.sub-page-projects .web-page-screen .web-page-screen-slider .owl-carousel .owl-nav').width(
        $(
          '.sub-page-projects .web-page-screen .web-page-screen-slider .owl-carousel .owl-stage-outer .owl-stage .owl-item.active .whcr-item img'
        ).width() + 130
      );
    } else {
      $('.sub-page-projects .web-page-screen .web-page-screen-slider .owl-carousel .owl-nav').width(
        $(
          '.sub-page-projects .web-page-screen .web-page-screen-slider .owl-carousel .owl-stage-outer .owl-stage .owl-item.active .whcr-item img'
        ).width() + 280
      );
    }
  }, 500);
});
$(document).ready(function () {
  setTimeout(function () {
    if ($(window).width() >= 1510) {
      $('.footer .story-footer .story-footer-slider .owl-nav').width(
        $('.footer .story-footer .story-footer-slider .owl-stage-outer .owl-stage .owl-item.active-mid .items').width() + 90
      );
    } else {
      $('.footer .story-footer .story-footer-slider .owl-nav').width(
        $('.footer .story-footer .story-footer-slider .owl-stage-outer .owl-stage .owl-item.active .items').width() + 105
      );
    }
    if ($(window).width() <= 1200) {
      $('.sub-page-projects .web-page-screen .web-page-screen-slider .owl-carousel .owl-nav').width(
        $(
          '.sub-page-projects .web-page-screen .web-page-screen-slider .owl-carousel .owl-stage-outer .owl-stage .owl-item.active .whcr-item img'
        ).width() + 130
      );
    } else {
      $('.sub-page-projects .web-page-screen .web-page-screen-slider .owl-carousel .owl-nav').width(
        $(
          '.sub-page-projects .web-page-screen .web-page-screen-slider .owl-carousel .owl-stage-outer .owl-stage .owl-item.active .whcr-item img'
        ).width() + 280
      );
    }
  }, 1000);
});
$(document).ready(function () {
  setInterval(function () {
    if ($(window).width() >= 1510) {
      $('.footer .story-footer .story-footer-slider .owl-stage-outer .owl-stage .owl-item').removeClass('active-left');
      $('.footer .story-footer .story-footer-slider .owl-stage-outer .owl-stage .owl-item').removeClass('active-mid');
      $('.footer .story-footer .story-footer-slider .owl-stage-outer .owl-stage .owl-item').removeClass('active-right');
      $('.footer .story-footer .story-footer-slider .owl-stage-outer .owl-stage .owl-item.active').eq(0).addClass('active-left');
      $('.footer .story-footer .story-footer-slider .owl-stage-outer .owl-stage .owl-item.active').eq(1).addClass('active-mid');
      $('.footer .story-footer .story-footer-slider .owl-stage-outer .owl-stage .owl-item.active').eq(2).addClass('active-right');
    } else {
      $('.footer .story-footer .story-footer-slider .owl-stage-outer .owl-stage .owl-item').removeClass('active-left');
      $('.footer .story-footer .story-footer-slider .owl-stage-outer .owl-stage .owl-item').removeClass('active-mid');
      $('.footer .story-footer .story-footer-slider .owl-stage-outer .owl-stage .owl-item').removeClass('active-right');
    }
  }, 100);
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
  $('.video-popup-on-story').css('transition', 'all .4s');
  $('.video-popup-on-story').css('-webkit-transition', 'all .4s');
  $('.video-popup-on-story').css('-moz-transition', 'all .4s');
  $('.video-popup-on-story').css('-ms-transition', 'all .4s');
  $('.video-popup-on-story').css('-o-transition', 'all .4s');
  $('.video-work-story').click(function () {
    this.paused ? this.play() : this.pause();
  });
});
function video_popup_story() {
  event.preventDefault();
  var addressValue = $('.story-url').attr('href');
  $('.video-work-story').attr('src', addressValue);
  if ($('.video-popup-on-story').hasClass('active-popup-video')) {
    $('.video-popup-on-story').removeClass('active-popup-video');
    $('.video-work-story').get(0).pause();
    $('.video-work-story').attr('src', '#');
  } else {
    $('.video-popup-on-story').addClass('active-popup-video');
    $('.video-work-story').get(0).play();
  }
}
$(document).ready(function () {
  if ($(window).width() <= 1200) {
    $('.global-accordion').children().removeClass('active');
  } else {
    $('.global-accordion .active .accordion-panel').css('display', 'block');
  }
  $('.global-accordion').on('click', '.accordion-control', function (e) {
    if ($(this).parent().hasClass('active')) {
      $('.global-accordion').children().removeClass('active');
    } else {
      $('.global-accordion').children().removeClass('active');
      $(this).parent().addClass('active');
    }
    $('.accordion-panel').slideUp('fast');
    var selected = $(this).next('.accordion-panel');
    if (selected.is(':hidden')) {
      $(this).next('.accordion-panel').slideDown('fast');
    }
  });
});
$(document).ready(function () {
  if ($(window).width() <= 500) {
    $('.hidden-list').slice(0, 6).show();
  } else if ($(window).width() <= 991) {
    $('.hidden-list').slice(0, 6).show();
  } else if ($(window).width() <= 1200) {
    $('.hidden-list').slice(0, 9).show();
  } else if ($(window).width() <= 1400) {
    $('.hidden-list').slice(0, 9).show();
  } else if ($(window).width() <= 1550) {
    $('.hidden-list').slice(0, 10).show();
  } else {
    $('.hidden-list').slice(0, 12).show();
  }
  if ($('.hidden-list:hidden').length == 0) {
    $('.see-more-btn').hide();
  }
  $('.see-more-btn').click(function (e) {
    e.preventDefault();
    if ($(window).width() <= 500) {
      $('.hidden-list:hidden').slice(0, 4).fadeIn('slow');
    } else if ($(window).width() <= 991) {
      $('.hidden-list:hidden').slice(0, 6).fadeIn('slow');
    } else if ($(window).width() <= 1200) {
      $('.hidden-list:hidden').slice(0, 6).fadeIn('slow');
    } else if ($(window).width() <= 1400) {
      $('.hidden-list:hidden').slice(0, 6).fadeIn('slow');
    } else if ($(window).width() <= 1550) {
      $('.hidden-list:hidden').slice(0, 10).fadeIn('slow');
    } else {
      $('.hidden-list:hidden').slice(0, 12).fadeIn('slow');
    }
    if ($('.hidden-list:hidden').length == 0) {
      if ($('.see-more-btn').hasClass('more-min')) {
        $('.hidden-list').hide();
        if ($(window).width() <= 500) {
          $('.hidden-list').slice(0, 6).show();
        } else if ($(window).width() <= 991) {
          $('.hidden-list').slice(0, 6).show();
        } else if ($(window).width() <= 1200) {
          $('.hidden-list').slice(0, 6).show();
        } else if ($(window).width() <= 1400) {
          $('.hidden-list').slice(0, 6).show();
        } else if ($(window).width() <= 1550) {
          $('.hidden-list').slice(0, 10).show();
        } else {
          $('.hidden-list').slice(0, 12).show();
        }
        $('.see-more-btn').removeClass('more-min');
      } else {
        $('.see-more-btn').addClass('more-min');
      }
    }
  });
});
window.loadingMoreEvents = false;
function loadMoreEvents() {
  if (!window.loadingMoreEvents) {
    window.loadingMoreEvents = true;
    if ($('.load-hidden:hidden').length == 0) {
      $('.load-gif img').removeClass('on-gif');
    } else {
      $('.load-gif img').addClass('on-gif');
    }
    setTimeout(function () {
      $('.load-gif img').removeClass('on-gif');
      if ($(window).width() <= 500) {
        $('.load-hidden:hidden').slice(0, 6).slideDown();
      } else if ($(window).width() <= 991) {
        $('.load-hidden:hidden').slice(0, 6).slideDown();
      } else if ($(window).width() <= 1200) {
        $('.load-hidden:hidden').slice(0, 8).slideDown();
      } else if ($(window).width() <= 1400) {
        $('.load-hidden:hidden').slice(0, 15).slideDown();
      } else {
        $('.load-hidden:hidden').slice(0, 24).slideDown();
      }
      window.loadingMoreEvents = false;
    }, 1000);
  }
}
setTimeout(function () {
  $(window).scroll(function () {
    if ($(window).scrollTop() > $('.sub-page-brands').height() + $('.sub-page-header').height() - 300) {
      loadMoreEvents();
    }
  });
}, 500);
$(document).ready(function () {
  if ($(window).width() <= 500) {
    $('.load-hidden:hidden').slice(0, 10).show();
  } else if ($(window).width() <= 991) {
    $('.load-hidden:hidden').slice(0, 24).show();
  } else if ($(window).width() <= 1400) {
    $('.load-hidden:hidden').slice(0, 20).show();
  } else {
    $('.load-hidden:hidden').slice(0, 24).show();
  }
});
$(document).ready(function () {
  $('.contact-list').click(function () {
    var tab_id = $(this).attr('data-tab');
    var tab_ids = $(this).attr('data-tabs');
    $('.contact-list').removeClass('current');
    $('.tab-contact').removeClass('current');
    $(this).addClass('current');
    $('#' + tab_id).addClass('current');
    $('#' + tab_ids).addClass('current');
  });
});
$(document).ready(function () {
  $('.sub-page-project .item').css('transition', 'all 0.5s ease-in-out');
  $('.sub-page-project .item img').css('transition', 'all 0.5s ease-in-out');
  $('.sub-page-project .item .title').css('transition', 'all 0.5s ease-in-out');
  $('.sub-page-project .projects article a .item .right .project-label').css('transition', 'all 0.5s ease-in-out');
  $('.sub-page-project .projects article a .item .left .desc').css('transition', 'all 0.4s ease-in-out');
});
(function ($) {
  'use strict';
  $(document).ready(function () {
    $('[slipglide]').SlipGlide();
  });
  $.fn.SlipGlide = function () {
    return this.each(function () {
      $(this).SlipGlideSetup();
    });
  };
  $.fn.SlipGlideSetup = function () {
    var self = this;
    var element = self[0];
    var image = self.find('> img').first();
    var isMauseOnMe = false;
    var ws_in_screen = false;
    var ws_height = 0;
    var img_height = 0;
    var img_top = 0;
    var img_speed = parseInt(self.attr('slipglide-speed')) / 1000;
    var img_slide_to = 'up';
    var mouse_y;
    var mouse_y_percent = 0;
    var mouse_y_zone = 'up';
    var mouse_y_zone_percent = 0;
    var mouse_y_zone_middle_none_size_percent = 30;
    var scroll_height = 0;
    var int_scan = 100;
    var int_tick = 10;
    self.mouseenter(function () {
      isMauseOnMe = true;
    });
    self.mouseleave(function () {
      isMauseOnMe = false;
    });
    self.mousemove(function (e) {
      isMauseOnMe = true;
      mouse_y = e.offsetY;
      mouse_y += img_top;
      mouse_y_percent = Math.max(Math.min(100, (mouse_y * 100) / ws_height), 0);
      var o_top = 50 - mouse_y_zone_middle_none_size_percent / 2;
      var o_bottom = 50 + mouse_y_zone_middle_none_size_percent / 2;
      if (mouse_y_percent < o_top) {
        mouse_y_zone_percent = ((o_top - mouse_y_percent) * 100) / mouse_y_zone_middle_none_size_percent;
        mouse_y_zone = 'down';
      } else if (mouse_y_percent > o_bottom) {
        mouse_y_zone_percent = ((mouse_y_percent - o_bottom) * 100) / mouse_y_zone_middle_none_size_percent;
        mouse_y_zone = 'up';
      } else {
        mouse_y_zone_percent = 0;
      }
      mouse_y_zone_percent = Math.max(Math.min(100, mouse_y_zone_percent), 0);
    });
    function imageMove() {
      image.stop().animate({ top: img_top + 'px' }, int_tick);
    }
    function imageMoveForOver() {
      var x = 1;
      if (mouse_y_zone == 'up') {
        x = -1;
      }
      img_top += (img_speed / 70) * mouse_y_zone_percent * x;
      if (img_top > 0) {
        img_top = 0;
      }
      if (img_top < scroll_height * -1) {
        img_top = scroll_height * -1;
      }
      imageMove();
    }
    function imageMoveForFree() {
      mouse_y_zone_percent = 50;
      var x = 1;
      if (mouse_y_zone == 'up') {
        x = -1;
      }
      img_top += (img_speed / 100) * mouse_y_zone_percent * x;
      if (img_top > 0) {
        img_top = 0;
        mouse_y_zone = 'up';
      }
      if (img_top < scroll_height * -1) {
        img_top = scroll_height * -1;
        mouse_y_zone = 'down';
      }
      imageMove();
    }
    var int_scan_hwnd = self.data('int_scan_hwnd');
    var int_tick_hwnd = self.data('int_tick_hwnd');
    if (typeof int_scan_hwnd == 'undefined') {
      clearInterval(int_scan_hwnd);
    }
    if (typeof int_tick_hwnd == 'undefined') {
      clearInterval(int_tick_hwnd);
    }
    int_scan_hwnd = setInterval(function () {
      if (image.length) {
        ws_height = self.height();
        img_height = image.height();
        scroll_height = img_height - ws_height;
        ws_in_screen =
          self.offset().top < $(window).scrollTop() + $(window).height() && self.offset().top + ws_height > $(window).scrollTop();
      }
    }, int_scan);
    int_tick_hwnd = setInterval(function () {
      if (ws_in_screen) {
        if (isMauseOnMe) {
          imageMoveForOver();
        } else {
          imageMoveForFree();
        }
      }
    }, int_tick);
    self.data('int_scan_hwnd', int_scan_hwnd);
    self.data('int_tick_hwnd', int_tick_hwnd);
  };
})(jQuery);
$(document).ready(function () {
  $('.hide-if-null-content').each(function () {
    var c = $(this);
    if (c.html().trim().length < 10) {
      c.closest('.hide-if-null').hide();
    }
  });
});
window.projetsloadingMoreEvents = false;
function projetsloadMoreEvents() {
  if (!window.projetsloadingMoreEvents) {
    window.projetsloadingMoreEvents = true;
    if ($('.load-hidden-projets:hidden').length == 0) {
      $('.sub-page-project .load-gif img').removeClass('on-gif');
    } else {
      $('.sub-page-project .load-gif img').addClass('on-gif');
    }
    setTimeout(function () {
      $('.sub-page-project .load-gif img').removeClass('on-gif');
      if ($(window).width() <= 768) {
        $('.load-hidden-projets:hidden').slice(0, 4).slideDown();
      } else if ($(window).width() <= 1200) {
        $('.load-hidden-projets:hidden').slice(0, 18).slideDown();
      } else {
        $('.load-hidden-projets:hidden').slice(0, 16).slideDown();
      }
      window.projetsloadingMoreEvents = false;
    }, 1000);
  }
}
setTimeout(function () {
  $(window).scroll(function () {
    if ($(window).scrollTop() > $('.sub-page-project').height() + $('.sub-page-header').height() - 500) {
      projetsloadMoreEvents();
    }
  });
}, 500);
$(document).ready(function () {
  if ($(window).width() <= 768) {
    $('.load-hidden-projets:hidden').slice(0, 16).slideDown();
  } else if ($(window).width() <= 1200) {
    $('.load-hidden-projets:hidden').slice(0, 18).slideDown();
  } else {
    $('.load-hidden-projets:hidden').slice(0, 16).show();
  }
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
          $('.modal-glob .modal-dialog .modal-content .bottom .title-error').html('Uyarı!').show();
          $('.modal-glob .modal-dialog .modal-content .bottom .error-desc').html(response.uyari).show();
          $('.modal-teklif-al').addClass('pop-modal-warning');
          $('#form-get-offer')[0].reset();
          get_offer();
        } else {
          $('.modal-glob .modal-dialog .modal-content .bottom .title-error').html('Başarılı!').show();
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
  $('#kariyer-btn').on('click', function (e) {
    var formData = $('#form-kariyer').serialize();
    $.post(
      '//' + document.domain + '/app/themes/MediaFVP/js/ajax/ajax.php',
      formData + '&tip=kariyer',
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
          $('.modal-glob .modal-dialog .modal-content .bottom .title-error').html('Uyarı!').show();
          $('.modal-glob .modal-dialog .modal-content .bottom .error-desc').html(response.uyari).show();
          $('.modal-teklif-al').addClass('pop-modal-warning');
          $('#form-kariyer')[0].reset();
        } else {
          $('.modal-glob .modal-dialog .modal-content .bottom .title-error').html('Başarılı!').show();
          $('.modal-glob .modal-dialog .modal-content .bottom .error-desc').html(response.basarili).show();
          $('.modal-teklif-al').addClass('pop-modal-succes');
          $('#form-kariyer')[0].reset();
          window.postSuccess = true;
        }
      },
      'json'
    );
    e.preventDefault();
  });
  $('#iletisim-btn').on('click', function (e) {
    var formData = $('#form-iletisim').serialize();
    $.post(
      '//' + document.domain + '/app/themes/MediaFVP/js/ajax/ajax.php',
      formData + '&tip=iletisim',
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
          $('.modal-glob .modal-dialog .modal-content .bottom .title-error').html('Uyarı!').show();
          $('.modal-glob .modal-dialog .modal-content .bottom .error-desc').html(response.uyari).show();
          $('.modal-teklif-al').addClass('pop-modal-warning');
          $('#form-iletisim')[0].reset();
        } else {
          $('.modal-glob .modal-dialog .modal-content .bottom .title-error').html('Başarılı!').show();
          $('.modal-glob .modal-dialog .modal-content .bottom .error-desc').html(response.basarili).show();
          $('.modal-teklif-al').addClass('pop-modal-succes');
          $('#form-iletisim')[0].reset();
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
$(function () {
  $('.hidden-list-form').slice(0, 12).show();
  if ($('.hidden-list-form:hidden').length == 0) {
    $('.load-more').css('visibility', 'hidden');
  }
  $('body').on('click touchstart', '.load-more', function (e) {
    e.preventDefault();
    $('.hidden-list-form:hidden').slice(0, 8).slideDown();
    if ($('.hidden-list-form:hidden').length == 0) {
      $('.load-more').css('visibility', 'hidden');
    }
    $('html,body').animate({ scrollTop: $(this).offset().top - 500 }, 1000);
  });
});
$(function () {
  $('.hidden-list-kariyer').slice(0, 12).show();
  if ($('.hidden-list-kariyer:hidden').length <= 12) {
    $('.load-more-kariyer').css('visibility', 'hidden');
  }
  $('body').on('click touchstart', '.load-more-kariyer', function (e) {
    e.preventDefault();
    $('.hidden-list-kariyer:hidden').slice(0, 8).slideDown();
    if ($('.hidden-list-kariyer:hidden').length == 0) {
      $('.load-more-kariyer').css('visibility', 'hidden');
    }
    $('html,body').animate({ scrollTop: $(this).offset().top - 500 }, 1000);
  });
});
$(function () {
  $('.hidden-list-iletisim').slice(0, 12).show();
  if ($('.hidden-list-iletisim:hidden').length <= 12) {
    $('.load-more-iletisim').css('visibility', 'hidden');
  }
  $('body').on('click touchstart', '.load-more-iletisim', function (e) {
    e.preventDefault();
    $('.hidden-list-iletisim:hidden').slice(0, 8).slideDown();
    if ($('.hidden-list-iletisim:hidden').length == 0) {
      $('.load-more-iletisim').css('visibility', 'hidden');
    }
    $('html,body').animate({ scrollTop: $(this).offset().top - 500 }, 1000);
  });
});
$(document).ready(function () {
  if (CCM_CID == 192 || CCM_CID == 318 || CCM_CID == 167) {
    $(':input').inputmask();
    $('.text-v').keyup(function () {
      if (this.value.match(/[^a-zA-ZüöçğşıİÜĞÇŞÖ\s]/g)) {
        this.value = this.value.replace(/[^a-zA-ZüöçğşıİÜĞÇŞÖ\s]/g, '');
      }
    });
  }
});
window.storyloadingMoreEvents = false;
function storyloadMoreEvents() {
  if (!window.storyloadingMoreEvents) {
    window.storyloadingMoreEvents = true;
    if ($('.load-hidden-story:hidden').length == 0) {
      $('.sub-page-story .load-gif img').removeClass('on-gif');
    } else {
      $('.sub-page-story .load-gif img').addClass('on-gif');
    }
    setTimeout(function () {
      $('.sub-page-story .load-gif img').removeClass('on-gif');
      if ($(window).width() <= 768) {
        $('.load-hidden-story:hidden').slice(0, 4).slideDown();
      } else if ($(window).width() <= 1200) {
        $('.load-hidden-story:hidden').slice(0, 6).slideDown();
      } else {
        $('.load-hidden-story:hidden').slice(0, 6).slideDown();
      }
      window.storyloadingMoreEvents = false;
    }, 1000);
  }
}
setTimeout(function () {
  $(window).scroll(function () {
    if ($(window).scrollTop() > $('.sub-page-story').height() + $('.sub-page-header').height() - 500) {
      storyloadMoreEvents();
    }
  });
}, 500);
$(document).ready(function () {
  if ($(window).width() <= 768) {
    $('.load-hidden-story:hidden').slice(0, 12).slideDown();
  } else if ($(window).width() <= 1200) {
    $('.load-hidden-story:hidden').slice(0, 10).slideDown();
  } else {
    $('.load-hidden-story:hidden').slice(0, 15).show();
  }
});
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
