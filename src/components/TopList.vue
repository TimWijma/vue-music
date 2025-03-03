<script setup lang="ts">
import { Record } from "../scripts/Records";
import TopRecord from "./TopRecord.vue";

defineProps<{
    title: string;
    records: Record[];
}>();
</script>

<template>
    <div class="top-records transition">
        <div class="top-records-title">
            <h2>Top Albums</h2>
            <span>Last 30 days</span>
        </div>
        <div class="records-container">
            <div v-for="record in records" :key="record.rank">
                <TopRecord :record="record" />
            </div>
        </div>
    </div>
</template>
