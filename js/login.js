var isName = window.navigator.appName;
var isSupport = function() {
    if (isName != "Netscape") {
        //isIE
        if (isName.indexOf("Microsoft") == 0) {
            var isIE = window.navigator.appVersion.split(";");
            var IeNumber = isIE[1].split('.')[0].toString().substr(5);
            if (IeNumber < 8) {
                alert("很遗憾您的浏览器过低")
                //window.location.href="http://www.baidu.com";
            }
        }
    }
}
isSupport();


var LoginObj={
  //banner图数量圆点
  index_ul:function(index_ulClass,banner_li_length,selectClass){//圆点外部ul的class，banner的li的长度,圆点选中样式Classs
    for(var i=0;i<banner_li_length;i++){//banner图中部圆点添加进来
      $('.'+index_ulClass+'').append('<li></li>');
    }
    $('.'+index_ulClass+'>li').eq(0).addClass(''+selectClass+'');//默认第一个圆点选中
  },
  inputSpace:function(inputClass,spaceTxt,errorTxt,parentBorClass){
    //input的class，input的初始提示值,错误提示语，激活时父级div的边框颜色class
    $('.'+inputClass+'').focus(function(){
      $(this).parents().eq(0).addClass(''+parentBorClass+'');
      if($(this).val()===spaceTxt){
        $(this).val('');
        $(this).removeClass('color999');
      }
    })
    $('.'+inputClass+'').blur(function(){
      $(this).parents().eq(0).removeClass(''+parentBorClass+'');
      if($(this).val()==''){
        $(this).val(''+spaceTxt+'');
        $(this).addClass('color999');
        if(errorTxt!=''){
          $('.errorDiv').animate({'height':'15px'},200);
          $('.errorTxt').text(''+errorTxt+'');
        }

      }else{
        $('.errorDiv').animate({'height':'0px'},200);
      }
    })
  },
  DownSelect:function(ULClass,selectClass,targetClass){
    //下拉选择ul的class，鼠标移入的li的背景颜色,选中的值放入的容器的class
    // 手机号码提示li鼠标事件
    $('.'+ULClass+'>li').mouseover(function(){
      $(this).addClass(''+selectClass+'').siblings().removeClass(''+selectClass+'');
    }).click(function(){
      var selNumber=$(this).text();
      $('.'+targetClass+'').val(selNumber);
      $('.'+targetClass+'>span').text(selNumber);
      $('.'+ULClass+'').hide();
    })
  }
}

// 轮播banner图部分
var win_width=$(window).width();
$('.banner_ul1 li').width(win_width);//将屏幕宽度赋值给banner图容器
var banner1_length=$('.banner_ul1 li').length;//获取banner图长度
$('.banner_ul1').width(win_width*banner1_length*2);//给容纳所有banner图的ul宽度赋值
LoginObj.index_ul('banner_index_ul',banner1_length,'bgFFF');
$('.banner_ul1').append($('.banner_ul1').html());
var banner1_lb=setInterval(banner1,3000);

  // 轮播banner图下方圆点控制
  $('.banner_index_ul').delegate('li','mouseover',function(){
    $('.banner_ul1').stop();
    clearInterval(banner1_lb);
    var this_index=$(this).index();
    $('.banner_index_ul>li').removeClass('bgFFF');
    $('.banner_index_ul>li').eq(this_index).addClass('bgFFF');
    banner_index1=this_index;
    $('.banner_ul1').animate({'margin-left':-banner_index1*win_width},1000);
    banner1_lb=setInterval(banner1,3000);
  })

  // banner轮播图运行方法
  var banner_index1=0;
  function banner1(){
    if(banner_index1<banner1_length){
      banner_index1=banner_index1;
    }else{
      banner_index1=0;
      $('.banner_ul1').css({'margin-left':-banner_index1*win_width});
    }
    banner_index1++;
    if(banner_index1===banner1_length){
      $('.banner_index_ul>li').removeClass('bgFFF');
      $('.banner_index_ul>li').eq(0).addClass('bgFFF');
    }else{
      $('.banner_index_ul>li').removeClass('bgFFF');
      $('.banner_index_ul>li').eq(banner_index1).addClass('bgFFF');
    }
    $('.banner_ul1').animate({'margin-left':-banner_index1*win_width},1000);
  }

  LoginObj.inputSpace('userNumber','手机号码/邮箱/固网（无区号）','请输入手机号码、邮箱或固网号码','border95b9f3');
  //input的class，input的初始提示值,错误提示语，激活时父级div的边框颜色class
  LoginObj.inputSpace('fwPassword','服务密码','请填写正确的手机密码','border95b9f3');
  //input的class，input的初始提示值,错误提示语，激活时父级div的边框颜色class
  LoginObj.inputSpace('picYzm','图片验证码','请填写正确的验证码','border95b9f3');
  //input的class，input的初始提示值,错误提示语，激活时父级div的边框颜色class
  LoginObj.inputSpace('sjpassword','随机密码','','border95b9f3');
  //input的class，input的初始提示值,错误提示语，激活时父级div的边框颜色class
  // 手机号码输入提示
  $('.userNumber').keyup(function(){
    var this_val=$(this).val();
    if(this_val==''||this_val=='手机号码/邮箱/固网（无区号）'){
      $('.userNumbTip').hide();
    }else{
      $('.userNumbTip').show();
      $('.userNumberClear').show();
    }
  })


// 手机号码提示li鼠标事件
LoginObj.DownSelect('userNumbTip','userNumbTipSel','userNumber');

// 号码分类选择li鼠标事件
LoginObj.DownSelect('numberStyleUL','userNumbTipSel','numberStyleTxt');

$('.numberStyle').click(function(){
  if($(this).hasClass('border95b9f3')){
    $(this).removeClass('border95b9f3');
    $('.numberStyleUL').hide();
  }else{
    $(this).addClass('border95b9f3');
    $('.numberStyleUL').show();
  }
})
var fwpassword=true;//服务密码登陆状态
$('.userNumber').blur(function(){
  var this_val=$(this).val();
  if(fwpassword){
    if(this_val==''||this_val=='手机号码/邮箱/固网（无区号）'){
      $('.areaDivs').slideUp(400);
    }else{
      $('.areaDivs').slideDown(400);
    }
  }
})

$('.loginSubmit').click(function(){
  if(fwpassword){
      $('.picYzmDiv').show();
      $('.errorDiv').animate({'height':'15px'},200);
      $('.errorTxt').text('账号或者密码输入有误');
  }
})

$('.fwPassword,.sjpassword').focus(function(){
    $(this).prop('type','password');
})
$('.fwPassword').blur(function(){
  var this_val=$(this).val();
  if(this_val==''||this_val=='服务密码'){
    $(this).prop('type','text');
  }
})
$('.sjpassword').blur(function(){
  var this_val=$(this).val();
  if(this_val==''||this_val=='随机密码'){
    $(this).prop('type','text');
  }
})


$('.userNumberClear').click(function(){
  $(this).hide();
  $('.userNumber').val('');
  $('.userNumbTip').hide();
  $('.userNumber').focus();
})

$('.sjmClick').click(function(){
  if(!$(this).hasClass('color666')){
    $(this).addClass('color666');
    var sjm_i=60;
    $('.sjmClick').text(sjm_i+'秒后重新获取');
    var sjmSet=setInterval(function(){
      sjm_i--;
      if(sjm_i>0){
        $('.sjmClick').text(sjm_i+'秒后重新获取');
      }else{
        clearInterval(sjmSet);
        $('.sjmClick').text('获取随机码');
        $('.sjmClick').removeClass('color666');
      }
    },1000)
  }
})

$('.fwLogin').click(function(){
  $('.errorDiv').animate({'height':'0px'},200);
  $(this).addClass('colorff6600');
  $('.sjLogin').removeClass('colorff6600');
  $('.fw').show();
  $('.sj,.picYzmDiv').hide();
  fwpassword=true;
})
$('.sjLogin').click(function(){
  $('.errorDiv').animate({'height':'0px'},200);
  $(this).addClass('colorff6600');
  $('.fwLogin').removeClass('colorff6600');
  $('.sj').show();
  $('.fw,.picYzmDiv').hide();
  fwpassword=false;
  $('.userNumbTip').hide();
  $('.userNumber').val('手机号码/邮箱/固网（无区号）').addClass('color999');
  $('.areaDivs').slideUp(400);
})
$('.mmEwmqh').click(function(){
  if($(this).hasClass('mmEwmqh1')){//切换为密码登陆
    $(this).removeClass('mmEwmqh1');
    $('.mmLoginDiv').show();
    $('.ewmLoginDiv').hide();
  }else{//切换为二维码登陆
    $(this).addClass('mmEwmqh1');
    $('.mmLoginDiv').hide();
    $('.ewmLoginDiv').show();
    clearInterval(ewmSet);
    ewmsm();
  }
})

// 二维码刷新按钮
$('.smReLoad').click(function(){
  $('.smFail,.smMC').hide();
  ewmsm();
})

// 二维码定时过期
var ewm_i=10;
var ewmSet;
function ewmsm(){
  ewmSet=setInterval(function(){
      if(ewm_i<1){
        clearInterval(ewmSet);
        $('.smFail,.smMC').show();
        ewm_i=10;
      }
      ewm_i--;
  },1000)
}

$('.ewmHelp').mouseover(function(){
  $('.smdlEWM').addClass('smdlEWM1');
}).mouseout(function(){
  $('.smdlEWM').removeClass('smdlEWM1');
})


$("#arrcity").suggest(citys,{
    hot_list:commoncitys,
    dataContainer:'#arrcityWord',
    attachObject:'#suggestCity',
    hotObject:'#hotCity',
    hintText:$("#arrcity").attr("data-value"),
    maxItems:10,
    hideCode:'#areaCode',
    change:function(){

    }
  });

  $("#arrcity").blur(function(){
    var this_val=$(this).val();
    if(this_val==''||this_val=='地市（中文/拼音）'){
      $(this).addClass('color999');
    }else{
      $(this).removeClass('color999');
    }

  }).keydown(function(e){
    var currKey=0,e=e||event; currKey=e.keyCode||e.which||e.charCode;
    if(currKey==32){
      return false;
    }
    var _this=$(this),datav=_this.attr("data-value"),val=_this.val();
    if(val==datav)_this.val("").addClass('color999');
  });
    $(".js-hotcitylist").mouseover(function(){
      $(this).addClass("htc-hover");
    }).mouseout(function(){
      $(this).removeClass("htc-hover");
    }).click(function(){
      var selectedCity = $(this).html().trim();
      $("#arrcity").val(selectedCity);
      $("#arrcity").removeClass('color999');
      for(var i=0;i<citys.length;i++){
        if (selectedCity ==citys[i][1]){
          $("#areaCode").val(citys[i][4]);
          $("#arrcityWord").val(citys[i][0]);
          break;
        }
      }
      $("#arrcity").focus();
    });
