<template>
  <main v-if="user">
    <button v-if="user.isAdmin" @click="changeAddingCategory">
      Add Category
    </button>
    <CategoryForm
      v-if="addingCategory"
      :user="user"
      :newCategoryValues="newCategoryValues"
      @setNewCategoryValues="setNewCategoryValues"
      @resetNewCategoryValues="resetNewCategoryValues"
      @submitNewCategoryForm="submitNewCategoryForm"
    />
    <div v-if="categories">
      <CategoryCard
        v-for="category in categories"
        :key="category.id"
        :category="category"
        @click="selectCategory(category.id)"
      />
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import CategoryCard from '../components/CategoryCard.vue'
import CategoryForm from '../components/CategoryForm.vue'
import { GetCategories, PostCategory } from '../services/CategoryReq'

defineProps(['user'])

const router = useRouter()
// const route = useRoute() useRoute

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
</script>

<style></style>
