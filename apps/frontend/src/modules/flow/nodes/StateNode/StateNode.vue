<template>
  <div>

    <div v-if="!editing" @click="edit">
      <v-icon left>{{ icon }}</v-icon>
      <span class=" font-weight-light" df-name> {{ name }}</span><br>
      <span>{{ description }}</span>
    </div>

    <template v-show="editing">
      <input
          :hidden="!editing"
          class="inputText"
          ref="name"
          type="text"
          df-name
          v-model="name"
      />
      <br>
      <select
          :hidden="!editing"
          ref="area"
          class="inputText"
          df-area
          v-model="area"
      >
        <option value="Dev">Dev</option>
        <option value="QA">QA</option>
      </select>
      <br>
      <textarea
          cols="2" rows="2"
          :hidden="!editing"
          class="inputText"
          df-description
          ref="description"
          v-model="description"
      >
      </textarea>
      <br>
    </template>


    <v-btn
        v-if="editing"
        @click="done"
        small
        color="green"
        dark
    >
      done
    </v-btn>

  </div>
</template>

<script>

export default {
  name: "StateNode",
  data() {
    return {
      editing: false,
      hover: false,
      name: null,
      description: null,
      area: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.name = this.$refs.name.value
      this.description = this.$refs.description.value
      this.area = this.$refs.area.value
    })
  },
  computed: {
    icon() {
      switch (this.area) {
        case 'Dev':
          return 'laptop_mac'
        case 'QA':
          return 'bug_report'
        default:
          return 'edit'
      }
    }
  },
  methods: {
    edit() {
      console.log("edit")
      if (this.editing === false)
        this.editing = true
    },
    done() {
      console.log("Done")
      this.editing = false
    }
  }
}
</script>

<style scoped>

.inputText {
  width: 100%;
  max-width: 120px;
}

.inputText:hover {
  border: 1px solid #dddddd;
  outline: none;
}

.inputText:focus {
  border: 1px solid #dddddd;
  outline: none;
}

</style>

