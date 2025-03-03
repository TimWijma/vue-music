<script setup lang="ts">
import { Record } from "../scripts/Records";
import MarqueeComponent from "./MarqueeComponent.vue";

defineProps<{
    record: Record;
}>();
</script>

<template>
    <div class="container">
        <span class="record-rank">{{ record.rank }}</span>
        <img v-if="record.image" :src="record.image" class="record-cover" alt="Cover" />
        <span
            v-else
            style="
                min-width: 75px;
                height: 75px;
                border-radius: 8px;
                background-color: var(--vibrant-dark-bg);
            "
        ></span>
        <div class="record-info">
            <span class="record-name">
                <MarqueeComponent :text="record.name">
                    {{ record.name }}
                </MarqueeComponent>
            </span>
            <span v-if="record.artist" class="record-artist">{{ record.artist }}</span>
            <span class="record-playcount">{{ record.playcount }} plays</span>
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

.record-cover {
    width: 75px;
    height: 75px;
    object-fit: cover;

    border-radius: 8px;
}

.record-info {
    display: flex;
    flex-direction: column;
    margin-left: 8px;
    overflow: hidden;
}

.record-name {
    font-weight: bold;
    font-size: 1.5rem;
}

.record-artist {
    font-size: 1.25rem;
}
</style>
