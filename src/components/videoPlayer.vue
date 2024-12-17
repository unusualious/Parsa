<template>
  <div class="video-container">
    <video ref="videoPlayer" class="plyr" playsinline controls></video>
      <!-- Multi-quality sources -->
      <source src="../assets/hls.m3u8"  label="720p" />
      <source src="../assets/hls.m3u8"  label="480p" />
      <source src="../assets/hls.m3u8"  label="360p" />

      <!-- Subtitles -->
      <track kind="subtitles" label="English" src="/path-to-captions.vtt" srclang="en" default />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import Hls from "hls.js"; // Import Hls.js for HLS playback

const videoPlayer = ref(null);
let player = null;

onMounted(() => {
  const videoSrc = "/hls.m3u8"; // Place 'hls.m3u8' in the 'public' folder
  
  if (Hls.isSupported()) {
    // Initialize Hls.js and attach to video element
    const hls = new Hls();
    hls.loadSource(videoSrc);
    hls.attachMedia(videoPlayer.value);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      // Initialize Plyr only after HLS is ready
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

      // Start playback automatically
      player.play();
    });
  } else if (videoPlayer.value.canPlayType("application/vnd.apple.mpegurl")) {
    // Safari fallback for native HLS support
    videoPlayer.value.src = videoSrc;
    player = new Plyr(videoPlayer.value);
    player.play();
  }
});

onBeforeUnmount(() => {
  // Clean up Plyr instance
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
