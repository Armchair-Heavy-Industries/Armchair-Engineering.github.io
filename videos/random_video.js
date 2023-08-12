var videos = ["bedspin", "printing", "vasing_big", "vasing_small", "throw1", "throw2"];

window.addEventListener("DOMContentLoaded", function () {
  var videoTag = document.getElementById("prexz");

  videoTag.addEventListener("click", (e) => e.preventDefault());

  function createSource(video, mimetype) {
    var source = document.createElement("source");
    source.src = video;
    source.mimetype = mimetype;
    return source;
  }

  function randomVideo() {
    var video = videos[Math.floor(Math.random() * videos.length)];

    videoTag.src = "videos/" + video + ".webm";
  }
  videoTag.addEventListener("ended", randomVideo);
  randomVideo();
});
