<template>
  <div id="showMessage">
    <div id="div3">
      <div id="div2">{{ showMessage.title }}</div>
      <div style="width: 99%;text-align: center;margin: 50px 0 0 0">
        <router-link to="/">返回首页</router-link>
      </div>
      <div id="div1" v-html="showMessage.body">
      </div>
      <div style="text-align: right">发布时间:
        <div style="font-weight: bolder;display: inline-block">{{ showMessage.date }}</div>
      </div>
      <div style="text-align: right">新闻作者:
        <div style="font-weight: bolder;display: inline-block">{{ showMessage.writer }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {getData} from "@/api/showMessage";

export default {
  name: "showMessage",
  data() {
    return {
      id: 1,
      showMessage: {}
    }
  },
  methods: {},
  mounted() {
    getData(this.$route.params.id).then().then(response => {
      this.showMessage = response.data;
    }).catch(error => {
      console.error("获取新闻数据失败:", error);
    });
  }

}
</script>
<style scoped>
#div1{
  width: 95%;
  /*border: 1px red solid;*/
  text-indent:2em;
  margin: 0 auto;
}
#div2{
  width: 85%;
  height: 50px;
  color:black;
  font-weight: bolder;
  font-size: 40px;
  text-align: center;
}
#div3{
  width: 1020px;
  margin: 0 auto;
  background-color: #FFFAFA;
}
#div1 img{
  margin-left: 15%;
}

</style>
