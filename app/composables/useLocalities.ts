interface Locality {
  id: number
  name?: string
  name_en?: string
  country?: {
    name?: string
    name_en?: string
  }
}

interface LocalitiesResponse {
  count: number
  results: Locality[]
}

// app/composables/useLocalities.ts
export function useLocalities() {
  const LIMIT = 20

  const search = ref('')
  const offset = ref(0)

  // debounce search
  const debounced = ref('')
  let t: ReturnType<typeof setTimeout> | null = null

  watch(search, (val) => {
    if (t) clearTimeout(t)
    t = setTimeout(() => {
      debounced.value = val.trim().slice(0, 80)
    }, 350)
  })

  // reset pagination when search changes
  watch(debounced, () => {
    offset.value = 0
  })

  const query = computed(() => {
    const q: Record<string, any> = {
      limit: LIMIT,
      offset: offset.value,
      expand: 'country',
    }
    if (debounced.value) q.name__icontains = debounced.value
    return q
  })

  const { data, pending, error, refresh } = useFetch<LocalitiesResponse>(
    'https://rwapi.geoloogia.info/api/v1/public/localities/',
    { query }
  )

  const results = computed(() => data.value?.results ?? [])
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

  const isEmpty = computed(
    () => !pending.value && !error.value && results.value.length === 0
  )

  return {
    // state
    search,

    // data/state from fetch
    data,
    pending,
    error,
    refresh,
    results,
    total,

    // pagination
    page,
    totalPages,
    canPrev,
    canNext,
    prevPage,
    nextPage,

    // ui helpers
    isEmpty,
    LIMIT,
    offset,
  }
}
