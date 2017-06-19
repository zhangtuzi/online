// 左侧模块选择内添加滚动条
jsScroll(document.getElementById('jcMubanDiv'), 5, 'divScrollBar');
jsScroll(document.getElementById('Add_MubanDiv'), 5, 'divScrollBar1');

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
  jsScroll(document.getElementById('Add_MubanDiv1'), 5, 'divScrollBar2');
  $('.divScrollBar1').hide();
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
 start:function(){
   console.log($(this).parents().find('.movePar'))
   $(this).parent().find('.movePar').css('overflow','visible');
 },
 stop:function(){
   $(this).parent().find('.movePar').css('overflow','hidden');
 }
});
