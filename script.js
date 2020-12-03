//slide ax list
$(".cog").click(function () {
  $(".at").slideToggle();
});
//change class for ax
$(".pr .at li ").on("click", function () {
  $(`.result p[class="${$(this).attr("data-class")}"]`)
    .addClass("active")
    .siblings()
    .removeClass("active");
  $(this).addClass("active").siblings().removeClass("active");
  $(".at").slideToggle();
});
//button get length

var arrVideoId = [],
  arrVideoDuration = [],
  playlistId,
  str = "",
  playlist;
//get lenght in click or en
$(".getlength").on("click", function () {
  //solve problem https or without
   $(".getlength .spinner").css("display","inline");
  playlist = $(".input").val();
  $(".input").val("");

  if (playlist.includes("youtube.com") | playlist.includes("list")) {
    var la = playlist.search("list=") + 5;
    playlistId = playlist.slice(la, la + 34);
    //console.log(playlistId);

    ////
    //remove class getlength and some css

    $.getJSON(
      `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=AIzaSyBXQrcABeFrIn2Pn90UfMflUpOaba9Nz2o`,
      function (data) {
        //   get array for all video id
        for (var i in data.items) {
          arrVideoId[i] = data.items[i].snippet.resourceId.videoId;
          str += arrVideoId[i] + ",";
        }
        $(".img .imgplaylist").attr(
          "src",
          data.items[0].snippet.thumbnails.medium.url
        );
        //get duration for all video

        $.getJSON(
          `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${str.slice(
            0,
            -1
          )}&key=AIzaSyBexkgfhsgnZPymcO2vdvfQoOhil1kBWkU`,
          function (d) {
            //i use c instead of i because i still always (last i)
            for (var l in d.items) {
              arrVideoDuration[l] = d.items[l].contentDetails.duration;
            }
            var res = new Array();
            for (var z in arrVideoDuration) {
              res[z] = arrVideoDuration[z]
                .slice(2)
                .replace("S", "*1")
                .replace("M", "*60b")
                .replace("H", "*3600b");
            }
              //remove PT and s=>*1  m=>*60 h=>*3600 and add b instead of + to resolve problem ++
              var res2 = res.toString().replace(/[,]/g, "a");
              var res3 = res2.replace(/ba/g, "b");
              var res4 = res3.replace(/b|a/g, "+");
              var res5;
              //solve +in the end
              if (res4.charAt(res4.length - 1) == "+") {
                res5 = res4.slice(0, -1);
              } else { res5 = res4;}
              var res6 = eval(res5);

              function h(at) {
                var h = Math.floor(res6 / at / 3600);
                return h;
              }
              function m(at) {
                var m = Math.floor(((res6 / at) % 3600) / 60);
                return m;
              }
              function s(at) {
                var s = Math.floor(((res6 / at) % 3600) % 60);
                return s;
              }
            

              $(".at100").text(
                `${h(1)} hours, ${m(1)} minutes, ${s(1)} seconds`
              );
              $(".at125").text(
                `${h(1.25)} hours, ${m(1.25)} minutes, ${s(1.25)} seconds`
              );
              $(".at150").text(
                `${h(1.50)} hours, ${m(1.50)} minutes, ${s(1.50)} seconds`
              );
              $(".at175").text(
                `${h(1.75)} hours, ${m(1.75)} minutes, ${s(1.75)} seconds`
              );
              $(".at200").text(
                `${h(2)} hours, ${m(2)} minutes, ${s(2)} seconds`
              );
              //$(".avg").text(`${havg} hours, ${mavg} minutes, ${savg} seconds`);
      $(".getlength .spinner").css("display","none");
              $(".num").text(arrVideoId.length + " videos");
              $(".info").delay(1000).css("visibility", "visible");
              $(".getlength").removeClass("getlength");
              $("#tryagain").addClass("tryagain");
              $(".error h3").hide();
              $(".input").attr("disabled", "disabled");
            }
          
        );
      }
    ).fail(function () {
      $(".error h3").text("please enter a correct playlist link ");
      $(".getlength .spinner").css("display","none");
      $(".getlength").removeClass("getlength");
      $("#tryagain").addClass("tryagain");
      $(".input").attr("disabled", "disabled");
    });
    ////
  } else {
    $(".error h3").text(
      "please enter a playlist link like www.youtube.com/playlist?list=id"
    );
          $(".getlength .spinner").css("display","none");
    $(".getlength").removeClass("getlength");
    $("#tryagain").addClass("tryagain");
    $(".input").attr("disabled", "disabled");
  }
});
//click getlength in enter
$(".input").keydown(function (e) {
  if (e.keyCode == 13) {
    $(".getlength").click();
  }
});
$("#tryagain").on("click", function () {
  location.reload();
});
//make div of info same height
$(".info > div").outerHeight("250px");
//var t=$(".info .pr").attr("height");
//console.log(t);