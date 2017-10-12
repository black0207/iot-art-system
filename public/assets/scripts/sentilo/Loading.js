/**
 * Created by dongxin on 2016-09-23.
 */

function loadingAnimation(){
    $(document).ready(function(){
        $('body').append('<div id="loadingAnimation"></div>');
        $('#loadingAnimation').css({
            width:'1900px',
            height:document.body.clientHeight,
            backgroundColor:'black',
            opacity:'0.5',
            z:999999,
            textAlign:'center',
            marginTop:-(document.body.clientHeight),
            marginLeft:'auto',
            marginRight:'auto',
            marginBottom:'auto'
        });

        $('body').append('<div id="loadingAnimationDiv"></div>');
        $('#loadingAnimationDiv').css({
            width:'200px',
            height:'200px',
            //backgroundColor:'red',
            //z:99999999,
            textAlign:'center',
            marginTop:-(document.body.clientHeight-400),
            marginLeft:'50%'
            //position:'absolute'
        });

        $('#loadingAnimationDiv').shCircleLoader({
            duration: 0.8,
            color:'white'
        });
    });
}

function loadingHiden(){
    $('#loadingAnimation').remove();
    $('#loadingAnimationDiv').remove();
}
