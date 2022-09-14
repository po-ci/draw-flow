<template>
<div @click="fetchQueues">
  QUEUE: {{queue}}
  <h4>SELECT</h4>

  <input v-show="false" df-queue v-model="queue" ref="queue"   type="text" class="inputText">

  <select df-queue v-model="queue"   class="inputText">
    <option v-for="q in queues" :key="q" :value="q">{{q}}</option>
  </select>




</div>
</template>

<script>
import axios from 'axios'
export default {
  name: "QueueNode",
  data(){
    return {
      queues: [],
      queue: null
    }
  },
  mounted() {
    this.completeValues()
    this.fetchQueues()
  },
  methods:{
    fetchQueues(){
      axios.get('http://localhost:3000/queues')
          .then(r => {
            this.queues = r.data
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
