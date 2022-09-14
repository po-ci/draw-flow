<template>
<div @click="fetchQueues">
  QUEUE: {{queue}}
<!--  <ul>
    <li v-for="queue in queues" :key="queue">
      {{queue}}
    </li>
  </ul>-->
  <h4>SELECT</h4>

  <select v-if="ready" v-model="queue" ref="queue" df-queue class="inputText">
    <option v-for="q in queues" :key="q.id" :value="q.id">{{q.name}}</option>
  </select>

 <input v-else df-queue v-model="queue" ref="queue">


</div>
</template>

<script>
import axios from 'axios'
export default {
  name: "QueueNode",
  data(){
    return {
      ready: false,
      queues: [],
      queue: null
    }
  },
  created() {
    this.completeValues()
    this.fetchQueues()
  },
  mounted() {
    this.completeValues()
  console.log("MOUNTED", this.$refs.queue.value)
  },
  methods:{
    fetchQueues(){
      axios.get('https://devmcapi.sondeosglobal.com/topics?companyId=1&accessToken=6dd61b6f-a5df-47cc-a6a7-1d127f41e2ec')
          .then(r => {
            this.queues = r.data.data.topics
            this.ready = true
          })
    },
    completeValues(){
      this.$nextTick(() => {
        this.queue = this.$refs.queue.value
      })
    }
  }
}
</script>

<style scoped>
.inputText {
  width: 100%;
  max-width: 150px;
  font-weight: lighter;
}
</style>
