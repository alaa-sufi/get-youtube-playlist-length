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
  $(".info").css("display", "none");

   $(".getlength .spinner").css("display","inline");
  playlist = $(".input").val();
  $(".input").val("");
  //solve problem https or without
  if (/youtube.com|list/.test(playlist)) {
    playlistId=playlist.match(/(?<=list=).{34}/)[0];
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
            var videosDuration = eval(arrVideoDuration.map(x=>x.slice(2).replace("S","").replace("M","*60+").replace("H","*3600+")).join("+").replace(/\+{2}/,"+").replace(/\+$/,""));

              h=at=>Math.floor(videosDuration / at / 3600);
              m=at=>Math.floor(((videosDuration / at) % 3600) / 60);
              s=at=>Math.floor(((videosDuration / at) % 3600) % 60);          

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
              $(".info").css("display", "flex");
              // $(".getlength").removeClass("getlength");
              // $("#tryagain").addClass("tryagain");
              $(".error h3").hide();
              // $(".input").attr("disabled", "disabled");
              videosDuration=0;
              arrVideoId = [],
              arrVideoDuration = [];
              playlistId="";
              str = "",
              playlist="";
            }
          
        );
      }
    ).fail(function () {
      $(".error h3").text("please enter a correct playlist link ");
      $(".getlength .spinner").css("display","none");
      // $(".getlength").removeClass("getlength");
      $("#tryagain").addClass("tryagain");
      // $(".input").attr("disabled", "disabled");
    });
    ////
  } else {
    $(".error h3").text(
      "please enter a playlist link like www.youtube.com/playlist?list=id"
    );
          $(".getlength .spinner").css("display","none");
    // $(".getlength").removeClass("getlength");
    // $("#tryagain").addClass("tryagain");
    // $(".input").attr("disabled", "disabled");
  }
});
//click getlength in enter
$(".input").keydown(function (e) {
  if (e.keyCode == 13) {
    $(".getlength").click();
  }
});
// $("#tryagain").on("click", function () {
//   location.reload();
// });
//make div of info same height
$(".info > div").outerHeight("250px");
//var t=$(".info .pr").attr("height");
//console.log(t);