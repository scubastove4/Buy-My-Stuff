<template>
  <form>
    <span>
      <label for="add-category-name">Name</label>
      <input
        type="text"
        id="add-category-name"
        name="name"
        :value="newCategoryValues.name"
        @input="
          $emit('setnewCategoryValues', $event.target.name, $event.target.value)
        "
        required
      />
    </span>
    <span>
      <label for="add-category-description">Description</label>
      <textarea
        id="add-category-description"
        name="description"
        :value="newCategoryValues.description"
        @input="
          $emit('setnewCategoryValues', $event.target.name, $event.target.value)
        "
        required
      ></textarea>
    </span>
    <button
      type="submit"
      :disabled="!newCategoryValues.name || !newCategoryValues.description"
    >
      Login
    </button>
  </form>
  <!-- <h2>Hi there</h2> -->
</template>

<script setup>
import { defineProps } from 'vue'

defineProps(['newCategoryValues'])
</script>
