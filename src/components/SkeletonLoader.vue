<script setup lang="ts">
import { defineProps, withDefaults } from "vue";

const props = withDefaults(
    defineProps<{
        width?: string;
        height?: string;
    }>(),
    {
        width: "100%",
        height: "20px",
    }
);
</script>

<template>
    <div
        class="skeleton-loader transition"
        :style="{
            width: props.width,
            height: props.height,
        }"></div>
</template>

<style scoped>
.skeleton-loader {
    background: linear-gradient(
        90deg,
        var(--vibrant-bg),
        var(--vibrant-dark-bg),
        var(--vibrant-bg)
    );
    background-size: 200% 100%;
    border-radius: 4px;
    animation: loading 1.5s infinite;
}

@keyframes loading {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}
</style>
