<template>
  <div class="page">
    <header class="header">
      <h1 class="title">Geological Localities</h1>
      <p class="subtitle">Browse geological localities from the public API.</p>
    </header>
    <div class="controls">
      <label class="label">
        Search by name
        <input
          v-model="search"
          class="input"
          type="text"
          placeholder="e.g. Hino, Irase, Hirvli..."
        />
      </label>
    </div>

    <section class="card">
      <div v-if="pending">Loading localities...</div>

      <div v-else-if="error" class="error">
         <p>Failed to load localities. Please try again.</p>
    <button class="btn" @click="refresh()">Retry</button>
      </div>

        <div v-else-if="isEmpty" class="empty">
    <p>No results found.</p>
    <p class="hint">Try a different search term.</p>
  </div>

      <div v-else>
        <p class="meta">
          Showing {{ results.length }} of {{ data?.count ?? 0 }}
         <div class="pagination">
  <button class="btn" :disabled="!canPrev" @click="prevPage">
    Previous
  </button>

  <div class="pageinfo">
    Page {{ page }} / {{ totalPages }}
  </div>

  <button class="btn" :disabled="!canNext" @click="nextPage">
    Next
  </button>
</div>

        </p>

        <ul class="list">
          <li v-for="item in results" :key="item.id">
            <LocalityCard :item="item" />
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const {
  search,
  data,
  pending,
  error,
  refresh,
  results,
  isEmpty,
  page,
  totalPages,
  canPrev,
  canNext,
  prevPage,
  nextPage,
} = useLocalities()
</script>


<style scoped>
.page {
  font-family:
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Arial,
    sans-serif;
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

.error {
  color: #b00020;
  font-weight: 600;
}
.controls {
  margin: 16px 0;
}

.label {
  display: grid;
  gap: 6px;
  font-size: 14px;
  opacity: 0.9;
  max-width: 420px;
  width: 100%;
}

.input {
  padding: 10px 12px;
  border: 1px solid #2a2a2a;
  border-radius: 10px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
}
.pagination {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 12px 0 16px;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 12px;
  border: 1px solid #2a2a2a;
  border-radius: 10px;
  background: transparent;
  cursor: pointer;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn:hover {
  opacity: 0.9;
}

.empty {
  padding: 8px 0;
}

.hint {
  opacity: 0.75;
  margin-top: 6px;
  font-size: 14px;
}
.pageinfo {
  font-size: 14px;
  opacity: 0.85;
}
@media (max-width: 600px) {
  .page {
    padding: 16px;
  }

  .title {
    font-size: 22px;
  }

  .card {
    padding: 12px;
  }
}

</style>
