<script setup lang="ts">
import { ref } from 'vue'
import { ElCard, ElRow, ElCol, ElStatistic, ElProgress } from 'element-plus'

const statistics = ref([
  { title: '总用户数', value: 1234, suffix: '人' },
  { title: '今日访问', value: 567, suffix: '次' },
  { title: '订单数量', value: 89, suffix: '单' },
  { title: '收入金额', value: 12345, suffix: '元' }
])

const progressData = ref([
  { name: 'CPU使用率', percentage: 65 },
  { name: '内存使用率', percentage: 45 },
  { name: '磁盘使用率', percentage: 78 }
])
</script>

<template>
  <div class="dashboard-container">
    <h1>仪表板</h1>
    
    <!-- 统计卡片 -->
    <el-row :gutter="20" class="statistics-row">
      <el-col :span="6" v-for="item in statistics" :key="item.title">
        <el-card>
          <el-statistic 
            :title="item.title" 
            :value="item.value" 
            :suffix="item.suffix"
          />
        </el-card>
      </el-col>
    </el-row>
    
    <!-- 进度条 -->
    <el-row :gutter="20" class="progress-row">
      <el-col :span="8" v-for="item in progressData" :key="item.name">
        <el-card>
          <template #header>
            <span>{{ item.name }}</span>
          </template>
          <el-progress 
            :percentage="item.percentage" 
            :color="item.percentage > 70 ? '#f56c6c' : '#409eff'"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.dashboard-container {
  padding: 20px;
}

.dashboard-container h1 {
  margin-bottom: 20px;
  color: #303133;
}

.statistics-row {
  margin-bottom: 20px;
}

.progress-row {
  margin-bottom: 20px;
}

.el-card {
  margin-bottom: 20px;
}
</style> 