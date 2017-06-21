$(function(){
  var win_scTop=$(window).scrollTop();
  Banner.XfNav(win_scTop);
})


// 针对Safari浏览器的单独定义的样式
if(window.navigator.userAgent.indexOf("Safari") == 0){
  $('.suspend_nav1>li>a').css({'padding':'0 14px'});
  $('.width181 .suspend_nav1>li>a').css({'padding':'0 15px'});
}


var isName = window.navigator.appName;
// 针对ie8以下浏览器的提示
var isSupport = function() {
    if (isName != "Netscape") {
        //isIEhtml

        if (isName.indexOf("Microsoft") == 0) {
            var isIE = window.navigator.appVersion.split(";");
            var IeNumber = isIE[1].split('.')[0].toString().substr(5);
            if (IeNumber < 8) {
                alert("很遗憾您的浏览器过低")
                //window.location.href="http://www.baidu.com";
            }
        }
    }
    if (isName != "Netscape") {
        //isIE
        if (isName.indexOf("Microsoft") == 0) {
            var isIE = window.navigator.appVersion.split(";");
            var IeNumber = isIE[1].split('.')[0].toString().substr(5);
            if (IeNumber < 9) {
                $('.Left_win').css('display','block');
            }
        }
    }

}
isSupport();


var Banner={
  //banner图数量圆点
  index_ul:function(index_ulClass,banner_li_length,selectClass){//圆点外部ul的class，banner的li的长度,圆点选中样式Classs
    for(var i=0;i<banner_li_length;i++){//banner图中部圆点添加进来
      $('.'+index_ulClass+'').append('<li></li>');
    }
    $('.'+index_ulClass+'>li').eq(0).addClass(''+selectClass+'');//默认第一个圆点选中
  },
  // 个人信息部分数字的变动动画
  BigSmall:function(ll_bigNumber,ll_smallNumber,ll_Class){
    //（总数、剩余数（超出为负数）、容器class）
    var change_ll=parseInt((ll_bigNumber-ll_smallNumber)/108);
    var change_i=0;
    var changell=setInterval(function(){
        // if(ll_bigNumber>ll_smallNumber&&yy_bigNumber>yy_smallNumber){
        if(ll_bigNumber>ll_smallNumber&&change_i<108){
          ll_bigNumber=ll_bigNumber-change_ll;
          change_i++;
          $('.'+ll_Class+'').text(Math.abs(ll_bigNumber));
          // $('.'+yy_Class+'').text(Math.abs(yy_bigNumber));
        }else{
          ll_bigNumber=ll_smallNumber;
          // ll_bigNumber=ll_smallNumber;
          $('.'+ll_Class+'').text(Math.abs(ll_smallNumber));
          // $('.'+yy_Class+'').text(Math.abs(yy_smallNumber));
          clearInterval(changell);
        }
    },10)
  },
  // 数组排序1
  ArrayPx1:function(array){
    function sortNumber(a,b)
    {
      return a - b
    }
    var array2=[];
    for(var i=0;i<array.length;i++){
      array2.push(parseInt(array[i].top));
      array2.sort(sortNumber);
    }
    var array3=array;
    for(var j=0;j<array.length;j++){
      var arrayTop=array[j].top;
      for(var z=0;z<array2.length;z++){
        if(arrayTop===array2[z]){
          array3[z]=array[j];
          array3[z].class1=array[j].class1+'_f';
          array3[z].top=array[j].top-380;
        }
      }
    }
    return array3;
  },
  // 判断是否数组排序，ie9以下不进行排序
  ArrayPx:function(array){
    if (isName != "Netscape") {
        //isIE
        if (isName.indexOf("Microsoft") == 0) {
            var isIE = window.navigator.appVersion.split(";");
            var IeNumber = isIE[1].split('.')[0].toString().substr(5);
            if (IeNumber > 8) {
              return  Banner.ArrayPx1(array);
            }
        }
    }else{
      //非ie
      return  Banner.ArrayPx1(array);
    }
  },

  // 悬浮导航定位
  XfNav:function(win_ScroTop){
    if(win_ScroTop<140){
      $('.nav_indicate_div').removeClass('nav_indicate_div_xf').css('top',163-win_ScroTop);
      $('.suspend_nav_div').removeClass('suspend_nav_div_fixed');
    }else if(win_ScroTop>140){
      if(!$('.suspend_nav_div').hasClass('suspend_nav_div_fixed')){
        $('.suspend_nav_div').addClass('suspend_nav_div_fixed').height(0).animate({'height':'145px'},100);
        $('.nav_indicate_div').addClass('nav_indicate_div_xf');
      }
    }
  },
  // 轮播图运行方法
  banner_move:function(banner_index,banner_length,move_width,banner_ul,banner_index_ul,bgClass){
    if(banner_index===banner_length){
      $('.'+banner_index_ul+'>li').removeClass(''+bgClass+'');
      $('.'+banner_index_ul+'>li').eq(0).addClass(''+bgClass+'');
    }else{
      $('.'+banner_index_ul+'>li').removeClass(''+bgClass+'');
      $('.'+banner_index_ul+'>li').eq(banner_index).addClass(''+bgClass+'');
    }
    $('.'+banner_ul+'').animate({'margin-left':-banner_index*move_width},1000);
    if(banner_index===banner_length){
      $('.'+banner_ul+'').css({'margin-left':'0'},1000);
    }
  },
  //轮播图构造方法
  bannerGz:function(bannerstyle,bannerUl,banner_indexUL){
    //靓号专区banner类型('ts','sr','jnr'),bannerul的class，banner下方圆点控制的ul的class
    $('.'+bannerUl+'').append($('.'+bannerUl+'').html());//将轮播图部分的li复制一份后追加到ul中
    tsLiLength=$('.'+bannerUl+'>li').length;//获取轮播图部分的2倍li的长度
    $('.'+bannerUl+'').width(tsLiLength*Lh_width);//给轮播图的ul赋值
    tsLiLength=tsLiLength/2;//获取轮播图的原始li的长度
    for(var i=0;i<tsLiLength;i++){
      $('.'+banner_indexUL+'').append('<li></li>');
    }
    $('.'+banner_indexUL+'>li').eq(0).addClass('bgff6600');
    if(bannerstyle=='ts'){//特色靓号
      tsLiLength=tsLiLength;
    }else if(bannerstyle=='sr'){//生日靓号
      srLiLength=tsLiLength;
    }else if(bannerstyle=='jnr'){//纪念日靓号
      jnrLiLength=tsLiLength;
    }
  },

}

// 剩余流量/语音倒数
Banner.BigSmall(2048,1024,'sy_ll');
//（流量总数、流量剩余数（超出为负数）、流量容器class）
Banner.BigSmall(2100,230,'sy_yy');
//语音总数、语音剩余数（超出为负数）、语音容器class

//搜索框轮播
var input_s_i=0;
var search_ht=$('.search_input_ul').html();
var input_s_lg=$('.search_input_ul>li').length;
$('.search_input_ul').append(search_ht);
var inputse;
search_lbF();
function search_lbF(){
  inputse=setInterval(function(){
    if(input_s_i<input_s_lg){
      input_s_i=input_s_i;
    }else{
      input_s_i=0;
      $('.search_input_ul').css({'margin-top':-(input_s_i*35)});
    }
    input_s_i++;
    $('.search_input').val($('.search_input_ul>li').eq(input_s_i).text());
    $('.search_input_ul').animate({'margin-top':-(input_s_i*35)},700);
  },2000)
}


setTimeout(function(){
  $('.search_input_div').click(function(){
  clearInterval(inputse);
  $(this).hide();
  $('.search_input').val('').focus();
})
},0)

setTimeout(function(){
  $('.search_input').blur(function(){
  var this_val=$(this).val();
  if(this_val==''){
    input_s_i=0;
    $('.search_input').val($('.search_input_ul>li').eq(input_s_i).text());
    $('.search_input_ul').css({'margin-top':-(input_s_i*35)});
    search_lbF();
    $('.search_input_div').show();
  }
});
},0)

var win_width=$(window).width();
// $('.nav_indicate_div').width(win_width);

//开始选择地区
$('.area_div').click(function(){
  if($('.area_selectDiv').hasClass('area_showing')){
    $('.downup2').removeClass('downup2_tra');
    $('.area_selectDiv').hide();
    $('.area_selectDiv').removeClass('area_showing');
  }else{
    $('.area_selectDiv').addClass('area_showing');
    var now_area=$(this).text();
    $('.downup2').addClass('downup2_tra');
    $('.area_selectDiv').show();
    $('.area_dq>li').each(function(){
      var this_area=$(this).text();
      this_area=this_area.substring(0,this_area.length-1);
      if(this_area===now_area){
        $('.area_dq>li').removeClass('colorff6000_1');
        $(this).addClass('colorff6000_1');
      }
    })
  }

})

//选择地区
$('.area_dq>li').click(function(event){
  $('.area_selectDiv').removeClass('area_showing');
  $('.downup2').removeClass('downup2_tra');
  $('.area_selectDiv').hide();
  $('.area_dq>li').removeClass('colorff6000_1');
  $(this).addClass('colorff6000_1');
  var this_area=$(this).text();
  this_area=this_area.substring(0,this_area.length-1);
  $('.area_show').text(this_area);
  event.stopPropagation();
})




// 轮播banner图部分
var win_width=$(window).width();
$('.banner_ul1 li').width(win_width);//将屏幕宽度赋值给banner图容器
var banner1_length=$('.banner_ul1 li').length;//获取banner图长度
$('.banner_ul1').width(win_width*banner1_length*2);//给容纳所有banner图的ul宽度赋值
Banner.index_ul('banner_index_ul',banner1_length,'bgFFF');
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

  //轮播banner鼠标移入暂停，移出轮播
  $('.banner_ul1').mouseover(function(){
    clearInterval(banner1_lb);
  }).mouseout(function(){
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

// banner图右上方充值金额选择
$('.cz_price>li>span').click(function(){
  $('.cz_price>li>span').removeClass('select_span');
  $('.cz_price>li>img').addClass('dn');
  $(this).addClass('select_span');
  $(this).next().removeClass('dn');
})

// 充值金额输入框
$('.cz_phone').focus(function(){
  var this_val=$(this).val();
  if(this_val=='输入手机/固话号码'){
    $(this).val('').removeClass('color666');
  }
}).blur(function(){
  var this_val=$(this).val();
  if(this_val==''){
    $(this).val('输入手机/固话号码').addClass('color666');
  }
})
$('.otherP_input').focus(function(){
  var this_val=$(this).val();
  if(this_val=='输入金额'){
    $(this).val('').removeClass('color666');
  }
}).blur(function(){
  var this_val=$(this).val();
  if(this_val==''){
    $(this).val('输入金额').addClass('color666');
  }
})
$('.czPSe_btn').click(function(){
  $('.zdy_btn').removeClass('select_span');
  $('.cz_price>li').eq(0).find('span').addClass('select_span');
  $('.cz_price>li').eq(0).find('img').removeClass('dn');
  $('.otherP').hide();
  $('.cz_price').show();
})
$('.zdy_btn').click(function(){
  $('.otherP').show();
  $('.cz_price').hide();
})


//联通精选部分自动切换
var lt_jx_S_i=0;
var lt_jx_S;
lt_jx_SFun(lt_jx_S_i);
function lt_jx_SFun(lt_jx_S_i){
  lt_jx_S=setInterval(function(){
    if(lt_jx_S_i<$('.lx_jx_sx_ul>li').length-1){
      lt_jx_S_i++;
    }else{
      lt_jx_S_i=0;
    }
    switch(lt_jx_S_i){
      case 0 :
      $('.jx_rqtjLi').show();
      $('.jx_cnxhLi,.jx_tszqLi,.jx_xsgLi').hide();
      break;
      case 1 :
      $('.jx_tszqLi').show();
      $('.jx_rqtjLi,.jx_cnxhLi,.jx_xsgLi').hide();
      break;
      case 2 :
      $('.jx_cnxhLi').show();
      $('.jx_rqtjLi,.jx_tszqLi,.jx_xsgLi').hide();
      break;
      default:
      $('.jx_xsgLi').show();
      $('.jx_rqtjLi,.jx_tszqLi,.jx_cnxhLi').hide();
    }
    $('.lx_jx_sx_ul>li').eq(lt_jx_S_i).addClass('lx_jx_sx_select').siblings().removeClass('lx_jx_sx_select');
  },5000)
}

//联通精选部分切换按钮
$('.lx_jx_sx_ul>li').mouseover(function(){
  clearInterval(lt_jx_S);
  var this_index=$(this).index();
  lt_jx_S_i=this_index;
  switch(this_index){
    case 0 :
    $('.jx_rqtjLi').show();
    $('.jx_cnxhLi,.jx_tszqLi,.jx_xsgLi').hide();
    break;
    case 1 :
    $('.jx_tszqLi').show();
    $('.jx_rqtjLi,.jx_cnxhLi,.jx_xsgLi').hide();
    break;
    case 2 :
    $('.jx_cnxhLi').show();
    $('.jx_rqtjLi,.jx_tszqLi,.jx_xsgLi').hide();
    break;
    default:
    $('.jx_xsgLi').show();
    $('.jx_rqtjLi,.jx_tszqLi,.jx_cnxhLi').hide();
  }
  $(this).addClass('lx_jx_sx_select').siblings().removeClass('lx_jx_sx_select');
}).mouseout(function(){
  lt_jx_SFun(lt_jx_S_i);
})


$('.lx_jx_pro_ul>li').mouseover(function(){
  clearInterval(lt_jx_S);
}).mouseout(function(){
  lt_jx_SFun(lt_jx_S_i);
})

// 靓号专区轮播图部分开始
var tsLiLength,srLiLength,jnrLiLength;Lh_width;
var Lh_width=$('.tsNumber>li').width();//获取轮播图的li的宽度

Banner.bannerGz('ts','tsNumber','tsNumber_indexUl');
//靓号专区banner类型('ts','sr','jnr'),bannerul的class，banner下方圆点控制的ul的class
Banner.bannerGz('sr','srNumber','srNumber_indexUl');
//靓号专区banner类型('ts','sr','jnr'),bannerul的class，banner下方圆点控制的ul的class
Banner.bannerGz('jnr','jnrNumber','jnrNumber_indexUl');
//靓号专区banner类型('ts','sr','jnr'),bannerul的class，banner下方圆点控制的ul的class
var tsIndex=0,srIndex=0,jnrIndex=0;
var ts_setI,sr_setI,jnr_setI;


tsMove(tsIndex,tsLiLength,'tsNumber','Number_indexUlShow');
function tsMove(tsIndex,tsLiLength,banner_ul,banner_index_ul){
  //特色靓号轮播下标，特色靓号轮播长度、特色靓号轮播ul的class，圆点控制的ul的class
  ts_setI=setInterval(function(){
    if(tsIndex<tsLiLength){
      tsIndex==tsIndex;
    }else{
      tsIndex=0;
      $('.tsNumber').css('margin-left','0');
    }
    tsIndex++;
    Banner.banner_move(tsIndex,tsLiLength,Lh_width,banner_ul,banner_index_ul,'bgff6600');
      //banner的下标，bannerli的长度，每次运动的长度，bannerul的class，
      //下方圆点控制的ul的class，下方圆点控制变化的class
  },5000)
}

function srMove(srIndex,srLiLength,banner_ul,banner_index_ul){
  //生日靓号轮播下标，生日靓号轮播长度、生日靓号轮播ul的class，圆点控制的ul的class
  sr_setI=setInterval(function(){
    // console.log(srLiLength+'.....1')
    if(srIndex<srLiLength){
      srIndex==srIndex;
    }else{
      srIndex=0;
      $('.srNumber').css('margin-left','0');
    }
    srIndex++
    Banner.banner_move(srIndex,srLiLength,Lh_width,banner_ul,banner_index_ul,'bgff6600');
      //banner的下标，bannerli的长度，每次运动的长度，bannerul的class，
      //下方圆点控制的ul的class，下方圆点控制变化的class

  },5000)
}
function jnrMove(jnrIndex,jnrLiLength,banner_ul,banner_index_ul){
  //纪念日靓号轮播下标，纪念日靓号轮播长度、纪念日靓号轮播ul的class，圆点控制的ul的class
  jnr_setI=setInterval(function(){
    if(jnrIndex<jnrLiLength){
      jnrIndex==jnrIndex;
    }else{
      jnrIndex=0;
      $('.jnrNumber').css('margin-left','0');
    }
    jnrIndex++;
    Banner.banner_move(jnrIndex,jnrLiLength,Lh_width,banner_ul,banner_index_ul,'bgff6600');
      //banner的下标，bannerli的长度，每次运动的长度，bannerul的class，
      //下方圆点控制的ul的class，下方圆点控制变化的class
  },5000)
}

// 特色靓号圆点控制
$('.tsNumber_indexUl>li').mouseover(function(){
  $('.mobileNumber_ul2').stop(true,true);
  clearInterval(ts_setI);
  tsIndex=$(this).index();
  $('.tsNumber_indexUl>li').removeClass('bgff6600');
  $('.tsNumber_indexUl>li').eq(tsIndex).addClass('bgff6600');
  $('.tsNumber').animate({'margin-left':-tsIndex*Lh_width},1000);
}).mouseout(function(){
  ts_setI=setInterval(function(){
    if(tsIndex<tsLiLength){
      tsIndex==tsIndex;
    }else{
      tsIndex=0;
      $('.tsNumber').css('margin-left','0');
    }
    tsIndex++;
    Banner.banner_move(tsIndex,tsLiLength,Lh_width,'tsNumber','tsNumber_indexUl','bgff6600')
      //banner的下标，bannerli的长度，每次运动的长度，bannerul的class，
      //下方圆点控制的ul的class，下方圆点控制变化的class
  },5000)
})

// 特色靓号区域鼠标移入暂停，移出继续
$('.tsNumber').mouseover(function(){
  $('.mobileNumber_ul2').stop(true,true);
  clearInterval(ts_setI);
}).mouseout(function(){
  ts_setI=setInterval(function(){
    if(tsIndex<tsLiLength){
      tsIndex==tsIndex;
    }else{
      tsIndex=0;
      $('.tsNumber').css('margin-left','0');
    }
    tsIndex++;
    Banner.banner_move(tsIndex,tsLiLength,Lh_width,'tsNumber','tsNumber_indexUl','bgff6600')
      //banner的下标，bannerli的长度，每次运动的长度，bannerul的class，
      //下方圆点控制的ul的class，下方圆点控制变化的class
  },5000)
})
// 生日靓号圆点控制
$('.srNumber_indexUl>li').mouseover(function(){
  $('.mobileNumber_ul2').stop(true,true);
  clearInterval(sr_setI);
  srIndex=$(this).index();
  $('.srNumber_indexUl>li').removeClass('bgff6600');
  $('.srNumber_indexUl>li').eq(srIndex).addClass('bgff6600');
  $('.srNumber').animate({'margin-left':-srIndex*Lh_width},1000);
}).mouseout(function(){
  sr_setI=setInterval(function(){
    if(srIndex<srLiLength){
      srIndex==srIndex;
    }else{
      srIndex=0;
      $('.srNumber').css('margin-left','0');
    }
    srIndex++;
    Banner.banner_move(srIndex,srLiLength,Lh_width,'srNumber','srNumber_indexUl','bgff6600')
      //banner的下标，bannerli的长度，每次运动的长度，bannerul的class，
      //下方圆点控制的ul的class，下方圆点控制变化的class
  },5000)
})

// 生日靓号区域鼠标移入暂停，移出继续
$('.tsNumber').mouseover(function(){
  $('.mobileNumber_ul2').stop(true,true);
  clearInterval(sr_setI);
}).mouseout(function(){
  sr_setI=setInterval(function(){
    if(srIndex<srLiLength){
      srIndex==srIndex;
    }else{
      srIndex=0;
      $('.srNumber').css('margin-left','0');
    }
    srIndex++;
    Banner.banner_move(srIndex,srLiLength,Lh_width,'srNumber','srNumber_indexUl','bgff6600')
      //banner的下标，bannerli的长度，每次运动的长度，bannerul的class，
      //下方圆点控制的ul的class，下方圆点控制变化的class
  },5000)
})

// 纪念日靓号圆点控制
$('.jnrNumber_indexUl>li').mouseover(function(){
  $('.mobileNumber_ul2').stop(true,true);
  clearInterval(jnr_setI);
  jnrIndex=$(this).index();
  $('.jnrNumber_indexUl>li').removeClass('bgff6600');
  $('.jnrNumber_indexUl>li').eq(jnrIndex).addClass('bgff6600');
  $('.jnrNumber').animate({'margin-left':-jnrIndex*Lh_width},1000);
}).mouseout(function(){
  jnr_setI=setInterval(function(){
    if(jnrIndex<jnrLiLength){
      jnrIndex==jnrIndex;
    }else{
      jnrIndex=0;
      $('.jnrNumber').css('margin-left','0');
    }
    srIndex++;
    Banner.banner_move(jnrIndex,jnrLiLength,Lh_width,'jnrNumber','jnrNumber_indexUl','bgff6600')
      //banner的下标，bannerli的长度，每次运动的长度，bannerul的class，
      //下方圆点控制的ul的class，下方圆点控制变化的class
  },5000)
})

// 纪念日靓号区域鼠标移入暂停，移出继续
$('.tsNumber').mouseover(function(){
  $('.mobileNumber_ul2').stop(true,true);
  clearInterval(jnr_setI);
}).mouseout(function(){
  jnr_setI=setInterval(function(){
    if(jnrIndex<jnrLiLength){
      jnrIndex==jnrIndex;
    }else{
      jnrIndex=0;
      $('.jnrNumber').css('margin-left','0');
    }
    srIndex++;
    Banner.banner_move(jnrIndex,jnrLiLength,Lh_width,'jnrNumber','jnrNumber_indexUl','bgff6600')
      //banner的下标，bannerli的长度，每次运动的长度，bannerul的class，
      //下方圆点控制的ul的class，下方圆点控制变化的class
  },5000)
})

//换一换按钮
$('.numberChangeBtn').click(function(){
  $('.mobileNumber_ul2Show').stop(true,true);
  clearInterval(ts_setI);
  clearInterval(sr_setI);
  clearInterval(jnr_setI);
  var showul2Width=$('.mobileNumber_ul2Show').width();
  var inD_Left=$('.mobileNumber_ul2Show').css('margin-left');
  inD_Left=parseInt(inD_Left.substring(0,inD_Left.length-2));
  if(inD_Left>-(showul2Width)/2+Lh_width){
    $('.Number_indexUlShow>li').removeClass('bgff6600');
    $('.Number_indexUlShow>li').eq(-inD_Left/Lh_width+1).addClass('bgff6600');
    $('.mobileNumber_ul2Show').animate({'margin-left':inD_Left-Lh_width},1000);
  }else if(inD_Left==-(showul2Width)/2+Lh_width){
    $('.Number_indexUlShow>li').removeClass('bgff6600');
    $('.Number_indexUlShow>li').eq(0).addClass('bgff6600');
    $('.mobileNumber_ul2Show').animate({'margin-left':0},1000);
  }else if(inD_Left==-(showul2Width)/2){
    $('.mobileNumber_ul2Show').animate({'margin-left':0},1000);
    $('.Number_indexUlShow>li').removeClass('bgff6600');
    $('.Number_indexUlShow>li').eq(1).addClass('bgff6600');
    $('.mobileNumber_ul2Show').animate({'margin-left':-Lh_width},1000);
    // $('.mobileNumber_ul2Show').css('margin-left','0');
  }
})

// 靓号专区切换
$('.mobileNumber_ul1>li').click(function(){
  var this_index=$(this).index();
  $('.mobileNumber_ul1>li').removeClass('mobileNum_U1_LSe');
  $('.mobileNumber_ul1>li').eq(this_index).addClass('mobileNum_U1_LSe');
  $('.Number_indexUl').removeClass('Number_indexUlShow');
  switch(this_index){
    //特色靓号
    case 0:
    $('.mobileNumber_ul2Show').stop(true,true);
      clearInterval(ts_setI);
      clearInterval(sr_setI);
      clearInterval(jnr_setI);
      $('.mobileN_Style_pic').eq(0).attr('src','images/wjx_active.png');
      $('.mobileN_Style_pic').eq(1).attr('src','images/heart_icon1.png');
      $('.mobileN_Style_pic').eq(2).attr('src','images/date_icon.png');
      $('.mobileNumber_ul2').removeClass('mobileNumber_ul2Show');
      $('.tsNumber').addClass('mobileNumber_ul2Show');
      tsIndex=0;
      $('.Number_indexUl').eq(0).addClass('Number_indexUlShow');
      $('.Number_indexUlShow>li').removeClass('bgff6600').eq(0).addClass('bgff6600');
      tsMove(tsIndex,tsLiLength,'tsNumber','Number_indexUlShow');
      break;
    //生日靓号
    case 1:
      $('.mobileNumber_ul2Show').stop(true,true);
      clearInterval(ts_setI);
      clearInterval(sr_setI);
      clearInterval(jnr_setI);
      $('.mobileN_Style_pic').eq(0).attr('src','images/wjx_icon1.png');
      $('.mobileN_Style_pic').eq(1).attr('src','images/heart_active.png');
      $('.mobileN_Style_pic').eq(2).attr('src','images/date_icon.png');
      $('.mobileNumber_ul2').removeClass('mobileNumber_ul2Show');
      $('.srNumber').addClass('mobileNumber_ul2Show');
      srIndex=0;
      $('.Number_indexUl').eq(1).addClass('Number_indexUlShow');
      $('.Number_indexUlShow>li').removeClass('bgff6600').eq(0).addClass('bgff6600');
      srMove(srIndex,srLiLength,'srNumber','Number_indexUlShow');
      break;
    //纪念日靓号
    case 2:
    $('.mobileNumber_ul2Show').stop(true,true);
      clearInterval(ts_setI);
      clearInterval(sr_setI);
      clearInterval(jnr_setI);
      $('.mobileN_Style_pic').eq(0).attr('src','images/wjx_icon1.png');
      $('.mobileN_Style_pic').eq(1).attr('src','images/heart_icon1.png');
      $('.mobileN_Style_pic').eq(2).attr('src','images/date_active.png');
      $('.mobileNumber_ul2').removeClass('mobileNumber_ul2Show');
      $('.jnrNumber').addClass('mobileNumber_ul2Show');
      jnrIndex=0;
      $('.Number_indexUl').eq(2).addClass('Number_indexUlShow');
      $('.Number_indexUlShow>li').removeClass('bgff6600').eq(0).addClass('bgff6600');
      jnrMove(jnrIndex,jnrLiLength,'jnrNumber','Number_indexUlShow');
      break;
  }
})


// 靓号专区轮播图部分结束


  // 右侧导购鼠标放上换图片
  $('.zxdg_w').mouseover(function(){
    $(this).find('.right_win_pic').attr('src','images/online_dg_active.png');
    $(this).find('.right_win_txt').addClass('colorff6000');
  }).mouseout(function(){
    $(this).find('.right_win_pic').attr('src','images/online_dg.png');
    $(this).find('.right_win_txt').removeClass('colorff6000');
  })
  $('.zxkf_li').mouseover(function(){
    $(this).find('.right_win_pic').attr('src','images/online_kf_active.png');
    $(this).find('.right_win_txt').addClass('colorff6000');
  }).mouseout(function(){
    $(this).find('.right_win_pic').attr('src','images/online_kf.png');
    $(this).find('.right_win_txt').removeClass('colorff6000');
  })
  $('.survey_quesLi').mouseover(function(){
    $(this).find('.right_win_pic').attr('src','images/survey_ques_active.png');
    $(this).find('.right_win_txt').addClass('colorff6000');
  }).mouseout(function(){
    $(this).find('.right_win_pic').attr('src','images/survey_ques.png');
    $(this).find('.right_win_txt').removeClass('colorff6000');
  })
  $('.backTop_btn').mouseover(function(){
    $(this).find('img').attr('src','images/back_top_active.png');
  }).mouseout(function(){
    $(this).find('img').attr('src','images/back_top.png');
  })


// 返回顶部
$('.backTop_btn').click(function(){
  var win_scT=$(window).scrollTop();//获取当前滚动条高度
  var backTop_S=setInterval(function(){
    if(win_scT>0){//如果差值小于0；表示目标在目前滚动条的上方
      var scT_change1=Math.abs(win_scT/3);
      win_scT=win_scT-scT_change1;
      $(window).scrollTop(win_scT);
    }
    //高度在两个像素以内则停止滚动
    if(win_scT<1){
      clearInterval(backTop_S);
    }
  },30)

})

// 添加拖拽效果
$(function() {
  $('#lx_jx_pro_ul').sortable();
  // $('#lx_jx_pro_ul').disableSelection();
});

  var scroChange;
//楼层跳转
function FloorGo(domId){//传入目标的id
  clearInterval(scroChange);
　var scrollHeight = $(document).height();//获取滚动条可以滚动的所有距离
　var windowHeight = $(window).height();//获取屏幕高度
  var domIdTop=$('#'+domId+'').offset().top-150;//获取目标的滚动条高度
  scroChange=setInterval(function(){
    var win_scT=$(window).scrollTop();//获取当前滚动条高度
    var scT_pc=domIdTop-win_scT;//获取目标与当前滚动条的差值
    if(scT_pc<0){//如果差值小于0；表示目标在目前滚动条的上方
      var scT_change1=Math.abs(scT_pc/3);
      $(window).scrollTop(win_scT-scT_change1);
      var pcz=Math.abs(win_scT-scT_change1-domIdTop);
      // console.log(pcz);
      //如果目前的高度和目标的高度在两个像素以内则停止滚动
      if(pcz<3){
        clearInterval(scroChange);
      }
    }else{//如果差值不小于0；表示目标在目前滚动条的下方
      if(win_scT + windowHeight > scrollHeight-10){//如果滚动滚动到页面最底部10像素以内，停止滚动
　　　　clearInterval(scroChange);
　　  }
      var scT_change1=Math.abs(scT_pc/3);
      $(window).scrollTop(win_scT+scT_change1);
      var pcz=Math.abs(win_scT+scT_change1-domIdTop);
      //如果目前的高度和目标的高度在两个像素以内则停止滚动
      if(pcz<3){
        clearInterval(scroChange);
      }
    }
  },10)

}
//获取各个楼层距离页面顶部的top值
var T_jx_box_top1=$('#jx_box').offset()?parseInt($('#jx_box').offset().top):0;
var T_traffic_div_top1=$('#traffic_div').offset()?parseInt($('#traffic_div').offset().top):0;
var T_G4_div_top1=$('#G4_div').offset()?parseInt($('#G4_div').offset().top):0;
var T_phoneAccessories_top1=$('#phoneAccessories').offset()?parseInt($('#phoneAccessories').offset().top):0;
var T_InternetCard_top1=$('#InternetCard').offset()?parseInt($('#InternetCard').offset().top):0;
var T_lifeService_top1=$('#lifeService').offset()?parseInt($('#lifeService').offset().top):0;
//将各个楼层的id和距离页面顶部top值放入数组TopArray
var TopArray=[
  {class1:'jx_box',top:T_jx_box_top1},
  {class1:'traffic_div',top:T_traffic_div_top1},
  {class1:'G4_div',top:T_G4_div_top1},
  {class1:'phoneAccessories',top:T_phoneAccessories_top1},
  {class1:'InternetCard',top:T_InternetCard_top1},
  {class1:'lifeService',top:T_lifeService_top1}
];
//将从小到大排序后的各个楼层的id和距离页面顶部top值放入数组TopArra2
var TopArray2=Banner.ArrayPx(TopArray);

console.log(TopArray2)

// 悬浮导航以及左侧浮层的楼层变色等
$(window).scroll(function(){
  var win_ScroTop=$(window).scrollTop();
  Banner.XfNav(win_ScroTop);
  // 左侧楼层浮层显示判断
  if(win_ScroTop>300){
    $('.Left_win').show();
  }else{
    $('.Left_win').hide();
  }

  // 左侧楼层颜色判断
  if(win_ScroTop>TopArray2[0].top&&win_ScroTop<TopArray2[1].top-1){
    $('.Left_Wul>li>a').removeClass('colorff6600');
    $('.'+TopArray2[0].class1+'').find('a').addClass('colorff6600');
  }else if(win_ScroTop>TopArray2[1].top&&win_ScroTop<TopArray2[2].top-1){
    $('.Left_Wul>li>a').removeClass('colorff6600');
    $('.'+TopArray2[1].class1+'').find('a').addClass('colorff6600');
  }
  else if(win_ScroTop>TopArray2[2].top&&win_ScroTop<TopArray2[3].top-1){
    $('.Left_Wul>li>a').removeClass('colorff6600');
    $('.'+TopArray2[2].class1+'').find('a').addClass('colorff6600');
  }
  else if(win_ScroTop>TopArray2[3].top&&win_ScroTop<TopArray2[4].top-1){
    $('.Left_Wul>li>a').removeClass('colorff6600');
    $('.'+TopArray2[3].class1+'').find('a').addClass('colorff6600');
  }else if(win_ScroTop>TopArray2[4].top){
    $('.Left_Wul>li>a').removeClass('colorff6600');
    $('.'+TopArray2[4].class1+'').find('a').addClass('colorff6600');
  }else if(win_ScroTop>TopArray2[5].top){
    $('.Left_Wul>li>a').removeClass('colorff6600');
    $('.'+TopArray2[5].class1+'').find('a').addClass('colorff6600');
  }
})


// 收藏按钮事件
$('.collect_icon1,.collect_icon2').click(function(){
  if($(this).hasClass('ysc')){
    $(this).removeClass('ysc');
    $(this).attr('src','images/collect_icon1_zhl.png');
  }else{
    $(this).addClass('ysc');
    $(this).attr('src','images/collect_icon2_zhl.png');
  }
})

// 购物车点击跳动事件
$('.shoppingCar3').click(function(){
  $(this).addClass('spCclick');
  $(this).css('bottom','7px');
  setTimeout(function(){
    $('.spCclick').css('bottom','5px').removeClass('sp3click');;
  },100)
})
$('.shoppingCar2').click(function(){
  $(this).addClass('spCclick');
  $(this).css('margin-top','5px');
  setTimeout(function(){
    $('.spCclick').css('margin-top','7px').removeClass('sp3click');;
  },100)
})


// 麻熊辉修改部分
window.onload = function(){
        loadInitalHeadList();
    }
    function equilthight(arr){
        var arrItem1 = arr[0].height();
        var arrItem2 = arr[1].height();
        maxHeight = Math.max(arrItem1,arrItem2);
        arr[0].height(maxHeight);
        arr[1].height(maxHeight);
    }
    function loadInitalHeadList(){
        $('.nav_indicate_div').css('visibility','hidden');
        $('.nav_indicate_div').css('display','block');
        putallListIn();
        adShowCheck();
        $('.nav_indicate_div').removeAttr('style');

    }
    function setheaderListHight(item){
        var targetList = item.find('li');
        var arr = [];
        for(var i =0,j = 0; i < targetList.length; i++){
            if(i == (targetList.length -1)){
                break;
            }else{
                j++;
                if(j >= 2){
                  arr.push(targetList.eq(i));
                  equilthight(arr);
                  j = 0;
                  arr = [];
                }else{
                  arr.push(targetList.eq(i));
                }
            }
        }
    }
    function putallListIn(){
        $('.listBox_header-list3').each(function(index,item){
            var target = $(item);
            setheaderListHight(target);
        })
    }


    function adShowCheck(){
        $('.Two_nav_ul1').each(function(index,item){
            var itemwidth = $(item).width();
            if(itemwidth > 836){
                $(item).find('.recommendPic').parent('li').addClass('dn');
                $(item).siblings('.recommendTC_div').addClass('dn');
            }
        })
    }
