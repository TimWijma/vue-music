<script setup lang="ts">
import { Track } from "../scripts/Track";

defineProps<{
    track: Track;
}>();
</script>

<template>
    <div class="container">
        <span class="track-rank">{{ track.rank }}</span>
        <img :src="track.image" class="track-cover" alt="Cover" />
        <div class="track-info">
            <span class="track-title">{{ track.name }}</span>
            <span class="track-artist">{{ track.artist }}</span>
            <!-- <span class="track-playcount">{{ track.playcount }} plays</span> -->
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    align-items: center;
    padding: 8px 8px 8px 0;
    border-radius: 30px;
}

.track-rank {
    font-weight: bold;
    font-size: 1.75rem;
    margin-right: 12px;
}

.track-cover {
    width: 75px;
    height: auto;

    border-radius: 8px;
}

.track-info {
    display: flex;
    flex-direction: column;
    margin-left: 8px;
}

.track-info span {
    white-space: nowrap;
}

.track-title {
    font-weight: bold;
    font-size: 1.5rem;
}

.track-artist {
    font-size: 1.25rem;
}
</style>
