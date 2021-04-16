<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-width="120px">
      <el-form-item label="借款额度">
        <el-input-number v-model="integralGrade.borrowAmount" :min="0" />
      </el-form-item>
      <el-form-item label="积分区间开始">
        <el-input-number v-model="integralGrade.integralStart" :min="0" />
      </el-form-item>
      <el-form-item label="积分区间结束">
        <el-input-number v-model="integralGrade.integralEnd" :min="0" />
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate()"
        >
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import integralGradeApi from '@/api/core/integral-grade'
export default {
  data() {
    return {
      integralGrade: {}, // 初始化数据
      saveBtnDisabled: false, // 保存按钮是否禁用，防止表单重复提交
    }
  },
  //页面渲染成功
  created() {
    if (this.$route.params.id) {
      this.fetchDataById(this.$route.params.id)
    }
  },
  methods: {
    saveOrUpdate() {
      // 禁用保存按钮
      this.saveBtnDisabled = true
      // 当不带id的时候调用新增（保存）方法
      if (!this.integralGrade.id) {
        this.saveData()
      } else {
        // 地址中有id 的时候，调用更新数据方法
        this.updateData()
      }
    },
    saveData() {
      integralGradeApi.save(this.integralGrade).then((response) => {
        this.$message.success(response.message)
        this.$router.push('/core/integral-grade/list')
      })
    },
    updateData() {
      integralGradeApi.update(this.integralGrade).then((response) => {
        this.$message.success(response.message)
        this.$router.push('/core/integral-grade/list')
      })
    },
    // 根据id查询记录
    fetchDataById(id) {
      integralGradeApi.getById(id).then((response) => {
        // 这里的record与后台的map集合中的key相对应
        this.integralGrade = response.data.record
      })
    },
  },
}
</script>