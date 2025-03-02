<script setup lang="ts">
import { Record } from "../scripts/Records";

defineProps<{
    record: Record;
}>();
</script>

<template>
    <div class="container">
        <span class="record-rank">{{ record.rank }}</span>
        <img :src="record.image" class="rank-cover" alt="Cover" />
        <div class="rank-info">
            <span class="rank-title">{{ record.name }}</span>
            <span v-if="record.artist" class="rank-artist">{{
                record.artist
            }}</span>
            <span class="rank-playcount">{{ record.playcount }} plays</span>
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

.record-rank {
    font-weight: bold;
    font-size: 1.75rem;
    margin-right: 12px;
    width: 16px;
    min-width: 16px;
    flex-shrink: 0;
    text-align: center;
}

.rank-cover {
    width: 75px;
    height: 75px;
    object-fit: cover;

    border-radius: 8px;
}

.rank-info {
    display: flex;
    flex-direction: column;
    margin-left: 8px;
    overflow: hidden;
}

.rank-info span {
    /* white-space: nowrap; */
}

.rank-title {
    font-weight: bold;
    font-size: 1.5rem;
}

.rank-artist {
    font-size: 1.25rem;
}
</style>
