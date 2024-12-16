<template>
  <div class="" dir="rtl">
          <TopMenu />
          

    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="movie-header d-flex justify-content-between">
            <div class="movie-header-right d-flex">
              <span class="movie-quality">
                <span class="bg-white text-red">1080</span>
                <span class="text-white">WebDL</span>
              </span>
              <h2 class="text-white px-3"> سریال El Camino</h2>
            </div>

            <div class="movie-header-left d-flex">
              <div class="rating text-white">
                4.5/10
                <img class="mx-3" width="50px" src="/src/assets/images/dd13889d40c3a4f8cc681c5d4b62a580.png" alt="">
              </div>
            </div>
          </div>
        </div>
      <div class="col-9">
        <VideoPlayer />
      </div>
        
      <div class="col-3">
        <aside class="text-white p-3 " style="width: 250px;">
          <div class="related-movies d-flex flex-column mb-3">
            <div v-for="movie in relatedMovies" :key="movie.Title" class="related-items d-flex mb-2">
              <div class="related-movie-img">
                <img :src="movie.Image" alt="">
              </div>
              <div class="related-movie-text d-flex flex-column mb-3 p-2">
                <h3>{{movie.Title}}</h3>
                <h6> {{ movie.Seasons }} </h6>
              <div>
                <span class="badge bg-primary">زیرنویس</span>
                <span class="badge bg-success">دوبله</span>
              </div>

              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import VideoPlayer from "../components/homeBody.vue";
import TopMenu from "../components/topMenu.vue";

const relatedMovies = [
{
  Image : "/src/assets/images/735a488cb9c0795bf7a6c00f8ba2380e.png",
  Title : "فیلم Love lies bleeding",
  Seasons: "فصل1",
  subtitle: true,
  dubble: true
},
{
  Image : "/src/assets/images/1788c72a991cca5740ac0e0e49efdc2d.png",
  Title : "فیلم El Camino",
  Seasons: "فصل1",
  subtitle: true,
  dubble: true
},
{
  Image : "/src/assets/images/4c8dfc759852e4bffe4b4243178413de.png",
  Title : "فیلم El Camino",
  Seasons: "فصل1",
  subtitle: true,
  dubble: true
},
{
  Image : "/src/assets/images/d3b96462b6196a2afcc16637ce4d4e6b.png",
  Title : "فیلم El Camino",
  Seasons: "فصل1",
  subtitle: true,
  dubble: true
}

]

</script>

<style>
body{
  background-color: #1b1c1f;
}
.movie-quality{
  background-color: #ab070f;
  padding: 5px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  width: 55px;
  text-align: center;
  font-size: 14px;
}
.related-movie-img{
  flex: 1 1 auto;
  max-width: 40%;
}
.related-movie-img img{
  width: 100%;
}
.related-movie-text h3{
  font-size: 16px;
}
.related-movie-text h6{
  font-size: 12px;
}
.related-movie-text badge{
  font-size: 12px;
}
/* Additional custom styles if needed */
</style>
