<template>
  <div class="container">
    <div class="app-container">
        <el-tree default-expand-all :expand-on-click-node="false" :data="depts" :props="defaultProps">
        <!-- 节点结构 -->
        <!-- v-slot="{ node, data }" 只能作用在template -->
        <template v-slot="{ data }">
          <el-row style="width:100%;height:40px" type="flex" justify="space-between" align="middle">
            <el-col>{{ data.name }}</el-col>
            <el-col :span="4">
              <span class="tree-manager">{{ data.managerName }}</span>
              <!-- $event 实参 表示类型 -->
              <el-dropdown @command="operateDept($event, data.id)">
                <!-- 显示区域内容 -->
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <!-- 下拉菜单选项 -->
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                  <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                  <el-dropdown-item command="del">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
  </el-tree>
    </div>
    <add-dept ref="addDept" @updateDepartment="getDepartment" :current-node-id="currentNodeId" :show-dialog.sync="showDialog"  />
  </div>
</template>
<script>
import { getDepartment } from '@/api/department'
import {transListToTreeData} from '@/utils'
import AddDept from './components/add-dept.vue'
export default {
  name: 'Department',
  components:{AddDept},
  data() {
    return  {
        currentNodeId: null, // 存储当前点击的id
        showDialog: false,
      depts: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  created() {
    this.getDepartment() // 调用获取数据的接口
  },
   methods: {
    // 封装好方法
    async getDepartment() {
      const result = await getDepartment()
      this.depts = transListToTreeData(result, 0)
    },
    // 操作部门方法
    operateDept(type, id) {
      if (type === 'add') {
        // 添加子部门
        this.showDialog = true // 显示弹层
        this.currentNodeId = id
      } else if (type === 'edit') {
        // 编辑部门场景
        this.showDialog = true
        this.currentNodeId = id // 记录id 要用它获取数据
        // 更新props- 异步动作
        // 直接调用了子组件的方法 同步的方法
        // 要在子组件获取数据
        // 父组件调用子组件的方法来获取数据
        this.$nextTick(() => {
          this.$refs.addDept.getDepartmentDetail() // this.$refs.addDept等同于子组件的this
        })
      } 
    }
  }
}
</script>
<style scoped>
.app-container {
    padding: 30px 140px;
    font-size:14px;
}
.tree-manager {
  width: 50px;
  display: inline-block;
  margin: 35px;
}
</style>
