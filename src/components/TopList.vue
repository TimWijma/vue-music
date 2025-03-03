<script setup lang="ts">
import { ref } from "vue";
import { Record } from "../scripts/Records";
import TopRecord from "./TopRecord.vue";
import { Period } from "../scripts/Period.enum";

defineProps<{
    title: string;
    records: Record[];
}>();

const emit = defineEmits<{
    (event: "updateRecords", period: Period): void;
}>();

const periodLabels = {
    [Period.Week]: "Last week",
    [Period.Month]: "Last month",
    [Period.Quarter]: "Last 3 months",
    [Period.Half]: "Last 6 months",
    [Period.Year]: "Last year",
    [Period.All]: "All time",
};

const currentPeriod = ref<Period>(Period.Month);
const isOpen = ref(false);

const updateRecords = (period: Period) => {
    currentPeriod.value = period;
    isOpen.value = false;

    emit("updateRecords", period);
};
</script>

<template>
    <div class="top-records transition">
        <div class="top-records-title">
            <h2>{{ title }}</h2>
            <div class="period-selector" @blur="isOpen = false">
                <div class="selected-option" @click="isOpen = !isOpen" :class="{ active: isOpen }">
                    <span>{{ periodLabels[currentPeriod] }}</span>
                    <span class="material-symbols-outlined arrow" :class="{ up: isOpen }">
                        expand_more
                    </span>
                </div>
                <div class="options" v-show="isOpen">
                    <div
                        v-for="p in Object.values(Period)"
                        :key="p"
                        class="option"
                        :class="{ selected: currentPeriod === p }"
                        @click="updateRecords(p)"
                    >
                        {{ periodLabels[p] }}
                    </div>
                </div>
            </div>
        </div>
        <div class="records-container">
            <div v-for="i in 5" :key="i">
                <TopRecord :record="records[i - 1]" v-if="records[i - 1]" />
                <TopRecord :record="new Record(i, '', '', '', 0)" v-else />
            </div>
        </div>
    </div>
</template>

<style scoped>
.top-records {
    display: flex;
    align-items: start;
    flex-direction: column;
    padding: 24px;
    background-color: var(--vibrant-dark-bg);
    color: var(--vibrant-dark-text);
    border-radius: 30px;
    overflow: hidden;
}

.top-records-title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 16px 0 16px 28px;
}

.top-records-title h2 {
    margin: 0;
}

.top-records-title span {
    opacity: 0.35;
    font-size: 1.2rem;
}

.records-container {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.period-selector {
    position: relative;
    width: 200px;
    user-select: none;
}

.selected-option {
    padding: 8px 16px;
    background-color: var(--vibrant-dark-bg);
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: var(--color-primary);
}

.selected-option span:first-child {
    margin-right: 8px;
}

.arrow {
    font-size: 0.8rem;
    transition: transform 0.2s ease;
}

.arrow.up {
    transform: rotate(180deg);
}

.options {
    width: fit-content;
    position: absolute;
    top: calc(100% + 4px);
    right: 8px;
    padding: 8px;
    background-color: var(--vibrant-bg);
    color: var(--vibrant-text);
    border-radius: 8px;
    z-index: 10;
}

.option {
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    white-space: nowrap;
}

.option.selected {
    background-color: var(--vibrant-bg);
    color: var(--vibrant-texts);
}
</style>
