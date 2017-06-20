// 左侧模块选择内添加滚动条
jsScroll(document.getElementById('jcMubanDiv'), 5, 'divScrollBar');
jsScroll(document.getElementById('Add_MubanDiv'), 5, 'divScrollBar1');
jsScroll(document.getElementById('Add_MubanDiv1'), 5, 'divScrollBar2');
$('#Add_MubanDiv1,.divScrollBar2').css('display','none');
// 联通精选--广告选择模板最右侧一列去掉右边距
$('.CardMbUl>li,.CardMbUl2>li').each(function(){
  if(($(this).index()+1)%3==0){
    $(this).css('margin-right','0');
  }
})

// 模块选择
$('.mukuaiUl>li').click(function(){
  var this_index=$(this).index();
  $('.mukuaiUl>li').removeClass('mukuaiLiSele');
  $(this).addClass('mukuaiLiSele');
  $('.mukuaiStyle').css('display','none').eq(this_index).css('display','block');
  switch (this_index) {
    case 0:
      $('#Add_MubanDiv,.divScrollBar1').css('display','block');
      $('#Add_MubanDiv1,.divScrollBar2').css('display','none');
      break;
    default:
      $('#Add_MubanDiv,.divScrollBar1').css('display','none');
      $('#Add_MubanDiv1,.divScrollBar2').css('display','block');
  }

})

// 广告类型选择
$('.AdStyle>li').click(function(){
  $('.AdStyle>li').removeClass('AdLiSele');
  $(this).addClass('AdLiSele');
})

// 模板模块拖动
//拖拽复制体
$('.mubanMove').draggable({
 helper:"clone",
 cursor: "move",
});

var Bg1='<div class="moveBg"><img src="images/backStage/bg_bk1.png" class="bg_bk1">';
  Bg1+='<img src="images/backStage/bg_bk2.png" class="bg_bk2">';
  Bg1+='<img src="images/backStage/bg_bk3.png" class="bg_bk3">';
  Bg1+='<img src="images/backStage/bg_bk4.png" class="bg_bk4">';
  Bg1+='</div><div class="moveTip1">松开鼠标，模块会放到这里</div>';

var Bg2='<div class="moveBg"><img src="images/backStage/bg_bk1.png" class="bg_bk1">';
  Bg2+='<img src="images/backStage/bg_bk2.png" class="bg_bk2">';
  Bg2+='<img src="images/backStage/bg_bk3.png" class="bg_bk3">';
  Bg2+='<img src="images/backStage/bg_bk4.png" class="bg_bk4">';
  Bg2+='</div><div class="moveTip2">此处不支持该模板</div>';


//拖拽放置
var moveFlag=true;//定义是否可以放置变量
$('.droppable').droppable({
  hoverClass: 'moveArea',//拖拽模块移入放置区域时添加样式
  //拖拽模块移入放置区域时选择提示语
  over:function(event,ui){
    var source = ui.draggable.clone();
    if($(this).hasClass('rqtjMove')){//如果放置区域含有标识，则可以提示可以放置
      $(this).append(Bg1);
      moveFlag=true;
    }else{
     $(this).append(Bg2);
     moveFlag=false;
    }
  },
  //拖拽模块移出放置区域时清空提示语
  out:function(){
    $('.moveBg,.moveTip1,.moveTip2').remove();
  },
  //拖拽模块在放置区域放置时
  drop:function(event,ui){
    //如果放置变量为true，则将放置区域清空，将拖拽模块放入
    if(moveFlag){
      $(this).children().remove();
       //  var source = ui.draggable.next().clone().css('display','block');
       var source = ui.draggable.clone();
        $(this).append(source);
    }else{//不能放置则将提示语清空
      $('.moveBg,.moveTip1,.moveTip2').remove();
    }
 }
})

//对于放置区域里面的元素进行代理
$('.droppable').delegate('','mouseover',function(e){
  //如果这个元素的class里面找到editeTxt，则加上mainContent1样式进行提示
  if($(e.target).parents().hasClass('droppable')&&$(e.target).hasClass('editeTxt')){
    $('.mainContent1').attr('contenteditable','false').removeClass('mainContent1');
    $(e.target).addClass('mainContent1');
  }
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
  console.log($(e.target))
  $('.mc').show();
})






//联通精选部分切换按钮
$('.lx_jx_sx_ul>li').click(function(){
  var this_index=$(this).index();
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
})
