<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-table :data="list" border stripe>
      <el-table-column type="index" width="50" />
      <el-table-column prop="borrowAmount" label="借款额度" />
      <el-table-column prop="integralStart" label="积分区间开始" />
      <el-table-column prop="integralEnd" label="积分区间结束" />
      <el-table-column label="操作" width="200" align="center">
    <template slot-scope="scope">
        <el-button
                   type="danger"
                   size="mini"
                   icon="el-icon-delete"
                   @click="removeById(scope.row.id)"
                   >
            删除
        </el-button>
    </template>
</el-table-column>
    </el-table>
  </div>
</template>

<script>
import integralGradeApi from '@/api/core/integral-grade.js'
export default{
  data () {
    return {
      // 定义一个数组，接受后端传入的对象
      list: []
    }
  },
  // 定义响应拦截器
  // 项目构建的时候进行加载
  created(){
    this.fetchData()
  },
  methods: {
    fetchData(){
      integralGradeApi.list().then((response)=>{
        this.list = response.data.list;
      })
    },
    // 根据id删除记录
    removeById(id){
      // 这里使用的是elementui框架的提示框
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      // axios
      .then( () => {
        integralGradeApi.removeById(id).then(response=>{
          this.$message.success(response.message)
          this.fetchData()
        })
      })
      .catch(error=>{
        this.$message.info('取消删除')
      })
    }
  }
}
</script>