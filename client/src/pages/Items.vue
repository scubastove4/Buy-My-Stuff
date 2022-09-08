<template>
  <main v-if="user">
    <button v-if="user.isAdmin" @click="changeAddingItem">Add Item</button>
    <ItemForm
      v-if="addingItem"
      :user="user"
      :newItemValues="newItemValues"
      :editing="editing"
      :editingItem="editingItem"
      :categories="categories"
      @setNewItemValues="setNewItemValues"
      @resetNewItemValues="resetNewItemValues"
      @submitNewItemForm="submitNewItemForm"
      @changeEditingItemValues="changeEditingItemValues"
      @submitEditingItemForm="submitEditingItemForm"
    />
    <section v-if="items">
      <div v-for="item in items" :key="item.id">
        <ItemForm
          v-if="editing && item.id === editingItem.id"
          :user="user"
          :newItemValues="newItemValues"
          :editing="editing"
          :editingItem="editingItem"
          :categories="categories"
          @setNewItemValues="setNewItemValues"
          @resetNewItemValues="resetNewItemValues"
          @submitNewItemForm="submitNewItemForm"
          @changeEditingItemValues="changeEditingItemValues"
          @submitEditingItemForm="submitEditingItemForm"
        />
        <ItemCard v-else :item="item" @click="selectItem(item.id)" />
        <span v-if="user.isAdmin">
          <button @click="setEditingItem(item)">Edit Item</button>
          <button @click="deleteItem(item.id)">Delete Item</button>
        </span>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted, ref, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import ItemCard from '../components/ItemCard.vue'
import ItemForm from '../components/ItemForm.vue'
import { GetItems, PostItem, UpdateItem, DeleteItem } from '../services/ItemReq'
import { GetCategories } from '../services/CategoryReq'

defineProps(['user'])

/////////////  get all categories  /////////////
const categories = ref([])
async function setCategories() {
  const data = await GetCategories()
  categories.value = data
}

const router = useRouter()
// const route = useRoute() useRoute

/////////////  get all items  /////////////
const items = ref([])
async function setItems() {
  const data = await GetItems()
  items.value = data
}
onMounted(() => {
  setItems()
  setCategories()
})

/////////////  get item by id  /////////////
function selectItem(itemId) {
  router.push(`/items/${itemId}`)
}

/////////////  add new Item  /////////////
const addingItem = ref(false)
function changeAddingItem() {
  !addingItem.value ? (addingItem.value = true) : (addingItem.value = false)
}
const newItemValues = ref({
  name: '',
  image: '',
  price: '',
  description: '',
  categoryId: null
})
function setNewItemValues(name, val) {
  newItemValues.value[name] = val
}
function resetNewItemValues() {
  newItemValues.value = {
    name: '',
    image: '',
    price: '',
    description: '',
    categoryId: null
  }
  changeAddingItem()
}
async function submitNewItemForm(user) {
  let item = { ...newItemValues.value, adminId: user.id }
  await PostItem(item)
  resetNewItemValues()
  setItems()
}

/////////////  edit item  /////////////
const editing = ref(false)
const editingItem = ref({
  name: '',
  image: '',
  price: '',
  description: '',
  categoryId: null,
  id: 0
})

function setEditingItem(item) {
  editing.value = true
  editingItem.value.name = item.name
  editingItem.value.image = item.image
  editingItem.value.price = item.price
  editingItem.value.description = item.description
  editingItem.value.categoryId = item.categoryId
  editingItem.value.id = item.id
}
function changeEditingItemValues(name, val) {
  editingItem.value[name] = val
}
async function submitEditingItemForm() {
  let item = { ...editingItem.value }
  await UpdateItem(editingItem.value.id, item)
  setItems()
  editing.value = false
  editingItem.value = {
    name: '',
    description: '',
    id: 0
  }
}

/////////////  delete item  /////////////
async function deleteItem(itemId) {
  await DeleteItem(itemId)
  setItems()
}
</script>

<style></style>
