// 左侧模块选择内添加滚动条
jsScroll(document.getElementById('jcMubanDiv'), 5, 'divScrollBar');
jsScroll(document.getElementById('Add_MubanDiv'), 5, 'divScrollBar1');
jsScroll(document.getElementById('Add_MubanDiv1'), 5, 'divScrollBar2');
jsScroll(document.getElementById('jcMubanDiv1'), 5, 'divScrollBar3');
jsScroll(document.getElementById('Add_MubanDiv2'), 5, 'divScrollBar4');
jsScroll(document.getElementById('Add_MubanDiv3'), 5, 'divScrollBar5');
jsScroll(document.getElementById('Add_MubanDiv4'), 5, 'divScrollBar6');
// $('#Add_MubanDiv1,.divScrollBar2').css('display','none');
// $('#Add_MubanDiv3,.divScrollBar5').css('display','none');
$('.LeftMuban').each(function(){
  $(this).children().find('.scrollDiv').css('display','none').eq(0).css('display','block');
})
// 左侧导航切换
$('.LeftNavul>li').click(function(){
  var this_index=$(this).index();
})

// 联通精选--广告选择模板最右侧一列去掉右边距
$('.CardMbUl>li,.CardMbUl2>li').each(function(){
  if(($(this).index()+1)%3==0){
    $(this).css('margin-right','0');
  }
})

// 模块选择
$('.mukuaiUl>li').click(function(){
  var this_index=$(this).index();
  $(this).siblings().removeClass('mukuaiLiSele');
  $(this).addClass('mukuaiLiSele');
  $(this).parents('.LeftMuban').children().find('.scrollDiv').css('display','none').eq(this_index).css('display','block');
})

// 广告类型选择
$('.AdStyle>li').click(function(){
  $('.AdStyle>li').removeClass('AdLiSele');
  $(this).addClass('AdLiSele');
})

$('.jx_tit,.jx_tit2,.xsgProTit,.floor_tit3_div>span').addClass('editeTxt').attr('title','双击可编辑');

//对于放置区域里面的元素进行代理
$('.droppable').delegate('','mouseover',function(e){
  //如果这个元素的class里面找到editeTxt，则加上mainContent1样式进行提示
  if($(e.target).parents().hasClass('droppable')&&$(e.target).hasClass('editeTxt')){
    $('.mainContent1').attr('contenteditable','false').removeClass('mainContent1');
    $(e.target).addClass('mainContent1');
  }
})
$('.editeTxt').mouseover(function(){
  $('.editeTxt').removeClass('mainContent1');
  $(this).addClass('mainContent1');
}).dblclick(function(){
  $(this).attr('contenteditable','true').focus();
})
$(window).click(function(e){
 if(!$(e.target).hasClass('editeTxt')){
   $('.mainContent1').attr('contenteditable','false').removeClass('mainContent1');
 }
})
$('.droppable').delegate('','dblclick',function(e){
  //如果这个元素的class里面找到editeTxt，则双击可以编辑
 if($(e.target).parents().hasClass('droppable')&&$(e.target).hasClass('editeTxt')){
   $(e.target).attr('contenteditable','true').focus();
 }
})
$('.droppable').delegate('img','dblclick',function(e){
  // console.log($(e.target))
  // $('.mc').show();
})

// 编辑链接--链接方式选择
$('#ProLink').click(function(){
  $('.linkPro').hide();
})
$('#ProSel').click(function(){
  $('.linkPro').show();
})
//清空链接
$('.linkInputClear').click(function(){
  $('.linkInput').val('');
})

$('.colseBtn').click(function(){
  $('.tcDiv,.mc').hide();
})
//链接弹层关闭
$('.linkDiv_saveBtn,.linkDiv_cancelBtn').click(function(){
  $('.linkDiv,.mc').hide();
})
$('.linkLi').click(function(){
  $('.linkDiv,.mc').show();
})
//宣传语弹层关闭
$('.PropagandaDiv_saveBtn,.PropagandaDiv_cancelBtn').click(function(){
  $('.PropagandaDiv,.mc').hide();
})
$('.xuanchuanyuLi').click(function(){
  $('.PropagandaDiv,.mc').show();
})
// 宣传语清空
$('.PropagandaInputClear').click(function(){
  $('.PropagandaInput').val('');
})

// 定义套餐选择图片
var taocanSelectImg='<img src="images/backStage/selected2.png" class="taocanSelect">';
// 套餐选择/流量包类型选择
$('.picUl>li').click(function(){
  $(this).parent().children().find('.taocanSelect').remove();
  $(this).append(taocanSelectImg);
})
// 套餐弹层关闭
$('.TariffDiv_saveBtn,.TariffDiv_cancelBtn').click(function(){
  $('.TariffDiv,.mc').hide();
})

$('.droppable').delegate('img','dblclick',function(e){
  if($(e.target).hasClass('taocanStyleName')){
    $('.TariffDiv,.mc').show();
  }
})

// 流量包弹层关闭
$('.FlowDiv_saveBtn,.FlowDiv_cancelBtn').click(function(){
  $('.FlowDiv,.mc').hide();
})

$('.droppable').delegate('img','dblclick',function(e){
  if($(e.target).hasClass('FlowStyle')){
    $('.FlowDiv,.mc').show();
  }
})

//联通精选部分切换按钮
$('.lx_jx_sx_ul>li').click(function(){
  var this_index=$(this).index();
  $('.lx_jx_pro_ul').hide();
  $('.lx_jx_pro_ul').eq(this_index).show();
  $(this).addClass('lx_jx_sx_select').siblings().removeClass('lx_jx_sx_select');
})
