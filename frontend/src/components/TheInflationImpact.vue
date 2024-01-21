<template>
  <div>
    Inflation Impact: {{ impact }}
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  impact: {
    type: String,
    default: ''
  }
})
</script>
