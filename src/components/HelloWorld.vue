<template>
  <form>
    <text-field v-model="login" disabled></text-field>
    <text-field v-model="password"></text-field>
    <my-btn v-ripple :disabled="false" :loading="false" @click="ButtonClickHandler">Login</my-btn>
  </form>
</template>

<script>
import myBtn from "@/components/my-btn.vue";
import customButton from "@/components/customButton/index.vue";
import TextField from "@/components/TextField.vue";
export default {
  name: "HelloWorld",
  components: { myBtn, customButton, TextField },

  data() {
    return {
      login: "UserLogin",
      password: "",
    };
  },

  computed: {
    userData() {
      return "UserLogin";
    },
  },

  methods: {
    ButtonClickHandler() {
      console.log("ButtonClickHandler");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
