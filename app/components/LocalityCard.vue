<template>
  <article class="card">
    <div class="name">
      {{ item.name_en || item.name || 'Unnamed' }}
    </div>

    <div class="small">ID: {{ item.id }}</div>

    <div class="small">
      Country:
      {{ item.country?.name_en || item.country?.name || item.country || '-' }}
    </div>
  </article>
</template>

<script setup lang="ts">
defineProps<{ item: any }>()
</script>

<style scoped>
.card {
  padding: 12px;
  border: 1px solid #2a2a2a;
  border-radius: 10px;
}

.name {
  font-weight: 700;
  margin-bottom: 4px;
}

.small {
  font-size: 14px;
  opacity: 0.85;
}
</style>
