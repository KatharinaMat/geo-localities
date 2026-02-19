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

    <section class="panel">
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
        </p>

        <div class="pagination">
          <button class="btn" :disabled="!canPrev" @click="prevPage">
            Previous
          </button>

          <div class="pageinfo">Page {{ page }} / {{ totalPages }}</div>

          <button class="btn" :disabled="!canNext" @click="nextPage">
            Next
          </button>
        </div>

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
} = useLocalities();
</script>

<style scoped>
.page {
  padding: 24px;
  max-width: 1000px;
  margin: 0 auto;
}

.header {
  margin-bottom: 16px;
}

.title {
  margin: 0;
  font-size: 30px;
}

.subtitle {
  margin: 8px 0 0;
  opacity: 0.8;
}

.meta {
  margin: 0 0 12px;
  opacity: 0.8;
}

.panel {
  padding: 16px;
  border: 1px solid #3e290e;
  border-radius: 12px;
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
  border: 1px solid #3e290e;
  border-radius: 12px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
}

.input:focus {
  outline: none;
  border-color: #c37918;
  box-shadow: 0 0 0 3px rgba(195, 121, 24, 0.18);
}

.pagination {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 12px 0 16px;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 14px;
  border: 1px solid #3e290e;
  border-radius: 12px;
  background: transparent;
  cursor: pointer;
  font-weight: 500;

  transition:
    transform 120ms ease,
    box-shadow 120ms ease,
    background 120ms ease,
    border-color 120ms ease;
}

.btn:hover {
  background: #c37918;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-1px);
}

.btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

.btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
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

  .panel {
    padding: 12px;
  }
}
</style>
