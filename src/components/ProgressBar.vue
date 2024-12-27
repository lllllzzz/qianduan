<!-- src/components/ProgressBar.vue -->
<template>
    <div class="progress-bar">
      <h3>简历完成度: {{ completeness }}%</h3>
      <div class="bar-container">
        <div class="bar" :style="{ width: completeness + '%' }"></div>
      </div>
      <div class="status">{{ status }}</div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import { getBasicInfo, getJobIntentions } from '../services/api'
  
  export default {
    setup() {
      const completeness = ref(0)
      const status = ref('待完善')
      const total = 2 // 基本信息和求职意向
  
      const calculateCompleteness = async () => {
        let count = 0
        const basicInfo = await getBasicInfo()
        if (basicInfo.name && basicInfo.age && basicInfo.experience) count += 1
  
        const jobIntentions = await getJobIntentions()
        if (jobIntentions.length > 0) count += 1
  
        completeness.value = Math.round((count / total) * 100)
        status.value = completeness.value === 100 ? '已完成' : '待完善'
      }
  
      onMounted(() => {
        calculateCompleteness()
      })
  
      return {
        completeness,
        status
      }
    }
  }
  </script>
  
  <style scoped>
  .progress-bar {
    border: 1px solid #ccc;
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .bar-container {
    background: #e0e0e0;
    border-radius: 5px;
    width: 100%;
    height: 20px;
    margin: 10px 0;
  }
  
  .bar {
    background: #76c7c0;
    height: 100%;
    border-radius: 5px;
  }
  
  .status {
    text-align: center;
  }
  </style>
  