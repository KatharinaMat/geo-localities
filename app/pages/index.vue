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
          placeholder="e.g. Hino, borehole, Irase..."
        />
      </label>
    </div>

    <section class="card">
      <div v-if="pending">Loading localities...</div>

      <div v-else-if="error" class="error">
        Failed to load localities. Please try again.
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
const LIMIT = 20;
const search = ref("");
const offset = ref(0);

// simple debounce: only query after user stops typing
const debounced = ref("");
let t: ReturnType<typeof setTimeout> | null = null;

watch(search, (val) => {
  if (t) clearTimeout(t);
  t = setTimeout(() => {
    debounced.value = val.trim();
  }, 350);
});
watch(debounced, () => {
  offset.value = 0
})


const query = computed(() => {
  const q: Record<string, any> = {
    limit: LIMIT,
    offset: offset.value,
    expand: "country",
  };
  if (debounced.value) q.name__icontains = debounced.value;
  return q;
});

const { data, pending, error } = await useFetch(
  "https://rwapi.geoloogia.info/api/v1/public/localities/",
  { query },
);

const results = computed(() => data.value?.results ?? []);
const total = computed(() => data.value?.count ?? 0)
const page = computed(() => Math.floor(offset.value / LIMIT) + 1)
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / LIMIT)))

const canPrev = computed(() => offset.value > 0)
const canNext = computed(() => offset.value + LIMIT < total.value)

function prevPage() {
  if (!canPrev.value) return
  offset.value = Math.max(0, offset.value - LIMIT)
}

function nextPage() {
  if (!canNext.value) return
  offset.value = offset.value + LIMIT
}

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
}

.input {
  padding: 10px 12px;
  border: 1px solid #2a2a2a;
  border-radius: 10px;
  font-size: 16px;
}
.pagination {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 12px 0 16px;
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

.pageinfo {
  font-size: 14px;
  opacity: 0.85;
}


</style>
