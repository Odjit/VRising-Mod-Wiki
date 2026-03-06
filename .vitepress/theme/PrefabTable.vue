<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()

const prefabModules = import.meta.glob('/_data/prefabs/*.json')

const entries  = ref([])
const headers  = ref([])
const loading  = ref(true)
const search   = ref('')
const page     = ref(1)
const pageSize = ref(50)

async function loadData(dataFile) {
  // Reset state for the new page
  loading.value = true
  search.value  = ''
  page.value    = 1
  entries.value = []
  headers.value = []

  if (!dataFile) { loading.value = false; return }

  const key = `/_data/prefabs/${dataFile}.json`
  if (!prefabModules[key]) { loading.value = false; return }

  const mod  = await prefabModules[key]()
  const data = mod.default || mod

  if (Array.isArray(data)) {
    // VBloodNames format: [[name, guid, type], ...]
    headers.value = ['Name', 'Prefab GUID', 'Type']
    entries.value = data
  } else {
    // Standard format: { "PrefabName": numericId, ... }
    headers.value = ['Prefab Name', 'ID']
    entries.value = Object.entries(data)
  }

  loading.value = false
}

// Load on first mount
onMounted(() => loadData(frontmatter.value.data_file))

// Reload whenever the page changes (frontmatter.data_file changes with each prefab route)
watch(() => frontmatter.value.data_file, (newFile) => loadData(newFile))

const filtered = computed(() => {
  const q = search.value.toLowerCase().trim()
  if (!q) return entries.value
  return entries.value.filter(row =>
    row.some(cell => String(cell).toLowerCase().includes(q))
  )
})

const totalPages = computed(() => Math.ceil(filtered.value.length / pageSize.value))

const rows = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return filtered.value.slice(start, start + pageSize.value)
})

watch([search, pageSize], () => { page.value = 1 })
</script>

<template>
  <div>
    <p v-if="loading" style="color: var(--vp-c-text-2)">Loading prefabs…</p>

    <template v-else>
      <div class="pf-controls">
        <input
          v-model="search"
          class="pf-search"
          type="search"
          :placeholder="`Search ${entries.length} prefabs…`"
          aria-label="Search prefabs"
        />
        <select v-model="pageSize" class="cc-select">
          <option :value="50">50 / page</option>
          <option :value="100">100 / page</option>
          <option :value="250">250 / page</option>
        </select>
      </div>

      <p class="pf-info">{{ filtered.length }} result{{ filtered.length !== 1 ? 's' : '' }}</p>

      <table class="pf-table" :aria-label="`${frontmatter.title} prefabs`">
        <thead>
          <tr>
            <th v-for="h in headers" :key="h">{{ h }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row[0]">
            <td v-for="(cell, i) in row" :key="i">{{ cell }}</td>
          </tr>
          <tr v-if="rows.length === 0">
            <td :colspan="headers.length" style="text-align:center; padding: 1.5rem; color: var(--vp-c-text-2);">
              No prefabs match your search.
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="totalPages > 1" class="cc-pagination">
        <button class="cc-page-btn" :disabled="page === 1" @click="page--">‹ Prev</button>
        <span style="font-size:0.82rem; color: var(--vp-c-text-2);">
          Page {{ page }} / {{ totalPages }}
        </span>
        <button class="cc-page-btn" :disabled="page === totalPages" @click="page++">Next ›</button>
      </div>
    </template>
  </div>
</template>
