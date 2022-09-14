<template>
<div @click="fetchQueues">
  QUEUE
  <ul>
    <li v-for="queue in queues" :key="queue">
      {{queue}}
    </li>
  </ul>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: "QueueNode",
  data(){
    return {
      queues: []
    }
  },
  created() {
    this.fetchQueues()
  },
  methods:{
    fetchQueues(){
      axios.get('http://localhost:3000/queues')
          .then(r => {
            this.queues = r.data
          })
    }
  }
}
</script>

<style scoped>

</style>
