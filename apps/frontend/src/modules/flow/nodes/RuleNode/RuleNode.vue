<template>
  <div>
    <v-icon>rule</v-icon>
     <input class="inputText" type="text" df-name v-model="name"  />
  </div>
</template>

<script>
export default {
  name: "RuleNode",
  data(){
    return {
      name: ""
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.inputText{
  width: 100%;
}
</style>

