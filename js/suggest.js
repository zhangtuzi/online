(function($) {

    $.suggest = function(input, options) {

      var $input = $(input).attr("autocomplete", "off");
      var $results;
      var timeout = false;
      var prevLength = 0;
      var cache = [];
      var cacheSize = 0;
      var validCityFlag = true;
      var hideDiv = true;
      var isSuggestShow = false;

      if($.trim($input.val())=='' || $.trim($input.val())==options.hintText) $input.val(options.hintText);
      if( ! options.attachObject ) {
        options.attachObject = $(document.createElement("ul")).appendTo('body');
      }

      $results = $(options.attachObject);
      $results.addClass(options.resultsClass);

      resetPosition();
      $(window)
        .load(resetPosition)    // just in case user is changing size of page while loading
        .resize(resetPosition);

      $input.blur(function() {
        setTimeout(function() { if (hideDiv){$results.hide()} }, 200);
        setTimeout(function() { $(options.hotObject).hide() }, 200);
        if($input.val()==""){
          $input.val(options.hintText);
          $(options.hideCode).val('');
          $(options.dataContainer).val('');
        } else if (isSuggestShow){
          selectCurrentResult();
        }
      });
      $(options.attachObject).live("mouseover", function(){
        hideDiv = false;
      });
      $(options.attachObject).mouseout(function(){
        hideDiv = true;
      });
      $input.focus(function(){
        if($.trim($(this).val())==options.hintText){
          $(this).val('');
        }
      });
      $input.click(function(){
        hideSuggestCity();
        showHotCity();
      });

      $input.keyup(processKey);

      function hideHotCity() {
        $(options.hotObject).hide();
      }
      function showHotCity() {
        if (!isSuggestShow) {
          $(options.hotObject).show();
        }
      }
      function hideSuggestCity() {
        if($.trim($input.val())=='' || $.trim($input.val())==options.hintText){
          $(options.attachObject).hide();
          isSuggestShow = false;
        }
      }
      function showSuggestCity() {
        $(options.attachObject).show();
        isSuggestShow = true;
        hideHotCity();
      }
      function resetPosition() {
        // requires jquery.dimension plugin
        var offset = $input.offset();
      }
      function processKey(e) {
        // handling up/down/escape requires results to be visible
        // handling enter/tab requires that AND a result to be selected
        if ((/27$|38$|40$/.test(e.keyCode) && $results.is(':visible')) || (/^13$|^9$/.test(e.keyCode) && getCurrentResult())) {
          if (e.preventDefault) {
            e.preventDefault();
          }
          if (e.stopPropagation) {
            e.stopPropagation();
          }
          e.cancelBubble = true;
          e.returnValue = false;
          switch(e.keyCode) {
            case 38: // up
              prevResult();
              break;
            case 40: // down
              nextResult();
              break;
            case 13: // return
              selectCurrentResult();
              break;
            case 27: //  escape
              $results.hide();
              break;
          }
        } else if ($input.val().length != prevLength) {
          if (timeout) {
            clearTimeout(timeout);
          }
          timeout = setTimeout(suggest, options.delay);
          prevLength = $input.val().length;
        }
      }
      function suggest() {
        var q = $.trim($input.val());
        hideHotCity();
        displayItems(q);
      }
      function displayItems(items) {
        var html = '';
        var countTotal = 0;
        if (items=='') {
          $results.html(html);
          hideSuggestCity();
          $(options.hideCode).val('');
          $(options.dataContainer).val('');
          return;
        }
        else {
          for (var i = 0; i < options.source.length; i++) {//å›½å†…åŸŽå¸‚åŒ¹é…
            var reg = new RegExp('^' + items + '.*$', 'im');
            if (reg.test(options.source[i][1])) {
              var content = '<label class="inputlabel">'+items+'</label>'+options.source[i][1].substring(items.length);
              html += '<li class="ac" rel="' + options.source[i][0] + '"><a href="javascript:void();" rel="'+options.source[i][1]+'" id="'+options.source[i][4]+'" >' + content + '</a></li>';
              countTotal = countTotal + 1;
              if (countTotal >= Number(options.maxItems)) {
                break;
              } else {
                continue;
              }
            }
            if (reg.test(options.source[i][2])) {
              var content = '<label class="inputlabel">'+items.toLowerCase()+'</label>'+options.source[i][2].substring(items.length).toLowerCase();
              html += '<li class="ac" rel="' + options.source[i][0] + '"><a href="javascript:void();"rel="'+options.source[i][1]+'" id="'+options.source[i][4]+'" >' + content + '(' + options.source[i][1] + ')</a></li>';
              countTotal = countTotal + 1;
              if (countTotal >= Number(options.maxItems)) {
                break;
              } else {
                continue;
              }
            }
            if (reg.test(options.source[i][3])) {
              var content = '<label class="inputlabel">'+items.toLowerCase()+'</label>'+options.source[i][3].substring(items.length).toLowerCase();
              html += '<li class="ac" rel="' + options.source[i][0] + '"><a href="javascript:void();"rel="'+options.source[i][1]+'" id="'+options.source[i][4]+'" >' + content + '(' + options.source[i][1] + ')</a></li>';
              countTotal = countTotal + 1;
              if (countTotal >= Number(options.maxItems)) {
                break;
              } else {
                continue;
              }
            }
          }
          if (html == '') {
            html = '<div class="gray acResultTip"><ul class="nonedisplay"><li class="ac_over nonedisplay"><a rel="'+options.hintText+'"></a></li></ul>对不起，找不到该地市</div>';
            validCityFlag = false;
          }
          else {
            html = '<div id="scrollDiv"><ul>' + html + '</ul></div>';
          }
        }

        $results.html(html);
        showSuggestCity();
        $results.children('div').children('ul').children('li:first-child').addClass(options.selectClass);
        $results.children('div').children('ul').children('li')
          .mouseover(function() {
            $results.children('div').children('ul').children('li').removeClass(options.selectClass);
            $(this).addClass(options.selectClass);
          })
          .click(function(e) {
            e.preventDefault();
            e.stopPropagation();
            selectCurrentResult();
          });
      }
      function getCurrentResult() {
        if (!$results.is(':visible')){
          return false;
        }
        var $currentResult = $results.children('div').children('ul').children('li.' + options.selectClass);
        if (!$currentResult.length){
          $currentResult = false;
        }
        return $currentResult;
      }

      function selectCurrentResult() {
        isSuggestShow = false;
        $currentResult = getCurrentResult();
        if ($currentResult) {
          var areaCode = $currentResult.children('a').attr("id");
          $(options.hideCode).val(areaCode);
          $input.val($currentResult.children('a').attr('rel'));
          prevLength = $input.val().length;
          if ($input.val()==options.hintText) {
            $input.attr("style","");
          }
          $results.hide();

          if( $(options.dataContainer) ) {
            $(options.dataContainer).val($currentResult.attr('rel'));
          }

          if (options.onSelect) {
            options.onSelect.apply($input[0]);
          }
          options.change();
        }
      }
      function nextResult() {
        $currentResult = getCurrentResult();
        if ($currentResult && $currentResult.next().length) {
          $currentResult.removeClass(options.selectClass).next().addClass(options.selectClass);
        }
        else {
          $currentResult.removeClass(options.selectClass);
          $results.children('div').children('ul').children('li:first-child').addClass(options.selectClass);
        }
      }
      function prevResult() {
        $currentResult = getCurrentResult();
        if ($currentResult && $currentResult.prev().length){
          $currentResult.removeClass(options.selectClass).prev().addClass(options.selectClass);
        }
        else {
          $currentResult.removeClass(options.selectClass);
          $results.children('div').children('ul').children('li:last-child').addClass(options.selectClass);
        }
      }
    }
    $.fn.suggest = function(source, options) {
      if (!source){
        return;
      }
      options = options || {};
      options.source = source;
      options.hot_list=options.hot_list || [];
      options.delay = options.delay || 0;
      options.resultsClass = options.resultsClass || 'suggestcity';
      options.selectClass = options.selectClass || 'ac_over';
      options.matchClass = options.matchClass || 'ac_match';
      options.minchars = options.minchars || 1;
      options.delimiter = options.delimiter || '\n';
      options.onSelect = options.onSelect || false;
      options.dataDelimiter = options.dataDelimiter || '\t';
      options.dataContainer = options.dataContainer || '#arrcityWord';
      options.attachObject = options.attachObject || '#suggestCity';
      options.hotObject = options.hotObject || '#hotCity';
      options.hintText = options.hintText || '';
      options.maxItems = options.maxItems || 10;
      options.hideCode = options.hideCode || '#areaCode'
      this.each(function() {
        new $.suggest(this, options);
      });
      return this;
    };
  })(jQuery);
