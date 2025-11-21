import { ref } from 'vue'

const BASE_URL = "http://localhost:3001"

export function useApi() {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const request = async (endpoint, options = {}) => {
    loading.value = true
    error.value = null

    try {
      const res = await fetch(BASE_URL + endpoint)
      if (!res.ok) throw new Error("Error " + res.status)
      data.value = await res.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, request }
}
