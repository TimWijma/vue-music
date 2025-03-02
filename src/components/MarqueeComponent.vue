<script setup lang="ts">
import { ref, onMounted, defineProps, watch } from "vue";
import { Marquee } from "../scripts/Marquee";

const props = withDefaults(
    defineProps<{
        text: string;
        gap?: string;
        activateOnLoad?: boolean;
    }>(),
    {
        gap: " - ",
        activateOnLoad: false,
    }
);

const marqueeElement = ref(null);
const marqueeContainer = ref(null);
let marqueeInstance: Marquee;

onMounted(() => {
    if (marqueeElement.value && marqueeContainer.value) {
        marqueeInstance = new Marquee(
            marqueeElement.value,
            marqueeContainer.value,
            props.text,
            props.gap
        );

        if (props.activateOnLoad) {
            setTimeout(() => {
                marqueeInstance.startScroll();
            }, 1000);
        }
    }
});

watch(
    () => props.text,
    () => {
        if (marqueeInstance) {
            marqueeInstance.stopScroll();
            marqueeInstance.text = props.text;
        }
    }
);
</script>

<template>
    <div
        ref="marqueeContainer"
        class="marquee-container"
        @mouseover="marqueeInstance?.startScroll()">
        <span ref="marqueeElement" class="marquee-text">
            <slot></slot>
        </span>
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
}
</style>
