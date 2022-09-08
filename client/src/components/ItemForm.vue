<template>
  <!-- ////////    edit item form     //////////// -->
  <form v-if="editing" @submit.prevent="$emit('submitEditingItemForm', user)">
    <!-- action="/update"
        method="PUT"
        encType="multipart/form-data" -->
    <span>
      <!-- <label for="edit-item-name">Name</label> -->
      <select
        id="edit-item-category"
        name="categoryId"
        @input="
          $emit(
            'changeEditingItemValues',
            $event.target.name,
            parseInt($event.target.value)
          )
        "
        required
      >
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
          :selected="editingItem.categoryId === category.id && true"
        >
          {{ category.name }}
        </option>
      </select>
    </span>
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
        :value="editingItem.image"
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
  <form
    v-else
    @submit.prevent="$emit('submitNewItemForm', user)"
    action="/create"
    method="POST"
    encType="multipart/form-data"
  >
    <span>
      <!-- <label for="edit-item-name">Name</label> -->
      <select
        id="add-item-category"
        name="categoryId"
        defaultValue=""
        @input="
          $emit(
            'setNewItemValues',
            $event.target.name,
            parseInt($event.target.value)
          )
        "
        required
      >
        <option hidden>Select Category</option>
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
    </span>
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
        type="file"
        id="add-item-image"
        name="image"
        accept="image/*"
        @change="$emit('handleImage', $event.target.files)"
      />
      <!-- :value="newItemValues.image" -->
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

defineProps(['user', 'newItemValues', 'editing', 'editingItem', 'categories'])
defineEmits([
  'setNewItemValues',
  'submitNewItemForm',
  'changeEditingItemValues',
  'submitEditingItemForm',
  'handleImage'
])
</script>
