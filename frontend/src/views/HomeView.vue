<template>
  <div>
    <h2>Productos:</h2>

    <div v-for="p in filteredProducts" :key="p.id">
      <a :href="`/product/${p.id}`">{{ p.name }} - ${{ p.price }}</a>
    </div>
  </div>
</template>

<script setup>
import { useProducts } from '../composables/useProducts'

const { filteredProducts } = useProducts()
</script>
