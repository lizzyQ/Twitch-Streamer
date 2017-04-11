$(document).ready(function(){
  var list = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "dddhuuhbgm", "RobotCaleb", "noobs2ninjas"];

  $.each(list, function(index,name){
        var type=["channels/","users/","streams/"];
           $.each(type, function(i, val){
                asy(name,val);
           });
  });
 });// ducument ready over

function asy(name,val){
   $.ajax({
            type:'GET',
            url: 'https://wind-bow.gomix.me/twitch-api/'+ val + name,
            dataType: 'jsonp',
            success: processData
    });
    function processData(obj){
         var html = "";
         var aHref, liClss, imgSrc, title, descript, spanClss;

          if(obj.partner == false ){
               //extra offline data from val == channels
               title = obj.display_name;
               imgSrc = obj.logo;
               aHref = obj.url;
               liClss = "warning";
               spanClss = "alert";
               descript = "Offline";
            }else if(val!== "channels/" && obj.status == 404){
              // the user does not existed
              aHref ="javascript:void(0);";
              title = name;
              imgSrc = "http://pre06.deviantart.net/1a10/th/pre/f/2015/291/5/1/logo_twitch_iosversion_by_akiruuu-d9djk9s.png";
              descript = obj.message;
              liClss = "danger";
              spanClss = "remove";
             }else{
               //online users
               title = obj.stream.channel.display_name;
               imgSrc = obj.stream.channel.logo;
               id = obj.stream.channel._id;
               aHref =  obj.stream.channel.url;
               liClss = "info";
               spanClss = "refresh";
               descript = obj.stream.channel.game;
          }

          
     html += "<a target='_blank' href='" + aHref + "'>";
     html += "<li class='list-group-item list-group-item-" + liClss + "'>";
     html += "<img class='avatar' alt='user_logo' src='"+ imgSrc +"'/>";
     html += "<dl class='con-box'> <dt>" + title;
     html += "</dt> <dd>" + descript;
     html += "</dd></dl> <span class='glyphicon glyphicon-"+ spanClss;
     html += "'></span></li></a>";
    
     $(".list-group").append(html);

    }//processData Over
}//asy function Over


$(document).ajaxComplete(function(){

   $("#online").on("click", function(){
      $("#all, #offline").parent().removeClass("active");
      $("#online").parent().addClass("active");
      $(".list-group-item-info").show();
      $(".list-group-item-warning, .list-group-item-danger").hide();
   });
  $("#offline").on("click", function(){
      $("#all, #online").parent().removeClass("active");
      $("#offline").parent().addClass("active");
      $(".list-group-item-info, .list-group-item-danger").hide();
      $(".list-group-item-warning").show();
   });
  $("#all").on("click", function(){
      $("#offline, #online").parent().removeClass("active");
      $("#all").parent().addClass("active");
      $(".list-group-item-info").show();
      $(".list-group-item-warning, .list-group-item-danger").show();
   });
});
