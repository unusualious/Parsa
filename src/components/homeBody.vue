<template>        
        <!-- Video Player -->
        <section class="mb-4">
          <VideoPlayer />
        </section>
        
        <!-- Video Grid -->
        <section class="row g-3">
          <div
            v-for="video in videos"
            :key="video.id"
            class="col-12 col-md-4"
          >
            <div class="card">
              <img :src="video.thumbnail" class="card-img-top" alt="Thumbnail" />
              <div class="card-body">
                <h5 class="card-title">{{ video.title }}</h5>
                <p class="card-text">{{ video.channel }}</p>
              </div>
            </div>
          </div>
        <VideoPlayerII />
        </section>
</template>

<script setup>
import { ref } from "vue";

import VideoPlayer from "../components/VideoPlayer.vue";
import VideoPlayerII from "../components/videoPlayer2.vue";

const videos = ref([
  {
    id: 1,
    title: "Vue 3 Tutorial",
    channel: "Code Academy",
    thumbnail: "https://via.placeholder.com/300x150",
  },
  {
    id: 2,
    title: "Video.js Basics",
    channel: "Dev Tips",
    thumbnail: "https://via.placeholder.com/300x150",
  },
  {
    id: 3,
    title: "Bootstrap for Beginners",
    channel: "Web School",
    thumbnail: "https://via.placeholder.com/300x150",
  },
]);
</script>