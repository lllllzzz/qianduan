<!-- src/views/ResumeShow.vue -->
<template>
    <div class="resume-display">
      <h1>完整简历</h1>
      <div class="basic-info">
        <img :src="basicInfo.avatar" alt="Avatar" width="100" height="100" />
        <p>姓名: {{ basicInfo.name }}</p>
        <p>年龄: {{ basicInfo.age }}</p>
        <p>工作经验: {{ basicInfo.experience }} 年</p>
      </div>
      <div class="job-intentions">
        <h2>求职意向</h2>
        <ul>
          <li v-for="item in jobIntentions" :key="item.id">
            {{ item.position }} - {{ item.company }}
          </li>
        </ul>
      </div>
      <!-- 其他模块可以在此添加 -->
      <button @click="goBack">返回编辑</button>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import { getBasicInfo, getJobIntentions } from '../services/api'
  import { useRouter } from 'vue-router'
  
  export default {
    setup() {
      const basicInfo = ref({})
      const jobIntentions = ref([])
      const router = useRouter()
  
      onMounted(async () => {
        basicInfo.value = await getBasicInfo()
        jobIntentions.value = await getJobIntentions()
      })
  
      const goBack = () => {
        router.push('/')
      }
  
      return {
        basicInfo,
        jobIntentions,
        goBack
      }
    }
  }
  </script>
  
  <style scoped>
  .resume-display {
    padding: 20px;
  }
  
  .basic-info,
  .job-intentions {
    margin-bottom: 20px;
  }
  
  .job-intentions ul {
    list-style: none;
    padding: 0;
  }
  
  .job-intentions li {
    padding: 5px 0;
  }
  </style>
  