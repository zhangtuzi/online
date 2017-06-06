
var time_start = new Date("2017/06/09 18:37:00").getTime();//设定活动开始时间
var time_now = new Date().getTime(); //获取当前时间
//计算时间差
var time_distance =parseInt((time_start-time_now)/1000);
SetRemainTime(time_distance);
//将时间减去1秒，计算天、时、分、秒
function SetRemainTime(SysSecond) {
	var InterValObj =setInterval(function(){
		if (SysSecond > 0) {
	 	SysSecond = SysSecond - 1;
	 	var second = Math.floor(SysSecond % 60);             // 计算秒
	 	var minite = Math.floor((SysSecond / 60) % 60);      //计算分
	 	var hour = Math.floor((SysSecond / 3600) % 24);      //计算小时
	 	var day = Math.floor((SysSecond / 3600) / 24);        //计算天
		if(day>0){
			hour=hour+24*day;
		}
	 	if(second<10){
	 		second='0'+second;
	 	}
	 	if(minite<10){
	 		minite='0'+minite;
	 	}
	 	if(hour<10){
	 		hour='0'+hour;
	 	}
	 	$(".countDown_h").text(hour);//将计算的小时数写入页面
	 	$(".countDown_m").text(minite);//将计算的分钟数写入页面
	 	$(".countDown_s").text(second);//将计算的秒数写入页面
	} else {//剩余时间小于或等于0的时候，就停止倒计时定时器
	 	 clearInterval(InterValObj);
	 	 $(".countDown_h").text('00');
	 		$(".countDown_m").text('00');
	 		$(".countDown_s").text('00');
	  }
	},1000)

}
