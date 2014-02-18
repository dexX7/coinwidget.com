/**

Donations welcome:
  BTC: 122MeuyZpYz4GSHNrF98e6dnQCXZfHJeGS
  LTC: LY1L6M6yG26b4sRkLv4BbkmHhPn8GR5fFm
  MSC: 1JCwo8qnjDquGnx44N81NNehqytksL92zM
    ~ Thank you!

------------

MIT License (MIT)

Copyright (c) 2013 http://coinwidget.com/ 
Copyright (c) 2013 http://scotty.cc/
Copyright (c) 2014 http://bitwatch.co/

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
if(typeof CoinWidgetComCounter != 'number')
  var CoinWidgetComCounter = 0;
  
if(typeof CoinWidgetCom != 'object')
  var CoinWidgetCom = {
  
    /**
     * Call to action:
     * Replace source with your own server/path.
     */
    source: 'http://bitwatch.co/tips/',
    
    go: function(config, element) {
      var config = CoinWidgetCom.validate(config);
      CoinWidgetCom.config[CoinWidgetComCounter] = config;
      CoinWidgetCom.loader.jquery();
      if((typeof element === 'object' && (element instanceof HTMLElement || (element instanceof NodeList &&
        element.length > 0) || (typeof jQuery === 'function' && jQuery(element).length > 0))) || 
        (typeof element === 'string' && ((element.charAt(0) === '#' && document.getElementById(
        element.substr(1)) !== null) || (element.charAt(0) === '.' && document.getElementsByClassName(
        element.substr(1))[0] !== null) || document.getElementById(element) !== null))) {
        if(typeof element === 'object') {
          if(element instanceof NodeList) {
            element = element[0];
          } else if(typeof jQuery === 'function') {
            var button_text = jQuery(element).text();
            jQuery(element)
              .replaceWith('<span data-coinwidget-instance="' + CoinWidgetComCounter +
                '" class="COINWIDGETCOM_CONTAINER"></span>');
          }
        } else if(typeof element === 'string') {
          if(element.charAt(0) === '#' && document.getElementById(element.substr(1)) !== null)
            element = document.getElementById(element.substr(1));
          else if(element.charAt(0) === '.' && document.getElementsByClassName(element.substr(1))[0] !== null)
            element = document.getElementsByClassName(element.substr(1))[0];
          else
            element = document.getElementById('element');
          var button_text = element.textContent;
          var newSpan = document.createElement('span');
          newSpan.setAttribute("data-coinwidget-instance", CoinWidgetComCounter);
          newSpan.setAttribute("class", "COINWIDGETCOM_CONTAINER");          
          element.parentNode.replaceChild(newSpan, element);
        }
        if(button_text && button_text.length > 0)
          CoinWidgetCom.config[CoinWidgetComCounter].lbl_button = button_text;
      } else {
        var newSpan = document.createElement('span');
        newSpan.setAttribute("data-coinwidget-instance", CoinWidgetComCounter);
        newSpan.setAttribute("class", "COINWIDGETCOM_CONTAINER");    
        document.getElementsByTagName('body')[0].appendChild(newSpan);
      }
      CoinWidgetComCounter++;
    },
    
    config: [],
    validate: function(config) {
      var accepted = [];
      accepted['currencies'] = ['bitcoin', 'litecoin', 'mastercoin'];
      accepted['counters'] = ['count', 'amount', 'hide'];
      accepted['alignment'] = ['al', 'ac', 'ar', 'bl', 'bc', 'br'];
      if(!config.currency || !CoinWidgetCom.in_array(config.currency, accepted['currencies']))
        config.currency = 'bitcoin';
      if(!config.counter || !CoinWidgetCom.in_array(config.counter, accepted['counters']))
        config.counter = 'count';
      if(!config.alignment || !CoinWidgetCom.in_array(config.alignment, accepted['alignment']))
        config.alignment = 'bl';
      if(typeof config.qrcode != 'boolean')
        config.qrcode = true;
      if(typeof config.auto_show != 'boolean')
        config.auto_show = false;
      if(!config.wallet_address)
        config.wallet_address = 'My ' + config.currency + ' wallet_address is missing!';
      if(!config.lbl_button)
        config.lbl_button = 'Donate';
      if(!config.lbl_address)
        config.lbl_address = 'My Bitcoin Address:';
      if(!config.lbl_count)
        config.lbl_count = 'Donation';
      if(!config.lbl_amount)
        config.lbl_amount = 'BTC';
      if(typeof config.decimals != 'number' || config.decimals < 0 || config.decimals > 8)
        config.decimals = 4;
      if(typeof config.send_button != 'boolean')
        config.send_button = true;
      return config;
    },
    
    init: function() {
      CoinWidgetCom.loader.stylesheet();
      $(window)
        .resize(function() {
          CoinWidgetCom.window_resize();
        });
        
      /**
       * Optional call to action:
       * Finetune timings.
       */
      setTimeout(function() {
        /* this delayed start gives the page enough time to 
           render multiple widgets before pinging for counts.
        */
        CoinWidgetCom.build();
      }, 800);
    },
    
    build: function() {
      $("[data-coinwidget-instance]")
        .each(function(i, v) {
          var config = CoinWidgetCom.config[$(this)
            .attr('data-coinwidget-instance')];
          var counter = config.counter == 'hide' ? '' : '<span><img src="' + CoinWidgetCom.source +
            'icon_loading.gif" width="13" height="13" /></span>';
          var button = '<a class="COINWIDGETCOM_BUTTON_' + config.currency.toUpperCase() +
            '" href="#"><img src="' + CoinWidgetCom.source + 'icon_' + config.currency + 
            '.png" /><span>' + config.lbl_button + '</span></a>' + counter;
          $(this)
            .html(button);
          $(this)
            .find('> a')
            .unbind('click')
            .click(function(e) {
              e.preventDefault();
              CoinWidgetCom.show(this);
            });
      });
      CoinWidgetCom.counters();
    },
    
    window_resize: function() {
      $.each(CoinWidgetCom.config, function(i, v) {
        CoinWidgetCom.window_position(i);
      });
    },
    
    window_position: function(instance) {
      var config = CoinWidgetCom.config[instance];
      var coin_window = "#COINWIDGETCOM_WINDOW_" + instance;
      var obj = "[data-coinwidget-instance='" + instance + "'] > a";
      /*   to make alignment relative to the full width of the container instead 
      of just the button change this occurence of $(obj) to $(obj).parent(), 
      do the same for the occurences within the switch statement. */
      var top = 0, left = 0;
      var offset = $(obj)
        .offset();
      switch(config.alignment) {
        default:
        case 'al':
          /* above left */
          top = offset.top - $(coin_window)
            .outerHeight() - 10;
          left = offset.left;
          break;
        case 'ac':
          /* above center */
          top = offset.top - $(coin_window)
            .outerHeight() - 10;
          left = offset.left + ($(obj)
            .outerWidth() / 2) - ($(coin_window)
            .outerWidth() / 2);
          break;
        case 'ar':
          /* above right */
          top = offset.top - $(coin_window)
            .outerHeight() - 10;
          left = offset.left + $(obj)
            .outerWidth() - $(coin_window)
            .outerWidth();
          break;
        case 'bl':
          /* bottom left */
          top = offset.top + $(obj)
            .outerHeight() + 10;
          left = offset.left;
          break;
        case 'bc':
          /* bottom center */
          top = offset.top + $(obj)
            .outerHeight() + 10;
          left = offset.left + ($(obj)
            .outerWidth() / 2) - ($(coin_window)
            .outerWidth() / 2);
          break;
        case 'br':
          /* bottom right */
          top = offset.top + $(obj)
            .outerHeight() + 10;
          left = offset.left + $(obj)
            .outerWidth() - $(coin_window)
            .outerWidth();
        break;
      }
      if($(coin_window)
        .is(':visible')) {
        $(coin_window)
          .stop()
          .animate({
            'z-index': 99999999999,
            'top': top,
            'left': left
          }, 150);
      } else {
        $(coin_window)
          .stop()
          .css({
            'z-index': 99999999998,
            'top': top,
            'left': left
          });
      }
    },
    
    counter: [],
    counters: function() {
      var addresses = [];
      $.each(CoinWidgetCom.config, function(i, v) {
        if(v.counter != 'hide') {
          addresses.push(i + '_' + v.currency + '_' + v.wallet_address);
        } else {
          if(v.auto_show)
            $("[data-coinwidget-instance='" + i + "']")
              .find('> a')
              .click();
        }
      });
      if(addresses.length) {
        CoinWidgetCom.loader.script({
          id: 'COINWIDGETCOM_INFO' + Math.random(),
          source: CoinWidgetCom.source + 'lookup.php?data=' + addresses.join('|'),
          callback: function() {
            if(typeof COINWIDGETCOM_DATA == 'object') {
              CoinWidgetCom.counter = COINWIDGETCOM_DATA;
              $.each(CoinWidgetCom.counter, function(i, v) {
                var config = CoinWidgetCom.config[i];
                if(v == null || !v.count || !v.amount) v = {
                  count: 0,
                  amount: 0
                };
                $("[data-coinwidget-instance='" + i + "']")
                  .find('> span')
                  .html(config.counter == 'count' ? v.count : v.amount.toFixed(config.decimals) + ' ' +
                    $config.lbl_amount);
                if(config.auto_show) {
                  $("[data-coinwidget-instance='" + i + "']")
                    .find('> a')
                    .click();
                }
              });
            }
            if($("[data-coinwidget-instance] > span img")
              .length > 0) {
              
              /**
               * Optional call to action:
               * Finetune timings.
               */
              setTimeout(function() {
                CoinWidgetCom.counters();
              }, 2500);
            }
          }
        });
      }
    },
    
    show: function(obj) {
      var instance = $(obj)
        .parent()
        .attr('data-coinwidget-instance');
      var config = CoinWidgetCom.config[instance];
      var coin_window = "#COINWIDGETCOM_WINDOW_" + instance;
      $(".COINWIDGETCOM_WINDOW")
        .css({
          'z-index': 99999999998
        });
      if(!$(coin_window).length) {
        var sel = !navigator.userAgent.match(/iPhone/i) ? 'onclick="this.select();"' :
          'onclick="prompt(\'Select all and copy:\',\'' + config.wallet_address + '\');"';
        var html =
          '<label>' + config.lbl_address + '</label>' +
          '<input class="' + (config.send_button ? 'INPUT_WITH_BUTTON' : 'INPUT_WITHOUT_BUTTON') + '"' +
          ' type="text" readonly ' + sel + ' value="' + config.wallet_address + '" />' +
          '<div class="COINWIDGETCOM_CREDITS"><a href="http://coinwidget.com/" target="_blank">CoinWidget.com</a>' +
          ' (<a href="https://github.com/dexX7/coinwidget.com" target="_blank">msc-mod</a>)</div>';
        if(config.send_button) {
          html +=
            '<a class="COINWIDGETCOM_WALLETURI" href="' + config.currency.toLowerCase() + ':' +
            config.wallet_address + '" target="_blank" title="Click here to send this address to your wallet (if ' +
            ' your wallet is not compatible you will get an empty page, close the white screen and copy the address' +
            ' by hand)">' +
            '<img src="' + CoinWidgetCom.source + 'icon_wallet.png" /></a>';
        }
        html +=
          '<a class="COINWIDGETCOM_CLOSER" href="javascript:;" onclick="CoinWidgetCom.hide(' + instance + ');"' +
          ' title="Close this window">x</a>' +
          '<img class="COINWIDGET_INPUT_ICON" src="' + CoinWidgetCom.source + 'icon_' + config.currency + '.png"' +
          ' width="16" height="16" title="This is a ' + config.currency + ' wallet address." />';          
        if(config.counter != 'hide') {
          html +=
            '<span class="COINWIDGETCOM_COUNT">0<small>' + config.lbl_count + '</small></span>' +
            '<span class="COINWIDGETCOM_AMOUNT end">0.00<small>' + config.lbl_amount + '</small></span>';
        }        
        if(config.qrcode) {
          html +=
            '<img class="COINWIDGETCOM_QRCODE" data-coinwidget-instance="' + instance + '" src="' +
            CoinWidgetCom.source + 'icon_qrcode.png" width="16" height="16" />' +
            '<img class="COINWIDGETCOM_QRCODE_LARGE" src="' + CoinWidgetCom.source +
            'icon_qrcode.png" width="111" height="111" />';
        }
        var $div = $('<div></div>');
        $('body')
          .append($div);
        $div.attr({
          'id': 'COINWIDGETCOM_WINDOW_' + instance
        })
          .addClass('COINWIDGETCOM_WINDOW COINWIDGETCOM_WINDOW_' + config.currency.toUpperCase() +
            ' COINWIDGETCOM_WINDOW_' + config.alignment.toUpperCase())
          .html(html)
          .unbind('click')
          .bind('click', function() {
            $(".COINWIDGETCOM_WINDOW")
              .css({
                'z-index': 99999999998
              });
            $(this)
              .css({
                'z-index': 99999999999
              });
          });          
        if(config.qrcode) {
          $(coin_window)
            .find('.COINWIDGETCOM_QRCODE')
            .bind('mouseenter click', function() {
              config = CoinWidgetCom.config[$(this)
                .attr('data-coinwidget-instance')];
              $lrg = $(this)
                .parent()
                .find('.COINWIDGETCOM_QRCODE_LARGE');
              if($lrg.is(':visible')) {
                $lrg.hide();
                return;
              }
              $lrg.attr({
                src: CoinWidgetCom.source + 'qr/?address=' + config.wallet_address
              })
                .show();
            })
            .bind('mouseleave', function() {
              $lrg = $(this)
                .parent()
                .find('.COINWIDGETCOM_QRCODE_LARGE');
              $lrg.hide();
            });
        }
      } else {
        if($(coin_window).is(':visible')) {
          CoinWidgetCom.hide(instance);
          return;
        }
      }
      CoinWidgetCom.window_position(instance);
      $(coin_window)
        .show();
      var pos = $(coin_window)
        .find('input')
        .position();
      $(coin_window)
        .find('img.COINWIDGET_INPUT_ICON')
        .css({
          'top': pos.top + 3,
          'left': pos.left + 3
        });
      $(coin_window)
        .find('.COINWIDGETCOM_WALLETURI')
        .css({
          'top': pos.top + 3,
          'left': pos.left + $(coin_window)
            .find('input')
            .outerWidth() + 3
        });
      if(config.counter != 'hide') {
        var counters = CoinWidgetCom.counter[instance];
        $(coin_window)
          .find('.COINWIDGETCOM_COUNT')
          .html(counters.count + '<small>' + config.lbl_count + '</small>');
        $(coin_window)
          .find('.COINWIDGETCOM_AMOUNT')
          .html(counters.amount.toFixed(config.decimals) + '<small>' + config.lbl_amount + '</small>');
      }
      if(typeof config.onShow == 'function')
        config.onShow();
    },
    
    hide: function(instance) {
      var config = CoinWidgetCom.config[instance];
      coin_window = "#COINWIDGETCOM_WINDOW_" + instance;
      $(coin_window)
        .fadeOut();
      if(typeof config.onHide == 'function') {
        config.onHide();
      }
    },
    
    in_array: function(needle, haystack) {
      for(i = 0; i < haystack.length; i++) {
        if(haystack[i] == needle) {
          return true;
        }
      }
      return false;
    },
    
    loader: {
      script: function(obj) {
        if(!document.getElementById(obj.id)) {
          var x = document.createElement('script');
          x.onreadystatechange = function() {
            switch(this.readyState) {
            case 'complete':
            case 'loaded':
              obj.callback();
              break;
            }
          };
          x.onload = function() {
            obj.callback();
          };
          x.src = obj.source;
          x.id = obj.id;
          document.lastChild.firstChild.appendChild(x);
        }
      },
      
      /**
       * Optional call to action:
       * Set stylesheet_loaded to true, if you load external CSS
       */
      stylesheet_loaded: false,
      stylesheet: function() {
        if(!CoinWidgetCom.loader.stylesheet_loaded) {
          CoinWidgetCom.loader.stylesheet_loaded = true;
          var $link = $('<link/>');
          $("head")
            .append($link);
          $link.attr({
            id: 'COINWIDGETCOM_STYLESHEET',
            rel: 'stylesheet',
            type: 'text/css',
            href: CoinWidgetCom.source + 'coin.css'
          });
        }
      },
      
      /**
       * Optional call to action:
       * Set loading_jquery to true, if you load JQuery externally
       */
      loading_jquery: false,
      jquery: function() {
        if(!window.jQuery && !CoinWidgetCom.loader.loading_jquery) {
          var prefix = window.location.protocol == 'file:' ? 'http:' : '';
          CoinWidgetCom.loader.script({
            id: 'COINWIDGETCOM_JQUERY',
            source: prefix + '//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js',
            callback: function() {
              CoinWidgetCom.init();
            }
          });
          return;
        }
        CoinWidgetCom.init();
      }
    }
  };