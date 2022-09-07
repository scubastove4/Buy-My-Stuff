<template>
  <!-- ////////    edit item form     //////////// -->
  <form v-if="editing" @submit.prevent="$emit('submitEditingItemForm')">
    <span>
      <label for="edit-item-name">Name</label>
      <input
        type="text"
        id="edit-item-name"
        name="name"
        :value="editingItem.name"
        @input="
          $emit(
            'changeEditingItemValues',
            $event.target.name,
            $event.target.value
          )
        "
        required
      />
    </span>
    <span>
      <!-- /////////// need to make a file upload/reader -->
      <label for="edit-item-image">Image</label>
      <input
        type="text"
        id="edit-item-image"
        name="name"
        :value="editingItem.name"
        @input="
          $emit(
            'changeEditingItemValues',
            $event.target.name,
            $event.target.value
          )
        "
      />
    </span>
    <span>
      <label for="edit-item-price">Price</label>
      <input
        type="text"
        id="edit-item-price"
        name="price"
        :value="editingItem.price"
        @input="
          $emit(
            'changeEditingItemValues',
            $event.target.name,
            $event.target.value
          )
        "
        required
      />
    </span>
    <span>
      <label for="edit-item-description">Description</label>
      <textarea
        id="edit-item-description"
        name="description"
        :value="editingItem.description"
        @input="
          $emit(
            'changeEditingItemValues',
            $event.target.name,
            $event.target.value
          )
        "
        required
      ></textarea>
    </span>
    <button type="submit" :disabled="!editingItem.name || !editingItem.price">
      Edit item
    </button>
  </form>

  <!-- ////////    new item form     //////////// -->
  <form v-else @submit.prevent="$emit('submitNewItemForm', user)">
    <span>
      <label for="add-item-name">Name</label>
      <input
        type="text"
        id="add-item-name"
        name="name"
        :value="newItemValues.name"
        @input="
          $emit('setNewItemValues', $event.target.name, $event.target.value)
        "
        required
      />
    </span>
    <span>
      <!-- /////////// need to make a file upload/reader -->
      <label for="add-item-image">Image</label>
      <input
        type="text"
        id="add-item-image"
        name="name"
        :value="newItemValues.name"
        @input="
          $emit('setNewItemValues', $event.target.name, $event.target.value)
        "
      />
    </span>
    <span>
      <label for="add-item-price">Price</label>
      <input
        type="text"
        id="add-item-price"
        name="price"
        :value="newItemValues.price"
        @input="
          $emit('setNewItemValues', $event.target.name, $event.target.value)
        "
        required
      />
    </span>
    <span>
      <label for="add-item-description">Description</label>
      <textarea
        id="add-item-description"
        name="description"
        :value="newItemValues.description"
        @input="
          $emit('setNewItemValues', $event.target.name, $event.target.value)
        "
        required
      ></textarea>
    </span>
    <button
      type="submit"
      :disabled="!newItemValues.name || !newItemValues.price"
    >
      Add item
    </button>
  </form>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps(['user', 'newItemValues', 'editing', 'editingItem'])
defineEmits([
  'setNewItemValues',
  'submitNewItemForm',
  'changeEditingItemValues',
  'submitEditingItemForm'
])
</script>
