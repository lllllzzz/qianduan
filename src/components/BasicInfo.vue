<!-- src/components/BasicInfo.vue -->
<template>
    <div class="basic-info">
      <h3>基本信息</h3>
      <div v-if="!editMode">
        <p>姓名: {{ basicInfo.name }}</p>
        <p>年龄: {{ basicInfo.age }}</p>
        <p>工作经验: {{ basicInfo.experience }} 年</p>
        <button @click="toggleEdit">编辑</button>
      </div>
      <div v-else>
        <label>
          姓名:
          <input v-model="form.name" />
        </label>
        <label>
          年龄:
          <input type="number" v-model.number="form.age" />
        </label>
        <label>
          工作经验:
          <input type="number" v-model.number="form.experience" />
        </label>
        <button @click="save">完成</button>
        <button @click="toggleEdit">取消</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, reactive, onMounted } from 'vue'
  import { getBasicInfo, setBasicInfo } from '../services/api'
  
  export default {
    setup() {
      const basicInfo = ref({})
      const editMode = ref(false)
      const form = reactive({
        name: '',
        age: 0,
        experience: 0
      })
  
      onMounted(async () => {
        const data = await getBasicInfo()
        basicInfo.value = data
        form.name = data.name
        form.age = data.age
        form.experience = data.experience
      })
  
      const toggleEdit = () => {
        editMode.value = !editMode.value
        if (!editMode.value) {
          // 如果取消编辑，重置表单
          form.name = basicInfo.value.name
          form.age = basicInfo.value.age
          form.experience = basicInfo.value.experience
        }
      }
  
      const save = async () => {
        basicInfo.value = { ...form }
        await setBasicInfo(basicInfo.value)
        editMode.value = false
      }
  
      return {
        basicInfo,
        editMode,
        form,
        toggleEdit,
        save
      }
    }
  }
  </script>
  
  <style scoped>
  .basic-info {
    border: 1px solid #ccc;
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .basic-info label {
    display: block;
    margin-bottom: 10px;
  }
  
  .basic-info input {
    margin-left: 10px;
  }
  </style>
  