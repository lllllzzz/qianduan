<!-- src/components/JobIntentions.vue -->
<template>
    <div class="job-intentions">
      <h3>求职意向</h3>
      <button @click="handleAdd">增加一项</button>
      <div v-if="showForm" class="intention-form">
        <label>
          职位:
          <input v-model="newIntention.position" />
        </label>
        <label>
          公司:
          <input v-model="newIntention.company" />
        </label>
        <button @click="saveIntention">{{ editId ? '完成' : '保存' }}</button>
        <button @click="cancelForm">取消</button>
      </div>
      <ul>
        <li
          v-for="item in intentions"
          :key="item.id"
          @mouseenter="hoveredId = item.id"
          @mouseleave="hoveredId = null"
        >
          {{ item.position }} - {{ item.company }}
          <div v-if="hoveredId === item.id" class="action-buttons">
            <button @click="handleEdit(item.id)">编辑</button>
            <button @click="handleDelete(item.id)">删除</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import { getJobIntentions, setJobIntentions } from '../services/api'
  
  export default {
    setup() {
      const intentions = ref([])
      const showForm = ref(false)
      const newIntention = ref({
        position: '',
        company: ''
      })
      const editId = ref(null)
      const hoveredId = ref(null)
  
      onMounted(async () => {
        intentions.value = await getJobIntentions()
      })
  
      const handleAdd = () => {
        showForm.value = true
        editId.value = null
        newIntention.value = { position: '', company: '' }
      }
  
      const handleEdit = (id) => {
        const intention = intentions.value.find(item => item.id === id)
        if (intention) {
          newIntention.value = { position: intention.position, company: intention.company }
          editId.value = id
          showForm.value = true
        }
      }
  
      const handleDelete = (id) => {
        if (confirm('确定要删除这项求职意向吗？')) {
          intentions.value = intentions.value.filter(item => item.id !== id)
          setJobIntentions(intentions.value)
        }
      }
  
      const saveIntention = () => {
        if (editId.value) {
          // 编辑模式
          intentions.value = intentions.value.map(item =>
            item.id === editId.value
              ? { ...item, position: newIntention.value.position, company: newIntention.value.company }
              : item
          )
        } else {
          // 添加模式
          const newItem = {
            id: Date.now(),
            position: newIntention.value.position,
            company: newIntention.value.company,
            status: 'active'
          }
          intentions.value.push(newItem)
        }
        setJobIntentions(intentions.value)
        showForm.value = false
        editId.value = null
        newIntention.value = { position: '', company: '' }
      }
  
      const cancelForm = () => {
        showForm.value = false
        editId.value = null
        newIntention.value = { position: '', company: '' }
      }
  
      return {
        intentions,
        showForm,
        newIntention,
        editId,
        hoveredId,
        handleAdd,
        handleEdit,
        handleDelete,
        saveIntention,
        cancelForm
      }
    }
  }
  </script>
  
  <style scoped>
  .job-intentions {
    border: 1px solid #ccc;
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .job-intentions .intention-form {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  
  .job-intentions label {
    display: block;
    margin-bottom: 10px;
  }
  
  .job-intentions input {
    margin-left: 10px;
  }
  
  .job-intentions ul {
    list-style: none;
    padding: 0;
  }
  
  .job-intentions li {
    position: relative;
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
  
  .action-buttons {
    position: absolute;
    right: 10px;
    top: 10px;
  }
  
  .action-buttons button {
    margin-left: 5px;
  }
  </style>
  