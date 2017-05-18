
var Banner={
  //banner图数量圆点
  index_ul:function(index_ulClass,banner_li_length,selectClass){//圆点外部ul的class，banner的li的长度,圆点选中样式Classs
    for(var i=0;i<banner_li_length;i++){//banner图中部圆点添加进来
      $('.'+index_ulClass+'').append('<li></li>');
    }
    $('.'+index_ulClass+'>li').eq(0).addClass(''+selectClass+'');//默认第一个圆点选中
  },
  //banner运行
  banner_move:function(banner_ulClass,banner_index,banner_li_length,
    index_ulClass,moveWith,selectClass,bannerLeft,bannerRight){
    //bannerul的class，目前banner的index，banner的长度，
    //banner圆点外部ul的class，banner每次运行的宽度,banner左控制按钮class，banner右控制按钮class
    banner_index=banner_index;
    if(banner_index==0||banner_index===banner_li_length){
      $('.'+bannerLeft+'').hide();
    }else{
      $('.'+bannerLeft+'').show();
    }
    if(banner_index===banner_li_length-1){
      $('.'+bannerRight+'').hide();
    }else{
      $('.'+bannerRight+'').show();
    }
    $('.'+index_ulClass+'>li').removeClass(''+selectClass+'');
    if(banner_index===banner_li_length){
      $('.'+index_ulClass+'>li').eq(banner_index-banner_li_length).addClass(''+selectClass+'');
    }else{
      $('.'+index_ulClass+'>li').eq(banner_index).addClass(''+selectClass+'');
    }

    $('.'+banner_ulClass+'').animate({'margin-left':-banner_index*moveWith},1000);
  },
  BigSmall:function(ll_bigNumber,ll_smallNumber,ll_Class){
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
  }
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


$('.search_input_div').click(function(){
  clearInterval(inputse);
  $(this).hide();
  $('.search_input').val('').focus();
})
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
// 悬浮导航
$(window).scroll(function(){
  var win_ScroTop=$(window).scrollTop();
  console.log(win_ScroTop)
  var xfTop=$('.suspend_nav_div').css('top');
  if(win_ScroTop<180&&win_ScroTop>-1){
    $('.nav_indicate_div').css('top',166-win_ScroTop);
  }
  if(win_ScroTop>180){
    $('.suspend_nav_div').addClass('suspend_nav_div_fixed');
    $('.nav_indicate_div').addClass('nav_indicate_div_xf');
  }else{
    $('.suspend_nav_div').removeClass('suspend_nav_div_fixed');
    $('.nav_indicate_div').removeClass('nav_indicate_div_xf');
  }
  if(win_ScroTop>600){
    $('.Left_win').show();
  }else{
    $('.Left_win').hide();
  }
})
var win_width=$(window).width();
$('.nav_indicate_div').width(win_width);

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
        $('.area_dq>li').removeClass('colorff6000');
        $(this).addClass('colorff6000');
      }
    })
  }

})

//选择地区
$('.area_dq>li').click(function(event){
  $('.area_selectDiv').removeClass('area_showing');
  $('.downup2').removeClass('downup2_tra');
  $('.area_selectDiv').hide();
  $('.area_dq>li').removeClass('colorff6000');
  $(this).addClass('colorff6000');
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


//轮播banner鼠标移入暂停，移出轮播
$('.banner_ul1').mouseover(function(){
  clearInterval(banner1_lb);
}).mouseout(function(){
  banner1_lb=setInterval(banner1,3000);
})


// 轮播banner图下方圆点控制
$('.banner_index_ul').delegate('li','click',function(){
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
  if(this_val=='输入手机号码'){
    $(this).val('').removeClass('color666');
  }
}).blur(function(){
  var this_val=$(this).val();
  if(this_val==''){
    $(this).val('输入手机号码').addClass('color666');
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
//联通精选部分切换按钮
$('.lx_jx_sx_ul>li').click(function(){
  var this_index=$(this).index();
  switch(this_index){
    case 0 :
    $('.jx_rqtjLi').show();
    $('.jx_cnxhLi,.jx_tszqLi').hide();
    break;
    case 1 :
    $('.jx_tszqLi').show();
    $('.jx_rqtjLi,.jx_cnxhLi').hide();
    break;
    case 2 :
    $('.jx_cnxhLi').show();
    $('.jx_rqtjLi,.jx_tszqLi').hide();
    break;
  }
  $(this).addClass('lx_jx_sx_select').siblings().removeClass('lx_jx_sx_select');
})




// 靓号专区轮播图
var Number_banner1_li_W=$('.mobileNumber_banner1>li').width();
var Number_banner1_li_lg=$('.mobileNumber_banner1>li').length;
$('.mobileNumber_banner1').width(Number_banner1_li_lg*Number_banner1_li_W*2);
var Number_banner2_li_W=$('.mobileNumber_banner2>li').width();
var Number_banner2_li_lg=$('.mobileNumber_banner2>li').length;
$('.mobileNumber_banner2').width(Number_banner2_li_lg*Number_banner2_li_W*2);
Banner.index_ul('mobileNumber_banner1_index_ul',Number_banner1_li_lg,'index_select2');
Banner.index_ul('mobileNumber_banner2_index_ul',Number_banner2_li_lg,'index_select2');
$('.mobileNumber_banner1').append($('.mobileNumber_banner1').html());
$('.mobileNumber_banner2').append($('.mobileNumber_banner2').html());
var Number_banner1=0;
var Number_banner2=0;
var Number_banner1_set,Number_banner2_set;
Number_banner1_move();
Number_banner2_move();

// 靓号专区banner鼠标移入暂停，移出轮播
$('.mobileNumber_banner1').mouseover(function(){
  clearInterval(Number_banner1_set);
}).mouseout(function(){
  Number_banner1_move();
})
$('.mobileNumber_banner2').mouseover(function(){
  clearInterval(Number_banner2_set);
}).mouseout(function(){
  Number_banner2_move();
})


// 靓号专区第一个轮播图运行

function Number_banner1_move(){
  $('.mobileNumber_banner1').animate({'margin-left':-Number_banner1*Number_banner1_li_W},1000);
  Number_banner1_set=setInterval(function(){
      if(Number_banner1<Number_banner1_li_lg){
        Number_banner1==Number_banner1;
      }else{
        Number_banner1=0;
        $('.mobileNumber_banner1').css('margin-left','0');
      }
      Number_banner1++;
      Banner.banner_move('mobileNumber_banner1',Number_banner1,Number_banner1_li_lg,
      'mobileNumber_banner1_index_ul',Number_banner1_li_W,'index_select2','bannerLeft1','bannerRight1');
  },5000);
}

// 圆点控制1
$('.mobileNumber_banner1_index_ul').delegate('li','click',function(){
  $('.mobileNumber_banner1').stop();
    clearInterval(Number_banner1_set);
    var this_index=$(this).index();
    if(this_index==0){
      $('.bannerLeft1').hide();
      $('.bannerRight1').show();
    }else if(this_index===Number_banner1_li_lg-1){
      $('.bannerLeft1').show();
      $('.bannerRight1').hide();
    }else{
      $('.bannerLeft1,.bannerRight1').show();
    }
    $('.mobileNumber_banner1_index_ul>li').removeClass('index_select2');
    $('.mobileNumber_banner1_index_ul>li').eq(this_index).addClass('index_select2');
    Number_banner1=this_index;
    Number_banner1_move();
  })

  // 靓号专区第一banner左按钮
  $('.bannerLeft1').click(function(){
    $('.mobileNumber_banner1').stop();
    clearInterval(Number_banner1_set);
    if(Number_banner1>0){
      Number_banner1--;
      $('.bannerRight1').show();
    }
    if(Number_banner1==0){
      $(this).hide();
    }
    $('.mobileNumber_banner1_index_ul>li').removeClass('index_select2');
    $('.mobileNumber_banner1_index_ul>li').eq(Number_banner1).addClass('index_select2');
    Number_banner1_move();
  })
  // 靓号专区第一banner右按钮
  $('.bannerRight1').click(function(){
    $('.mobileNumber_banner1').stop();
    clearInterval(Number_banner1_set);
    if(Number_banner1<Number_banner1_li_lg-1){
      Number_banner1++;
      $('.bannerLeft1').show();
    }
    if(Number_banner1===Number_banner1_li_lg-1){
      $(this).hide();
    }
    $('.mobileNumber_banner1_index_ul>li').removeClass('index_select2');
    $('.mobileNumber_banner1_index_ul>li').eq(Number_banner1).addClass('index_select2');
    Number_banner1_move();
  })


  // 靓号专区第二个轮播图运行
  function Number_banner2_move(){
    $('.mobileNumber_banner2').animate({'margin-left':-Number_banner2*Number_banner2_li_W},1000);
    Number_banner2_set=setInterval(function(){
      if(Number_banner2<Number_banner2_li_lg){
        Number_banner2==Number_banner2;
      }else{
        Number_banner2=0;
        $('.mobileNumber_banner2').css('margin-left','0');
      }
      Number_banner2++;
        Banner.banner_move('mobileNumber_banner2',Number_banner2,Number_banner2_li_lg,
        'mobileNumber_banner2_index_ul',Number_banner2_li_W,'index_select2','bannerLeft2','bannerRight2');
    },5000);
  }

  // 圆点控制2
  $('.mobileNumber_banner2_index_ul').delegate('li','click',function(){
    $('.mobileNumber_banner2').stop();
      clearInterval(Number_banner2_set);
      var this_index=$(this).index();
      if(this_index==0){
        $('.bannerLeft2').hide();
        $('.bannerRight2').show();
      }else if(this_index===Number_banner1_li_lg-1){
        $('.bannerLeft2').show();
        $('.bannerRight2').hide();
      }else{
        $('.bannerLeft2,.bannerRight2').show();
      }
      $('.mobileNumber_banner2_index_ul>li').removeClass('index_select2');
      $('.mobileNumber_banner2_index_ul>li').eq(this_index).addClass('index_select2');
      Number_banner2=this_index;
      Number_banner2_move();
    })

    // 靓号专区第二banner左按钮
    $('.bannerLeft2').click(function(){
      $('.mobileNumber_banner2').stop();
      clearInterval(Number_banner2_set);
      if(Number_banner2>0){
        Number_banner2--;
        $('.bannerRight2').show();
      }
      if(Number_banner2==0){
        $(this).hide();
      }
      $('.mobileNumber_banner2_index_ul>li').removeClass('index_select2');
      $('.mobileNumber_banner2_index_ul>li').eq(Number_banner2).addClass('index_select2');
      Number_banner2_move();
    })
    // 靓号专区第二banner右按钮
    $('.bannerRight2').click(function(){
      $('.mobileNumber_banner2').stop();
      clearInterval(Number_banner2_set);
      if(Number_banner2<Number_banner2_li_lg-1){
        Number_banner2++;
        $('.bannerLeft2').show();
      }
      if(Number_banner2===Number_banner2_li_lg-1){
        $(this).hide();
      }
      $('.mobileNumber_banner2_index_ul>li').removeClass('index_select2');
      $('.mobileNumber_banner2_index_ul>li').eq(Number_banner2).addClass('index_select2');
      Number_banner2_move();
    })

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
  $(window).scrollTop(0);
})

// 添加拖拽效果
$(function() {
  $('#lx_jx_pro_ul').sortable();
  // $('#lx_jx_pro_ul').disableSelection();
});
