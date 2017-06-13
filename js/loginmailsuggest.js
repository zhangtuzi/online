(function($) {

    $.loginmailsuggest = function(input, options) {

      var $input = $(input).attr("autocomplete", "off");
      var $results;
      var timeout = false;
      var prevLength = 0;
      var cache = [];
      var cacheSize = 0;
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
        if($input.val()==""){
          $input.val(options.hintText);
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

      $input.keyup(processKey);
      function hideSuggestCity() {
        $(options.attachObject).hide();
        isSuggestShow = false;
      }
      function showSuggestCity() {
        $(options.attachObject).show();
        isSuggestShow = true;
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
        if(q==""){
          $results.html("");
          hideSuggestCity();
          return;
        }
        var qs=q.split("@");
        if(qs.length<=2&&q.indexOf("@")>0){
          displayItems(q);
        }else{
          $results.html("");
          hideSuggestCity();
          return;
        }
      }
      function displayItems(items) {
        var countTotal = 0;
        var inputs=items.split("@");
        var flag = inputs.length == 2;
        var html = '<li class="mailc"><a href="javascript:void();" >' + items + '</a></li>';
        for (var i = 0; i < options.source.length; i++){
          if(flag){
            var reg = new RegExp('^' + inputs[1] + '.*$', 'im');
            if (reg.test(options.source[i][0])){
              var content = inputs[0]+'@'+options.source[i][0];
              html += '<li class="mailc"><a href="javascript:void();" >' + content + '</a></li>';
              countTotal = countTotal + 1;
              if (countTotal >= Number(options.maxItems)) {
                break;
              } else {
                continue;
              }
            }
          }else{
            var content = inputs[0]+'@'+options.source[i][0];
            html += '<li class="mailc"><a href="javascript:void();" >' + content + '</a></li>';
            countTotal = countTotal + 1;
            if (countTotal >= Number(options.maxItems)) {
              break;
            } else {
              continue;
            }
          }
        }
        html = '<div id="scrollDiv"><ul>' + html + '</ul></div>';

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
          $input.val($currentResult.children('a').html());
          prevLength = $input.val().length;
          if ($input.val()==options.hintText) {
            $input.attr("style","");
          }
          $results.hide();

          if (options.onSelect) {
            options.onSelect.apply($input[0]);
          }
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
    $.fn.loginmailsuggest = function(options) {
      options = options || {};
      options.source = options.source||[];
      options.delay = options.delay || 0;
      options.resultsClass = options.resultsClass || 'mailauto';
      options.selectClass = options.selectClass || 'mail_over';
      options.matchClass = options.matchClass || 'ac_match';
      options.minchars = options.minchars || 1;
      options.delimiter = options.delimiter || '\n';
      options.onSelect = options.onSelect || false;
      options.dataDelimiter = options.dataDelimiter || '\t';
      options.attachObject = options.attachObject || '#mailauto';
      options.hintText = options.hintText || '';
      options.maxItems = options.maxItems || 10;
      this.each(function() {
        new $.loginmailsuggest(this, options);
      });
      return this;
    };
  })(jQuery);
