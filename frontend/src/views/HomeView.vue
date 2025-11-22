<template>
  <div>
    <h2 class="subtitle">Productos destacados</h2>

    <div class="filters">
      <input
        v-model="search"
        type="text"
        placeholder="Buscar por nombre o descripción..."
      />

      <select v-model="selectedCategory">
        <option value="all">Todas las categorías</option>
        <option
          v-for="cat in categories"
          :key="cat.id"
          :value="cat.id"
        >
          {{ cat.name }}
        </option>
      </select>

      <button @click="clearFilters">
        Limpiar filtros
      </button>
    </div>

    <div v-if="loading || loadingCategories" class="status">
      Cargando productos...
    </div>

    <div v-else-if="error || errorCategories" class="status error">
      Ocurrió un error al cargar los datos.
    </div>

    <div v-else class="products">
      <div
        v-if="filteredProducts.length === 0"
        class="status"
      >
        No se encontraron productos con esos filtros.
      </div>

      <!-- Usamos ProductCard reutilizable -->
      <ProductCard
        v-for="p in filteredProducts"
        :key="p.id"
        :product="p"
        @added-to-cart="addToCart"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProducts } from '../composables/useProducts'
import ProductCard from '../components/ProductCard.vue'
import { useCart } from '../composables/useCart'

const search = ref('')
const selectedCategory = ref('all')

const {
  products,
  categories,
  loading,
  error,
  loadingCategories,
  errorCategories,
  loadProducts,
  loadCategories
} = useProducts()

// carrito compartido en toda la app
const { addToCart } = useCart()

const filteredProducts = computed(() => {
  const term = search.value.toLowerCase().trim()
  const cat = selectedCategory.value

  return products.value.filter((p) => {
    const matchesSearch =
      !term ||
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term)

    const matchesCategory =
      cat === 'all' || p.categoryId === Number(cat)

    return matchesSearch && matchesCategory
  })
})

const clearFilters = () => {
  search.value = ''
  selectedCategory.value = 'all'
}

onMounted(() => {
  loadProducts()
  loadCategories()
})
</script>

<style scoped>
.subtitle {
  font-size: 28px;
  color: #1d3557;
  margin-bottom: 25px;
  font-weight: 600;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.filters input,
.filters select {
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  min-width: 220px;
}

.filters button {
  padding: 8px 14px;
  border-radius: 6px;
  border: none;
  background: #457b9d;
  color: white;
  cursor: pointer;
  transition: 0.2s;
}

.filters button:hover {
  background: #1d3557;
}

.status {
  margin-top: 20px;
  font-size: 16px;
}

.status.error {
  color: #e63946;
}

.products {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  margin-top: 20px;
}
</style>
