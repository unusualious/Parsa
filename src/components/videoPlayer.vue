<template>
  <div class="video-container">
    <video ref="videoPlayer" class="plyr" playsinline controls>
      <!-- Multi-quality sources -->
      <source src="../assets/hls.m3u8"  label="720p" />
      <source src="../assets/hls.m3u8"  label="480p" />
      <source src="../assets/hls.m3u8"  label="360p" />

      <!-- Subtitles -->
      <track kind="subtitles" label="English" src="/path-to-captions.vtt" srclang="en" default />
    </video>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import Hls from "hls.js"; // Import hls.js  

const videoPlayer = ref(null);
let player = null;

onMounted(() => {
  // Initialize Plyr with quality options
  player = new Plyr(videoPlayer.value, {
    controls: [
      "play-large",
      "play",
      "progress",
      "current-time",
      "duration",
      "mute",
      "volume",
      "captions",
      "settings",
      "fullscreen",
    ],
    settings: ["quality", "speed", "captions"],
    quality: {
      default: 720, // Default quality
      options: [720, 480, 360], // Available qualities
      forced: true, // Force Plyr to use these quality options
      onChange: (quality) => {
        // Handle quality change
        const sources = videoPlayer.value.querySelectorAll("source");
        sources.forEach((source) => {
          if (parseInt(source.getAttribute("label")) === parseInt(quality)) {
            videoPlayer.value.src = source.getAttribute("src");
            videoPlayer.value.load();
          }
        });
      },
    },
  });
  
  if (Hls.isSupported()) {  
    const hls = new Hls();  
    const videoSrc = "../assets/hls.m3u8"; // Your HLS stream URL  

    hls.loadSource(videoSrc);  
    hls.attachMedia(videoPlayer.value);  
    hls.on(Hls.Events.MANIFEST_PARSED, () => {  
      player.play(); // Start playing once the manifest is parsed  
    });  
  } else if (videoPlayer.value.canPlayType("application/vnd.apple.mpegurl")) {  
    // For Safari support  
    videoPlayer.value.src = "../assets/hls.m3u8";  
    player.play();  
  } 
});

onBeforeUnmount(() => {
  if (player) {
    player.destroy();
  }
});
</script>

<style>
.video-container {
  width: 100%;
  height: 65vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
}

/* Plyr Custom Theme */
:root {
  --plyr-color-main: #ab070f; /* Custom color for progress bar and controls */
}

.plyr {
  width: 100%;
  height: 100%;
}
.plyr__menu__container .plyr__control>span{
  color: #333;
}
/* Additional Custom Styling */
.plyr__control {
  color: white !important; /* Button text color */
}
</style>
