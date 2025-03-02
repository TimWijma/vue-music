<script setup lang="ts">
import { ref, onMounted, defineProps } from "vue";
import { Marquee } from "../scripts/Marquee";

const props = defineProps<{
    originalText: string;
    gapText: string;
}>();

const marqueeElement = ref(null);
const marqueeContainer = ref(null);
let marqueeInstance: Marquee;

onMounted(() => {
    if (marqueeElement.value && marqueeContainer.value) {
        marqueeInstance = new Marquee(
            marqueeElement.value,
            marqueeContainer.value,
            props.originalText,
            props.gapText
        );
    }
});
</script>

<template>
    <div
        ref="marqueeContainer"
        class="marquee-container"
        @mouseenter="marqueeInstance?.startScroll()">
        <span ref="marqueeElement" class="marquee-text">{{
            originalText
        }}</span>
    </div>
</template>

<style scoped>
.marquee-container {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
}

.marquee-text {
    display: inline-block;
    padding-right: 10px;
}
</style>
