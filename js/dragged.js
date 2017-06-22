
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

// 联通精选整块拖动放置
$('.ltjxDrop').droppable({
  hoverClass: 'moveArea',//拖拽模块移入放置区域时添加样式
  greedy:true,//禁止父级接收拖拽目标
  //拖拽模块移入放置区域时选择提示语
  over:function(event,ui){
    var source = ui.draggable.clone();
    var dropId=$(this).attr('data-id');//获取目标区域的id为标识
    if($(ui.draggable).hasClass(''+dropId+'')){//如果放置区域含有标识，则可以提示可以放置
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
       //  var source = ui.draggable.next().clone().css('display','block');
       var source = ui.draggable.next().clone().html();
       $('.lx_jx_pro_ul').eq($('.lx_jx_sx_select').index()).html(source);
       $('.moveBg,.moveTip1,.moveTip2').remove();
       ltjxLi();//联通精选小模块的拖拽再次加载一次
    }else{//不能放置则将提示语清空
      $('.moveBg,.moveTip1,.moveTip2').remove();
    }
 }
})

ltjxLi();//联通精选小模块拖拽运行
function ltjxLi(){
  // 联通精选小模块拖动放置
  $('.lx_jx_pro_ul>li,.mubanKJ').droppable({
    hoverClass: 'moveArea',//拖拽模块移入放置区域时添加样式
    greedy:true,//禁止父级接收拖拽目标
    //拖拽模块移入放置区域时选择提示语
    over:function(event,ui){
      var source = ui.draggable.clone();
      var dropId=$(this).attr('data-id');//获取目标区域的id为标识
      if($(ui.draggable).hasClass(''+dropId+'')){//如果放置区域含有标识，则可以提示可以放置
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
         //  var source = ui.draggable.next().clone().css('display','block');
         var source = ui.draggable.clone();
         $(this).html(source);
         $('.moveBg,.moveTip1,.moveTip2').remove();
      }else{//不能放置则将提示语清空
        $('.moveBg,.moveTip1,.moveTip2').remove();
      }
   }
  })
}
