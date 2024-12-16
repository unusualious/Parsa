<template>
    <div ref="player" class="clappr-video-container"></div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from "vue";
  import Clappr from "clappr";
  
  const playerElement = ref(null);
  let player = null;
  
  const videoSrc = ref("https://path/to/your/hls/stream.m3u8");
  
  onMounted(() => {
    player = new Clappr.Player({
      source: videoSrc.value,
      width: '100%',
      height: '100%',
      autoPlay: false,
      parentId: playerElement.value,
      carplay: true,
      playbackNotSupported: function() {
        // Custom event handling for unsupported playback
        console.warn("Playback not supported!");
      },
    });
  });
  
  onBeforeUnmount(() => {
    if (player) {
      player.destroy();
    }
  });
  </script>
  
  <style>
  .clappr-video-container {
    width: 100%;
    height: 65vh; /* Or any height you prefer */
    background-color: #000; /* Optional: add a black background */
  }
  </style>