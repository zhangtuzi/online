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

$('.jx_tit,.jx_tit2,.xsgProTit,.floor_tit span,.floor_tit3_div div,.lx_jx_sx_ul>li,.user_iperate_title').addClass('editeTxt').attr('title','双击可编辑');

//对于放置区域里面的元素进行代理
$('.droppable').delegate('','mouseover',function(e){
  //如果这个元素的class里面找到editeTxt，则加上mainContent1样式进行提示
  if($(e.target).parents().hasClass('droppable')&&$(e.target).hasClass('editeTxt')){
    $('.mainContent1').attr('contenteditable','false').removeClass('mainContent1');
    $(e.target).addClass('mainContent1');
  }
})
function editeTxtFun(){
  $('.editeTxt').mouseover(function(){
    $('.editeTxt').removeClass('mainContent1');
    $(this).addClass('mainContent1');
  }).dblclick(function(){
    $(this).attr('contenteditable','true').focus();
  })
}
editeTxtFun();
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

// 弹层右上角关闭按钮事件，关闭当前显示的弹层和蒙层
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
function ltjxNavqih(){
  $('.lx_jx_sx_ul>li').click(function(){
    var this_index=$(this).index();
    $('.lx_jx_pro_ul').hide();
    $('.lx_jx_pro_ul').eq(this_index).show();
    $(this).addClass('lx_jx_sx_select').siblings().removeClass('lx_jx_sx_select');
  })
}
ltjxNavqih();

// 顶部广告编辑
$('.bjDiv').click(function(){
  var tc_tit=$(this).attr('data-id');
  $('.tc_tit').text(tc_tit);
  $('.menmeiDiv,.mc').show();
})

$('.menmenDiv_saveBtn,.menmenDiv_cancelBtn').click(function(){
  $('.menmeiDiv,.mc').hide();
})
// 选择商品按钮隐藏
$('.ProLink').click(function(){
  $(this).parents('.linkUl').next().children().eq(1).hide();
})
// 选择商品按钮显示
$('.ProSel').click(function(){
  $(this).parents('.linkUl').next().children().eq(1).show();
})
$('.linkInputClear').click(function(){
  $(this).siblings().first().val('');
})

//清空本弹层内的数据
$('.clearMenmeiAll').click(function(){
  $(this).parents('.tcDiv').children().find('.ADTit,.linkInput').val('');
  // $('.ADTit,.linkInput').val('');
  $(this).parents('.tcDiv').children().find('#menmeiDingS,#menmeiArea,#menmeiLoak').removeAttr('checked');
})

//快捷导航弹层出现.
$('.bjDiv1').click(function(){
  $('.fastNavDiv,.mc').show();
})
//快捷导航弹层关闭
$('.fastNavDiv_saveBtn,.fastNavDiv_cancelBtn').click(function(){
  $('.fastNavDiv,.mc').hide();
})
$('.closeLi1').click(function(){
  $(this).parent().parent().remove();
})

// 联通精选二级导航添加按钮
$('.lxjxNavAddDiv').click(function(){
  $(this).parent().append('<li>二级标题</li>');
  $('.lx_jx_sx_ul').delegate('li','mouseover',function(){
    $(this).addClass('editeTxt').attr('title','双击可编辑');
    editeTxtFun();
    ltjxNavqih()
  })
  $(this).remove();
})


// 联通精选li的操作按钮浮层
var ltjxCz='';
ltjxCz+='<div class="ProMc"></div><div class="AdPro"><ul class="cz_btnUl">';
ltjxCz+='<li class="bjDiv2"><img src="images/backStage/bjIcon.png" class="cz_btnIcon">';
ltjxCz+='<span>编辑</span></li><li class="delLi">';
ltjxCz+='<img src="images/backStage/delIcon4.png" class="xuanchuanIcon cz_btnIcon">';
ltjxCz+='<span>删除</span></li></ul></div>';

// 浮层加到li上
$('.lx_jx_pro_ul>li').each(function(){
  $(this).prepend(ltjxCz);
})

//联通精选编辑按钮事件
$('.bjDiv2').click(function(){
  alert(1);
})


// 各个区域的备份、发布按钮
var bffbObj='';
bffbObj+='<div class="bfFbDiv4"><div class="bfDiv fl czDiv">';
bffbObj+='<img src="images/backStage/beifen1_icon.png" class="czIcon1"><span>备份</span></div>';
bffbObj+='<div class="bfjlDiv fl czDiv"><img src="images/backStage/beifenjilu1_icon.png" class="czIcon1">';
bffbObj+='<span>备份记录</span></div></div><div class="bfFbDiv3"><div class="fbDiv fl czDiv">';
bffbObj+='<img src="images/backStage/fabuIcon.png" class="czIcon1"><span>发布</span></div>';
bffbObj+='<div class="bfDiv fl czDiv"><img src="images/backStage/delIcon4.png" class="czIcon1">';
bffbObj+='<span>删除</span></div></div>';

$('.ltjxWarp,.mobileNumber_div,.G4_div,.broadband_div,.traffic_div,.phoneAccessories,#InternetCard,#lifeService').each(function(){
  $(this).prepend(bffbObj);
})
$('.phoneAccessories,#InternetCard,#lifeService').each(function(){
  $(this).children().eq(0).css('top','0px');
  $(this).children().eq(1).css('top','0px');
})


$('.floor_tit3_div div').click(function(){

  if($(this).next().hasClass('floor_tit3_fg')){
    $(this).next().remove();
  }else{
    $(this).prev().remove();
  }

  var widthF=0;
  for(var fi=0;fi<$(this).siblings().length;fi++){
    var this_width=$(this).siblings().eq(fi).width();
    widthF+=this_width;
  }
  widthF+=($(this).siblings().length+1)*20-10;
  $(this).remove();

  alert(widthF);
})
