<!-- src/components/AvatarUploader.vue -->
<template>
    <div class="avatar-uploader">
      <img :src="avatar" alt="Avatar" width="100" height="100" />
      <input type="file" accept="image/*" @change="handleAvatarChange" />
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import { getAvatar, setAvatar } from '../services/api'
  
  export default {
    setup() {
      const avatar = ref('default-avatar.png')
  
      onMounted(() => {
        const storedAvatar = getAvatar()
        avatar.value = storedAvatar
      })
  
      const handleAvatarChange = (e) => {
        const file = e.target.files[0]
        if (file) {
          const reader = new FileReader()
          reader.onloadend = () => {
            avatar.value = reader.result
            setAvatar(reader.result)
          }
          reader.readAsDataURL(file)
        }
      }
  
      return {
        avatar,
        handleAvatarChange
      }
    }
  }
  </script>
  
  <style scoped>
  .avatar-uploader {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .avatar-uploader img {
    border-radius: 50%;
    margin-bottom: 10px;
  }
  
  .avatar-uploader input {
    cursor: pointer;
  }
  </style>
  