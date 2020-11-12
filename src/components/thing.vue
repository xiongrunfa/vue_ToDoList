<template>
  <div>
    <el-tabs
      v-model="activeName"
      class="el_tabs"
      :stretch="true"
      @tab-click="handleclick"
    >
      <el-tab-pane label="生活" name="LIFE">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>正在进行</span>
          </div>
          <div class="text">
            <ol>
              <li
                v-for="item in todoThing"
                :key="item.id"
                @click="viewTodo(item.id)"
              >
                {{ item.title }}<span @click.stop="shanchu(item.id)">删除</span>
              </li>
            </ol>
          </div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>已经完成</span>
          </div>
          <div class="text">
            <ol>
              <li
                v-for="item in doneThing"
                :key="item.id"
                @click="viewTodo(item.id)"
              >
                {{ item.title }}<span @click.stop="shanchu(item.id)">删除</span>
              </li>
            </ol>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="工作" name="WORK">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>正在进行</span>
          </div>
          <div class="text">
            <ol>
              <li
                v-for="item in todoThing"
                :key="item.id"
                @click="viewTodo(item.id)"
              >
                {{ item.title }}<span @click.stop="shanchu(item.id)">删除</span>
              </li>
            </ol>
          </div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>已经完成</span>
          </div>
          <div class="text">
            <ol>
              <li
                v-for="item in doneThing"
                :key="item.id"
                @click="viewTodo(item.id)"
              >
                {{ item.title }}<span @click.stop="shanchu(item.id)">删除</span>
              </li>
            </ol>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="娱乐" name="JOYS">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>正在进行</span>
          </div>
          <div class="text">
            <ol>
              <li
                v-for="item in todoThing"
                :key="item.id"
                @click="viewTodo(item.id)"
              >
                {{ item.title }}<span @click.stop="shanchu(item.id)">删除</span>
              </li>
            </ol>
          </div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>已经完成</span>
          </div>
          <div class="text">
            <ol>
              <li
                v-for="item in doneThing"
                :key="item.id"
                @click="viewTodo(item.id)"
              >
                {{ item.title }}<span @click.stop="shanchu(item.id)">删除</span>
              </li>
            </ol>
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      title="正在进行"
      :visible.sync="todoVisible"
      width="50%"
      @close="visibleClose"
    >
      <span>
        <el-form
          ref="formRef"
          :model="viewList"
          label-width="80px"
          :rules="formRule"
        >
          <el-form-item label="事项标题" prop="title">
            <el-input
              v-model="viewList.title"
              :disabled="viewList.accomplished"
            ></el-input>
          </el-form-item>
          <el-form-item label="事项内容" prop="desc">
            <el-input
              type="textarea"
              v-model="viewList.desc"
              :disabled="viewList.accomplished"
            ></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updata" v-if="viewList.accomplished == false"
          >修改</el-button
        >
        <el-button type="primary" @click="toggle">{{
          viewList.accomplished == false ? "完成" : "继续进行"
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data() {
    return {
      activeName: "LIFE",
      sonlist: [],
      todoThing: [],
      doneThing: [],
      label: {
        LIFE: '生活',
        WORK: '工作',
        JOYS: '娱乐'
      },
      todoVisible: false,
      viewList: [],
      formRule: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' },
        {
          min: 2,
          max: 20,
          message: '长度在 2 到 20 个字符',
          trigger: 'blur'
        }],
        desc: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    visibleClose() {
      this.$emit('getList')
    },
    handleclick(tab, event) {
      this.activeName = tab.name
      this.filterList()
    },
    filterList() {
      this.todoThing = this.sonlist.filter(item => {
        return item.accomplished == false && item.type == this.activeName
      })
      this.doneThing = this.sonlist.filter(item => {
        return item.accomplished == true && item.type == this.activeName
      })
    },
    viewTodo(id) {
      this.viewList = this.sonlist.filter(item => {
        return item.id == id
      })[0]
      this.todoVisible = true
    },
    async shanchu(id) {
      console.log(id);
      const ret = await this.$http.delete('todos/delete', {
        data: {
          "id": id
        }
      })
      if (ret.success == false) return this.$message.error('删除失败')
      this.$message.success('删除成功')
      this.$emit('getList')
    },
    updata() {
      this.$refs.formRef.validate(async valid => {
        if (!valid) return
        const { data: ret } = await this.$http.put('todos/update', {
          "id": this.viewList.id,
          "title": this.viewList.title,
          "desc": this.viewList.desc,
        })
        if (ret.success == false) return this.$message.error('更新失败')
        this.$message.success('更新成功')
        this.viewList = {}
        this.todoVisible = false
        // this.$emit('getList')
      })
    },
    async toggle() {
      const { data: ret } = await this.$http.post('todos/toggle', {
        "id": this.viewList.id
      })
      if (ret.success == false) return this.$message.error('切换失败')
      this.$message.success('切换成功')
      this.viewList = {}
      this.todoVisible = false
      //   this.$emit('getList')
    }
  },
  watch: {
    list: function (newval, oldval) {
      this.sonlist = newval
      this.filterList()
    }
  }
}
</script>

<style scoped>
.el_tabs {
  position: absolute;
  top: 50px;
  left: 50%;
  width: 900px;
  transform: translate(-50%);
}
.text {
  font-size: 14px;
  margin-bottom: 18px;
}
.text ol {
  margin: 0;
  padding: 0;
}
ol li {
  /* float: left; */
  /* margin-right: 30px; */
  color: blue;
  font-size: 18px;
}
ol li span {
  color: cadetblue;
  margin-left: 20px;
  cursor: pointer;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  float: left;
  width: 49%;
  height: 400px;
  background-color: #ddd;
}
</style>