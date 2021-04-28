<template>
  <div>
    <v-row v-if="!editing" @click="doubleClick">
      <v-col class="flex-grow-0 flex-shrink-1 pr-0 py-0">
      <v-tooltip  bottom>
        <template v-slot:activator="{ on }">
            <v-icon v-on="on" left :color="color">{{ icon }}</v-icon>
        </template>
        <span>{{ text }}</span>
      </v-tooltip>
      </v-col>
      <v-col class="flex-grow-1 flex-shrink-0 pl-0 py-0">
        <v-tooltip  bottom>
          <template v-slot:activator="{ on }">
            <span v-on="on" df-name> {{ name }}</span><br>
          </template>
          <p v-if="description" class="font-weight-light description">"{{ description }}"</p>
        </v-tooltip>
      </v-col>
    </v-row>



    <input
        :hidden="!editing"
        class="inputText"
        ref="name"
        type="text"
        df-name
        v-model="name"
    />
    <br v-if="editing">
    <select
        :hidden="!editing"
        ref="area"
        class="inputText"
        df-area
        v-model="area"
    >
      <option v-for="area in areas" :key="area.id" :value="area.id">{{area.text}}</option>
    </select>
    <br v-if="editing">
    <textarea
        cols="2" rows="2"
        :hidden="!editing"
        class="inputText"
        df-description
        ref="description"
        v-model="description"
    >
      </textarea>
    <br v-if="editing">


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
      click: null,
      editing: false,
      hover: false,
      name: null,
      description: null,
      area: null,
      areas: [
        {
          id: 'DEV',
          text: 'Developers',
          icon: 'code',
          color: 'cyan'
        },
        {
          id: 'TL',
          text: 'Team Leader',
          icon: 'grade',
          color: 'yellow'
        },
        {
          id: 'PO',
          text: 'Product Owner',
          icon: 'work',
          color: 'blue'
        },
        {
          id: 'QA',
          text: 'Quality assurance',
          icon: 'bug_report',
          color: 'purple'
        },
        {
          id: 'IF',
          text: 'Infraestructura',
          icon: 'dns',
          color: 'orange'
        },
        {
          id: 'SP',
          text: 'Soporte',
          icon: 'support_agent',
          color: 'red'
        },
        {
          id: 'DONE',
          text: 'DONE',
          icon: 'check',
          color: 'green'
        }
      ]
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
      let area = this.areas.find(a => a.id === this.area)
      return area ? area.icon : 'edit'
    },
    color() {
      let area = this.areas.find(a => a.id === this.area)
      return area ? area.color : 'grey'
    },
    text() {
      let area = this.areas.find(a => a.id === this.area)
      return area ? area.text : 'NA'
    }
  },
  methods: {
    doubleClick() {

      if (this.click) {
        clearTimeout(this.click)
        this.edit()
      }
      this.click = setTimeout(() => {
        this.click = undefined
      }, 200)

    },
    edit() {
      if (this.editing === false)
        this.editing = true
    },
    done() {
      this.editing = false
    }
  }
}
</script>

<style scoped>

.description{
  width: 150px;
}

.inputText {
  width: 100%;
  max-width: 150px;
  font-weight: lighter;
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

