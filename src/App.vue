<script setup lang="ts">
import CurrentlyPlaying from "./components/CurrentlyPlaying.vue";
import TopSongs from "./components/TopTracks.vue";
import TopArtists from "./components/TopArtists.vue";
import TopAlbums from "./components/TopAlbums.vue";
</script>

<template>
    <div class="app-container transition">
        <div class="info-container">
            <div class="info">
                <CurrentlyPlaying />
            </div>
        </div>
        <div class="list-containers">
            <div class="list-container">
                <TopArtists />
            </div>
            <div class="list-container">
                <TopSongs />
            </div>
            <div class="list-container">
                <TopAlbums />
            </div>
        </div>
    </div>
</template>

<style scoped>
.app-container {
    width: 100%;
    height: 100%;

    color: var(--vibrant-text);
    background-color: var(--vibrant-bg);
    overflow-y: auto;
}

.info-container,
.list-containers {
    padding: 48px;
    box-sizing: border-box;
}

.info-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.info {
    max-width: 65%;
    min-width: 650px;
}

.list-containers {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 48px;
    justify-content: center;
}

.list-container {
    display: flex;
    white-space: nowrap;
}
</style>
