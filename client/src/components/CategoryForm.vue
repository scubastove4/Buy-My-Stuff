<template>
  <!-- ////////    edit category form     //////////// -->
  <form v-if="editing" @submit.prevent="$emit('submitEditingCategoryForm')">
    <span>
      <label for="edit-category-name">Name</label>
      <input
        type="text"
        id="edit-category-name"
        name="name"
        :value="editingCategory.name"
        @input="
          $emit(
            'changeEditingCategoryValues',
            $event.target.name,
            $event.target.value
          )
        "
        required
      />
    </span>
    <span>
      <label for="edit-category-description">Description</label>
      <textarea
        id="edit-category-description"
        name="description"
        :value="editingCategory.description"
        @input="
          $emit(
            'changeEditingCategoryValues',
            $event.target.name,
            $event.target.value
          )
        "
        required
      ></textarea>
    </span>
    <button type="submit" :disabled="!editingCategory.name">
      Edit Category
    </button>
    <button type="button" @click="$emit('resetNewCategoryValues')">
      Clear Form
    </button>
  </form>

  <!-- ////////    new category form     //////////// -->
  <form v-else @submit.prevent="$emit('submitNewCategoryForm', user)">
    <span>
      <label for="add-category-name">Name</label>
      <input
        type="text"
        id="add-category-name"
        name="name"
        :value="newCategoryValues.name"
        @input="
          $emit('setNewCategoryValues', $event.target.name, $event.target.value)
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
          $emit('setNewCategoryValues', $event.target.name, $event.target.value)
        "
        required
      ></textarea>
    </span>
    <button type="submit" :disabled="!newCategoryValues.name">
      Add Category
    </button>
    <button type="button" @click="$emit('resetNewCategoryValues')">
      Clear Form
    </button>
  </form>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps(['user', 'newCategoryValues', 'editing', 'editingCategory'])
defineEmits([
  'setNewCategoryValues',
  'submitNewCategoryForm',
  'changeEditingCategoryValues',
  'submitEditingCategoryForm',
  'resetNewCategoryValues'
])
</script>
