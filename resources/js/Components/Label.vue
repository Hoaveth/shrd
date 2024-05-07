<script setup>
defineProps(['value']);
</script>

<template>
    <label v-if="value" class="form-label">{{ value }}</label>
    <label v-else class="form-label"><slot /></label>
</template>
