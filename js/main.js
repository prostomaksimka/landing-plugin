var searshCoord = function() {
  $('.landing .prokr .link-pos').each(function() {
    var tekEl = $(this);
    var identEl = tekEl.data('pos');
    if($('#'+identEl).length > 0) {
      var offset = $('#'+identEl).offset();
      var topPos = offset.top - 142;
      var tekElNumb = tekEl.attr('data-numb', topPos);
    }
  });
};
var botCoord = function() {
  if($('.landing .link-pos-bot').length>0) {
    var heightDoc = $(document).height();
    var heightWind = $(window).height();
    var flagBotPos = heightDoc - heightWind - 242;
    $('.landing .link-pos-bot').attr('data-numb', flagBotPos);
  }
} 
$(window).on('resize', function() {
  botCoord();
});
var prokrLink = function(identEl, polsmes) {
  $(identEl).on('click', function() {
    var tekEl = $(this);
    var parentEl = tekEl.closest('li');
    if(polsmes) {
      var idenProkrEl = parseFloat(parentEl.attr('data-numb')) + polsmes;
    } else {
      var idenProkrEl = parseFloat(parentEl.attr('data-numb'))
    }
    $('html, body').animate({scrollTop: idenProkrEl}, 500);
    return false;
  })
};
var allProkr = function() {
  prokrLink('.landing .link-pos a');
  prokrLink('.landing .link-pos-bot a', 150);
}
var activeElPos = function(smesCoord, tekElPos) {
  $(tekElPos).each(function() {
    var tekEl = $(this);
    var numbProk = parseFloat(tekEl.attr('data-numb'));
    var topProk = numbProk - smesCoord;
    $(window).bind('scroll', function() {
      var scrollWind = $(window).scrollTop();
      if(scrollWind >= topProk) {
        $('.landing .prokr .active').removeClass('active');
        $('.landing .prokr li[data-numb = "'+ numbProk +'"]').addClass('active');
      } else {
        $('.landing .prokr li[data-numb = "'+ numbProk +'"]').removeClass('active');
      }
    });
  });
}
var scrollPos = function() {
  var smesCoord = 20;
  activeElPos(smesCoord, '.link-pos');
  activeElPos(smesCoord, '.link-pos-bot');
};
var accord = function() {
  if($('.accord').length>0) {
    $('.accord li').on('click', function() {
      var tekEl = $(this);
      var accordPopBlock = tekEl.find('.accord-for-popup');
      var accordSodHeight = accordPopBlock.find('.accord-desc').innerHeight();
      var accordParent = tekEl.closest('.accord');
      var accordTimeDown = 500;
      if(tekEl.hasClass('accord-down')) {
        accordPopBlock.animate({'height': 0}, accordTimeDown, function() {
          tekEl.removeClass('accord-down');
          searshCoord();
          botCoord();
          allProkr();
          $(window).unbind('scroll');
          scrollPos();
        });
      } else {
        accordParent.find('.accord-down').find('.accord-for-popup').animate({'height': 0}, accordTimeDown, function() {
          $(this).closest('.accord-down').removeClass('accord-down');
        });
        accordPopBlock.animate({'height': accordSodHeight}, accordTimeDown, function() {
          tekEl.addClass('accord-down');
          searshCoord();
          botCoord();
          allProkr();
          $(window).unbind('scroll');
          scrollPos();
        });
      }
    });
  }
};
var galery = function() {
  var countGal = 0;
  $('.galery').each(function() {
    var tekEl = $(this);
    var wrapBlockGal = tekEl.closest('.galery-wrap').closest('.galery-wrap-block');
    var elGal = tekEl.find('li');
    var widthEl = elGal.width();
    var marLeftEl = parseFloat(elGal.css('margin-left'));
    var numbGal = 3;
    var timeProkr = 500;
    var flagAnim = 1;
    var timeTimerGal = 10000;
    var prokr = (widthEl+marLeftEl)*numbGal;
    var timerGal = [];
    if(elGal.length>numbGal) {
      var appendGal = "<a href='#' class='galery-arrow-left'></a><a href='' class='galery-arrow-right'></a>";
      wrapBlockGal.append(appendGal);
    }
    var prependItemGal = "";
    wrapBlockGal.find('.galery-arrow-left').on('click', function() {
      if(flagAnim == 1) {
        flagAnim = 0;
        prependItemGal = "";
        for(var i=numbGal; i>0; i--) {
          itemGalSod = tekEl.find('>li').eq(-i).html();
          itemGal = "<li>" + itemGalSod + "</li>";
          prependItemGal = prependItemGal + itemGal;
        }
        tekEl.prepend(prependItemGal).css('margin-left', -prokr).animate({'margin-left': 0}, timeProkr, function() {
          for(var i=0; i<numbGal; i++) {
            itemGalSod = tekEl.find('>li').eq(-1).remove();
          }
          flagAnim = 1;
        });
      }
      return false;
    });
    var appendItemGal = "";
    wrapBlockGal.find('.galery-arrow-right').on('click', function() {
      if(flagAnim == 1) {
        flagAnim = 0;
        appendItemGal = "";
        for(var i=0; i<numbGal; i++) {
          itemGalSod = tekEl.find('>li').eq(i).html();
          itemGal = "<li>" + itemGalSod + "</li>";
          appendItemGal = appendItemGal + itemGal;
        }
        tekEl.append(appendItemGal).animate({'margin-left': -prokr}, timeProkr, function() {
          for(var i=0; i<numbGal; i++) {
            itemGalSod = tekEl.find('>li').eq(0).remove();
          }
          tekEl.css('margin-left', 0);
          flagAnim = 1;
        });
      }
      return false;
    });
    var rightClickGal = function() {
      wrapBlockGal.find('.galery-arrow-right').click();
    }
    timerGal= setInterval(rightClickGal, timeTimerGal);
    wrapBlockGal.hover(function() {
      clearInterval(timerGal);
    }, function() {
      timerGal = setInterval(rightClickGal, timeTimerGal);
    })
    wrapBlockGal.on('swiperight swipeleft', function(e) {
      if(e.type == 'swiperight') {
        wrapBlockGal.find('.galery-arrow-left').trigger('click');
      } else if(e.type == 'swipeleft') {
        wrapBlockGal.find('.galery-arrow-right').trigger('click');
      }
    }).on('movestart', function(e) { // предотвращение свайпа для скролла страницы вниз/вверх
      if((e.distX > e.distY && e.distX < -e.distY) || (e.distX < e.distY && e.distX > -e.distY)) {
        e.preventDefault();
      }
    });
    countGal+=1;
  });
};
$(document).on("ready", function() {
  accord();
  galery();
  searshCoord();
  botCoord();
  allProkr();
  scrollPos();
  $('.footer-slide-vis').on('click', function() {
    var tekEl = $(this);
    var downBlock = tekEl.closest('.footer-slide-text').find('.footer-right-text');
    tekEl.fadeOut(function() {
      downBlock.fadeIn();
    });
    return false;
  });
  $('.footer-slide-hid').on('click', function() {
    var tekEl = $(this);
    var downBlock = tekEl.closest('.footer-slide-text').find('.footer-slide-vis');
    tekEl.closest('.footer-right-text').fadeOut(function() {
      downBlock.fadeIn();
    });
    return false;
  });
  if($('.clickTopMenu').length>0) {
    $('.clickTopMenu').on('click', function() {
      var tecAdr = $(this).attr('href');
      $('nav li[data-pos="'+tecAdr+'"] a').click();
      return false;
    });
  }
});


