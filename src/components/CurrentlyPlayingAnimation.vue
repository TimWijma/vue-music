<script setup lang="ts"></script>

<template>
    <div class="animation-container">
        <div class="bar bar-1"></div>
        <div class="bar bar-2"></div>
        <div class="bar bar-3"></div>
    </div>
</template>

<style scoped>
.animation-container {
    display: flex;
    justify-content: center;
    align-items: end;
    height: 100%;
    gap: 4px;
}

.bar {
    width: 4px;
    height: 20px;
    background-color: var(--vibrant-dark-text);
    border-radius: 2px;

    animation: equalizer 1s infinite ease-in-out;
}

.bar-1 {
    animation-delay: 0s;
}

.bar-2 {
    animation-delay: 0.4s;
}

.bar-3 {
    animation-delay: 0.8s;
}

@keyframes equalizer {
    0% {
        height: 20px;
    }
    50% {
        height: 12px;
    }
    100% {
        height: 20px;
    }
}
</style>
