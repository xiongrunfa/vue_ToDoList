<template>
  <div id="app">
    <header>
      <section>
        <label for="title">ToDoList</label>
      </section>
    </header>
    <section>
      <add></add>
      <thing :list="list" @getList="getList"></thing>
    </section>
  </div>
</template>

<script>
import add from "./components/add.vue";
import thing from "./components/thing.vue";
export default {
  components: {
    add,
    thing
  },
  name: "app",
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const { data: ret } = await this.$http.get('todos')
      if (ret.success == false) return this.$message.error('获取数据失败')
      this.list = ret.data
    }
  }
};
</script>

<style scoped>
header {
  height: 50px;
  background: #333;
  background: rgba(47, 47, 47, 0.98);
}

section {
  position: relative;
  margin: 0 auto;
}

label {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  width: 100px;
  line-height: 50px;
  color: #ddd;
  font-size: 24px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
</style>
