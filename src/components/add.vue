<template>
  <div>
    <el-button type="info" @click="dialogVisible = true" class="add"
      >添加要做的事</el-button
    >
    <el-dialog title="添加事项" :visible.sync="dialogVisible" width="50%">
      <span>
        <el-form
          ref="formRef"
          :model="form"
          label-width="80px"
          :rules="formRule"
        >
          <el-form-item label="事项标题" prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="事项类型" prop="type">
            <el-radio-group v-model="form.type">
              <el-radio label="LIFE"></el-radio>
              <el-radio label="WORK"></el-radio>
              <el-radio label="JOYS"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="事项内容" prop="desc">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      form: {},
      formRule: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }, {
          min: 3,
          max: 20,
          message: '长度在 2 到 20 个字符',
          trigger: 'blur'
        }],
        type: [{ required: true, message: '请选择类型', trigger: 'change' }],
        desc: [{ required: true, message: '请输入描述', trigger: 'blur' }],
      }
    };
  },
  methods: {
    resetForm() {
      this.dialogVisible = false;
      this.$refs.formRef.resetFields();
    },
    submit() {
      this.$refs.formRef.validate(async (valid) => {
        if (!valid) return
        const { data: ret } = await this.$http.post("todos/create", this.form);
        if (ret.success !== true) return this.$message.error('新增失败')
        this.$message.success('新增成功')
        this.resetForm()
        this.$parent.getList()
      })
    },
  },
};
</script>

<style scoped>
.add {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
</style>
