<script setup lang="ts">
import { ElCard, ElTimeline, ElTimelineItem, ElTag } from 'element-plus'

const versionHistory = [
  {
    version: 'v2.9.0',
    date: '2024-01-15',
    content: '新增多页面支持，优化性能',
    type: 'success' as const
  },
  {
    version: 'v2.8.0',
    date: '2023-12-20',
    content: '升级到 Vue 3.5，Element Plus 2.9',
    type: 'warning' as const
  },
  {
    version: 'v2.7.0',
    date: '2023-11-10',
    content: '新增国际化支持，修复已知问题',
    type: 'info' as const
  }
]

const techStack = [
  'Vue 3.5',
  'TypeScript',
  'Element Plus',
  'Vite',
  'Pinia',
  'Vue Router'
]
</script>

<template>
  <div class="about-container">
    <h1>关于我们</h1>
    
    <el-card class="about-card">
      <template #header>
        <span>项目信息</span>
      </template>
      
      <p>这是一个基于 Vue 3 + Element Plus 的后台管理系统模板，支持多页面应用。</p>
      
      <h3>技术栈</h3>
      <div class="tech-stack">
        <el-tag 
          v-for="tech in techStack" 
          :key="tech" 
          type="primary" 
          class="tech-tag"
        >
          {{ tech }}
        </el-tag>
      </div>
    </el-card>
    
    <el-card class="version-card">
      <template #header>
        <span>版本历史</span>
      </template>
      
      <el-timeline>
        <el-timeline-item
          v-for="item in versionHistory"
          :key="item.version"
          :timestamp="item.date"
          :type="item.type"
        >
          <h4>{{ item.version }}</h4>
          <p>{{ item.content }}</p>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<style scoped>
.about-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.about-container h1 {
  margin-bottom: 20px;
  color: #303133;
  text-align: center;
}

.about-card,
.version-card {
  margin-bottom: 20px;
}

.tech-stack {
  margin: 15px 0;
}

.tech-tag {
  margin-right: 10px;
  margin-bottom: 10px;
}

h3 {
  margin: 20px 0 10px 0;
  color: #606266;
}

h4 {
  margin: 0 0 5px 0;
  color: #303133;
}

p {
  margin: 0;
  color: #606266;
  line-height: 1.6;
}
</style> 