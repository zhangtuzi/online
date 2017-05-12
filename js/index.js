$(function(){

})

// 轮播banner图部分
var win_width=$(window).width();
$('.banner_ul1 li').width(win_width);//将屏幕宽度赋值给banner图容器
var banner1_length=$('.banner_ul1 li').length;//获取banner图长度
$('.banner_ul1').width(win_width*banner1_length);//给容纳所有banner图的ul宽度赋值
for(var i=0;i<banner1_length;i++){//banner图中部圆点添加进来
  $('.banner_index_ul').append('<li></li>');
}
$('.banner_index_ul>li').eq(0).addClass('bgFFF');//默认第一个圆点选中

var banner1_lb=setInterval(banner1,3000);

// 轮播banner图下方圆点控制
$('.banner_index_ul').delegate('li','click',function(){
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
  if(banner_index1<banner1_length-1){
    banner_index1++;
  }else{
    banner_index1=0;
  }
  $('.banner_index_ul>li').removeClass('bgFFF');
  $('.banner_index_ul>li').eq(banner_index1).addClass('bgFFF');
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
