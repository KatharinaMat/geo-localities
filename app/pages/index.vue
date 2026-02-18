<template>
  <div class="page">
    <header class="header">
      <h1 class="title">Geological Localities</h1>
      <p class="subtitle">
        Browse geological localities from the public API.
      </p>
    </header>

    <section class="card">
      <div v-if="pending">Loading localities...</div>

      <div v-else-if="error" class="error">
        Failed to load localities. Please try again.
      </div>

      <div v-else>
        <p class="meta">
          Showing {{ results.length }} of {{ data?.count ?? 0 }}
        </p>

        <ul class="list">
          <li v-for="item in results" :key="item.id" class="row">
            <div class="name">
              {{ item.name_en || item.name || 'Unnamed' }}
            </div>

            <div class="small">
              ID: {{ item.id }}
            </div>

            <div class="small">
              Country:
              {{
                item.country?.name_en ||
                item.country?.name ||
                item.country ||
                '—'
              }}
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup>
const API_URL =
  'https://rwapi.geoloogia.info/api/v1/public/localities/?limit=20&expand=country'

const { data, pending, error } = await useFetch(API_URL)

const results = computed(() => data.value?.results ?? [])
</script>

<style scoped>
.page {
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  padding: 24px;
  max-width: 1000px;
  margin: 0 auto;
}

.header {
  margin-bottom: 16px;
}

.title {
  margin: 0;
  font-size: 28px;
}

.subtitle {
  margin: 8px 0 0;
  opacity: 0.8;
}

.card {
  padding: 16px;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
}

.meta {
  margin: 0 0 12px;
  opacity: 0.8;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
}

.row {
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

.error {
  color: #b00020;
  font-weight: 600;
}
</style>
