import { ref, computed, onMounted } from 'vue'
import { useApi } from './useApi'

export function useProducts() {
  const { data: products, request: requestProducts } = useApi()
  const { data: categories, request: requestCategories } = useApi()

  const search = ref('')
  const selectedCategory = ref('')

  const loadProducts = () => requestProducts('/api/products')
  const loadCategories = () => requestCategories('/api/categories')

  const filteredProducts = computed(() => {
    if (!products.value) return []
    return products.value.filter(p =>
      p.name.toLowerCase().includes(search.value.toLowerCase())
    )
  })

  onMounted(() => {
    loadProducts()
    loadCategories()
  })

  return {
    products,
    categories,
    search,
    selectedCategory,
    filteredProducts,
  }
}
