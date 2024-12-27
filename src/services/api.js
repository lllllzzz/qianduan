// src/services/api.js
const BASIC_INFO_KEY = 'basicInfo'
const JOB_INTENTIONS_KEY = 'jobIntentions'
const AVATAR_KEY = 'avatar'

export const getBasicInfo = () => {
  return new Promise((resolve) => {
    const data = JSON.parse(localStorage.getItem(BASIC_INFO_KEY)) || {
      name: '张三',
      age: 30,
      experience: 5,
      avatar: 'default-avatar.png'
    }
    setTimeout(() => resolve(data), 500)
  })
}

export const setBasicInfo = (data) => {
  return new Promise((resolve) => {
    localStorage.setItem(BASIC_INFO_KEY, JSON.stringify(data))
    setTimeout(() => resolve(data), 500)
  })
}

export const getJobIntentions = () => {
  return new Promise((resolve) => {
    const data = JSON.parse(localStorage.getItem(JOB_INTENTIONS_KEY)) || [
      { id: 1, position: '前端开发', company: 'ABC公司', status: 'active' }
    ]
    setTimeout(() => resolve(data), 500)
  })
}

export const setJobIntentions = (data) => {
  return new Promise((resolve) => {
    localStorage.setItem(JOB_INTENTIONS_KEY, JSON.stringify(data))
    setTimeout(() => resolve(data), 500)
  })
}

export const getAvatar = () => {
  return localStorage.getItem(AVATAR_KEY) || 'default-avatar.png'
}

export const setAvatar = (data) => {
  localStorage.setItem(AVATAR_KEY, data)
}
