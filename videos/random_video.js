var videos = ["bedspin", "printing", "vasing_big", "vasing_small", "throw1", "throw2", "2023-05-04_00-09-20", "2023-06-08_23-30-36", "PXL_20230706_175035756", "PXL_20240118_141605700.TS1", "leddy"];

window.addEventListener("DOMContentLoaded", function () {
  var videoTag = document.getElementById("prexz");

  videoTag.addEventListener("click", (e) => e.preventDefault());

  function createSource(video, mimetype) {
    var source = document.createElement("source");
    source.src = video;
    source.type = mimetype;
    return source;
  }

  function randomVideo() {
    var video = videos[Math.floor(Math.random() * videos.length)];


    videoTag.innerHTML = '';
    

    var webmSource = createSource(`videos/${video}.webm`, 'video/webm');
    var mp4Source = createSource(`videos/${video}.mp4`, 'video/mp4');
    var gifSource = createSource(`videos/${video}.gif`, 'video/gif');
    

    videoTag.appendChild(webmSource);
    videoTag.appendChild(mp4Source);
    videoTag.appendChild(gifSource);
    
    videoTag.load(); // Important to reload the video tag to apply new sources
  }
  videoTag.addEventListener("ended", randomVideo);
  randomVideo();
});
