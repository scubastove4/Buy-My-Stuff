<template>
  <main v-if="user">
    <button v-if="user.isAdmin" @click="changeAddingCategory">
      Add Category
    </button>
    <CategoryForm
      v-if="addingCategory"
      :user="user"
      :newCategoryValues="newCategoryValues"
      :editing="editing"
      :editingCategory="editingCategory"
      @setNewCategoryValues="setNewCategoryValues"
      @resetNewCategoryValues="resetNewCategoryValues"
      @submitNewCategoryForm="submitNewCategoryForm"
      @changeEditingCategoryValues="changeEditingCategoryValues"
      @submitEditingCategoryForm="submitEditingCategoryForm"
    />
    <section v-if="categories">
      <div v-for="category in categories" :key="category.id">
        <CategoryForm
          v-if="editing && category.id === editingCategory.id"
          :user="user"
          :newCategoryValues="newCategoryValues"
          :editing="editing"
          :editingCategory="editingCategory"
          @setNewCategoryValues="setNewCategoryValues"
          @resetNewCategoryValues="resetNewCategoryValues"
          @submitNewCategoryForm="submitNewCategoryForm"
          @changeEditingCategoryValues="changeEditingCategoryValues"
          @submitEditingCategoryForm="submitEditingCategoryForm"
        />
        <CategoryCard
          v-else
          :category="category"
          @click="selectCategory(category.id)"
        />
        <span v-if="user.isAdmin">
          <button @click="setEditingCategory(category)">Edit Category</button>
          <button @click="deleteCategory(category.id)">Delete Category</button>
        </span>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted, ref, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import CategoryCard from '../components/CategoryCard.vue'
import CategoryForm from '../components/CategoryForm.vue'
import {
  GetCategories,
  PostCategory,
  UpdateCategory,
  DeleteCategory
} from '../services/CategoryReq'

defineProps(['user'])

const router = useRouter()
// const route = useRoute() useRoute

/////////////  get all categories  /////////////
const categories = ref([])
async function setCategories() {
  const data = await GetCategories()
  categories.value = data
}
function selectCategory(categoryId) {
  router.push(`/categories/${categoryId}`)
}
onMounted(setCategories)

/////////////  add new category  /////////////
const addingCategory = ref(false)
function changeAddingCategory() {
  !addingCategory.value
    ? (addingCategory.value = true)
    : (addingCategory.value = false)
}
const newCategoryValues = ref({
  name: '',
  description: ''
})
function setNewCategoryValues(name, val) {
  newCategoryValues.value[name] = val
}
function resetNewCategoryValues() {
  newCategoryValues.value = {
    name: '',
    description: ''
  }
  changeAddingCategory()
}
async function submitNewCategoryForm(user) {
  let category = { ...newCategoryValues.value, adminId: user.id }
  await PostCategory(category)
  resetNewCategoryValues()
  setCategories()
}

/////////////  edit category  /////////////
const editing = ref(false)
const editingCategory = ref({
  name: '',
  description: '',
  id: 0
})

function setEditingCategory(category) {
  editing.value = true
  editingCategory.value.name = category.name
  editingCategory.value.description = category.description
  editingCategory.value.id = category.id
}
function changeEditingCategoryValues(name, val) {
  editingCategory.value[name] = val
}
async function submitEditingCategoryForm() {
  let category = { ...editingCategory.value }
  await UpdateCategory(editingCategory.value.id, category)
  setCategories()
  editing.value = false
  editingCategory.value = {
    name: '',
    description: '',
    id: 0
  }
}

/////////////  delete category  /////////////
async function deleteCategory(categoryId) {
  // console.log(categoryId)
  await DeleteCategory(categoryId)
  setCategories()
}
</script>

<style></style>
