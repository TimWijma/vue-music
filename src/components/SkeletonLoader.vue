<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        width?: string;
        height?: string;
        mainColor?: string;
        secondaryColor?: string;
    }>(),
    {
        width: "100%",
        height: "20px",
        mainColor: "#f0f0f0",
        secondaryColor: "#e0e0e0",
    }
);
</script>

<template>
    <div
        class="skeleton-loader"
        :style="{
            width: props.width,
            height: props.height,
            '--main-color': props.mainColor,
            '--secondary-color': props.secondaryColor,
        }"
    ></div>
</template>

<style scoped>
.skeleton-loader {
    background: linear-gradient(
        90deg,
        var(--main-color),
        var(--secondary-color),
        var(--main-color)
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
