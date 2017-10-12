/**
 * Created by dongxin on 2016-10-31.
 */

(function initLeakageAnalysis(){

    $(document).ready(function(){

        $('#lsfx_right_b_d_g').css('height','111px');

        //initLeakageClickAction();

        leakageLocationData('/rest/sentiloSpecialApp/queryWaterMeterRecord');

    });

})();

function returnleakageLocation(data){

    //console.log('专题应用---智慧水务---漏损定位'+data.alarmList);

    var alarmList = {};
    for(var i = 0;i<data.alarmList.length;i++){
        var name = data.alarmList[i].id+'';
        alarmList[name] = data.alarmList[i];

    }

    initLeakageClickAction(data.alarmList);

    //initLeakageClickAction(alarmList);

}

function initLeakageClickAction(data){

    var title1 = ["5","41","36","40","10","34","42","7","17","14","38","43","30","32","19","21","13","26","25","1","2","3","4","8","6","35","39","9","29","33","31","11","12","27","23","24","22","20","18","28","16","15","37"];
    var title2 = ["51290968","51290967","51290974","51290970","51290971","51290969","51290978","51290973","51290975","51290972","51290977","51290965","51290963","51290979","51290964","51290966","51110327","51110326","51110325"];
    var leakage = {};
    for(var i = 0;i<data.length;i++){
        leakage[data[i].componentCode] = data[i];
    }

    for(var i =0;i<$('.lsfx_right_b a').length;i++){
        if($('.lsfx_right_b a').eq(i).attr('id') == 'high' ){

            //高
            $("#lsfx_right_b_a_b a").click(function(){
                $(".yzlstck").show();
                //图片拖拽
                dragable('yzlstck');
                for(var i in document.images){
                    document.images[i].ondragstart = imgdragstart;
                }
                $(".zdlstck").hide();
                $(".qwlstck").hide();
            });
            $(".yzlstck_a_right").click(function(){
                $(".yzlstck").hide();
            });

        }else if($('.lsfx_right_b a').eq(i).attr('id') == 'middle' ){

            //中
            $("#lsfx_right_b_d_c a").click(function(){
                $(".zdlstck").show();
                //图片拖拽
                dragable('zdlstck');
                for(var i in document.images){
                    document.images[i].ondragstart = imgdragstart;
                }

                $(".yzlstck").hide();
                $(".qwlstck").hide();
            });
            $(".zdlstck_a_right").click(function(){
                $(".zdlstck").hide();
            });

        }else if($('.lsfx_right_b a').eq(i).attr('id') == 'low' ){

            //低
            $("#lsfx_right_b_d_g a").click(function(){
                $(".qwlstck").show();
                //图片拖拽
                dragable('qwlstck');
                for(var i in document.images){
                    document.images[i].ondragstart = imgdragstart;
                }

                $(".zdlstck").hide();
                $(".yzlstck").hide();
            });
            $(".qwlstck_a_right").click(function(){
                $(".qwlstck").hide();
            });

        }else{
            //$('.lsfx_right_b a').eq(i).attr({
            //    'id' : leakage[$('.lsfx_right_b a').eq(i).attr('id')]
            //});
            $('.lsfx_right_b a').eq(i).mouseenter(function(){
                //leakageClick(this,data[$(this).attr('id')+'']);
                //leakageClick(this,data[parseInt($(this).attr('id'))-1]);
                leakageClick(this,leakage[$(this).attr('id')+'']);
            });

            $('.lsfx_right_b a').eq(i).mouseleave(function(){
                $(".sbtck").hide();
            });
        }
    }

}

function leakageClick(event,data){

    //console.log(event.id);

    var timeString1 = '--.--.--';
    var timeString2 = '--:--:--';
    if(data){
        if(data.recordTime){
            timeString1 = (new Date(data.recordTime)).getFullYear()+'.'+getNewNum((new Date(data.recordTime)).getMonth()+1)+'.'+getNewNum((new Date(data.recordTime)).getDate());
            timeString2 = getNewNum((new Date(data.recordTime)).getHours())+':'+getNewNum((new Date(data.recordTime)).getMinutes())+':'+getNewNum((new Date(data.recordTime)).getSeconds());

        }
    }

    var liuliang = '---';
    if(data){
        if(data.observation){
            liuliang = data.observation.toFixed(1);
        }
    }

    var idString = '---';
    if(data){
        if(data.componentId){
            idString = data.componentId;
        }
    }

    var halfData = '---';
    if(data){
        if(data.halfData != null){
            halfData = data.halfData.toFixed(1);
        }
    }


    $(".sbtck").show();

    //设备编号
    $(".sbtck").children().children().eq(0).children().eq(1).html(idString);
    //半日流量
    $(".sbtck").children().children().eq(1).children().eq(1).html(halfData+'m³');
    //累计流量
    $(".sbtck").children().children().eq(2).children().eq(1).html(liuliang+'m³');
    //更新时间
    $(".sbtck").children().children().eq(3).children().eq(1).html(timeString1);
    $(".sbtck").children().children().eq(4).children().eq(1).html(timeString2);

    var width = parseInt($(".sbtck").css('width'));
    var height = parseInt($(".sbtck").css('height'));

    if(event.offsetTop-height-parseInt($(event).css('height'))>0&&event.offsetLeft-(width/2)>0){
        $(".sbtck").css({
            left:(event.offsetLeft-(width/2)),
            top:(event.offsetTop-height-parseInt($(event).css('height')))

        });
    }else if(event.offsetTop-height-parseInt($(event).css('height'))<=0&&event.offsetLeft-(width/2)>0){
        $(".sbtck").css({
            left:(event.offsetLeft-(width/2)),
            top:(event.offsetTop+parseInt($(event).css('height')))

        });
    }else if(event.offsetTop-height-parseInt($(event).css('height'))>0&&event.offsetLeft-(width/2)<=0){
        $(".sbtck").css({
            left:(event.offsetLeft),
            top:(event.offsetTop-height-parseInt($(event).css('height')))

        });
    }else{
        $(".sbtck").css({
            left:(event.offsetLeft),
            top:(event.offsetTop+parseInt($(event).css('height')))

        });
    }

}

function dragable(id){
    var d=document;
    var o=d.getElementsByClassName(id)[0];
    var s=o.style;
    var x;
    var y;
//        var p='onmousemove';
    o.onmousedown = function(e){
        e = e || event;
        x = e.clientX - o.offsetLeft;
        y = e.clientY - o.offsetTop;
        d.onmousemove = function(e){
            e = e || event;
            s.left = e.clientX - x +'px';
            s.top= e.clientY - y +'px'
        };
        d.onmouseup = function(){
            d.onmousemove=null;
        }
    }
}

function imgdragstart(){
    return false;
}

function getNewNum(num){
    return num>9?num:'0'+num;
}


