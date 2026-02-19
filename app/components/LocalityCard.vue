<template>
  <article class="card">
    <div class="name">
      {{ item.name_en || item.name || "Unnamed" }}
    </div>

    <div class="small">ID: {{ item.id }}</div>

    <div class="small">
      Country:
      {{ item.country?.name_en || item.country?.name || item.country || "-" }}
    </div>
  </article>
</template>

<script setup lang="ts">
defineProps<{ item: any }>();
</script>

<style scoped>
.card {
  padding: 12px;
  border: 1px solid #3e290e;
  border-radius: 12px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
  transition:
    transform 140ms ease,
    box-shadow 140ms ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.1);
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
