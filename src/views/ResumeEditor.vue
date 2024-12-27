<!-- src/views/ResumeEditor.vue -->
<template>
    <div class="resume-editor">
      <div class="left-panel">
        <AvatarUploader />
        <BasicInfo />
        <JobIntentions />
      </div>
      <div class="right-panel">
        <ProgressBar />
        <button @click="viewResume">查看完整简历</button>
      </div>
    </div>
  </template>
  
  <script>
  import AvatarUploader from '../components/AvatarUploader.vue'
  import BasicInfo from '../components/BasicInfo.vue'
  import JobIntentions from '../components/JobIntentions.vue'
  import ProgressBar from '../components/ProgressBar.vue'
  import { useRouter } from 'vue-router'
  
  export default {
    components: {
      AvatarUploader,
      BasicInfo,
      JobIntentions,
      ProgressBar
    },
    setup() {
      const router = useRouter()
      const viewResume = () => {
        router.push('/resume')
      }
      return {
        viewResume
      }
    }
  }
  </script>
  
  <style scoped>
  .resume-editor {
    display: flex;
    padding: 20px;
  }
  
  .left-panel {
    flex: 1;
    margin-right: 20px;
  }
  
  .right-panel {
    flex: 1;
  }
  </style>
  