<template>
  <v-container fluid>
    <div id="drawflow" ref="drawflow"></div>
  </v-container>

</template>

<script>
import Vue from 'vue'
import Drawflow from 'drawflow'
import StateNode from "../../nodes/StateNode";
import RuleNode from "../../nodes/RuleNode";
import 'drawflow/dist/drawflow.min.css'
import '@/assets/css/tree.css'
import TreeProvider from "@/modules/flow/providers/TreeProvider";

export default {
  name: "TreeViewPage",
  data() {
    return {
      tree: {
        id: null,
        name: null,
        json: null
      },
      nodes: [
        {
          icon: 'radar',
          type: 'StateNode'
        },
        {
          icon: 'rule',
          type: 'RuleNode'
        }
      ],
      loading: false,
      editor: null,
      nodeSelected: null,
      mobile_item_selec: null
    }
  },
  mounted() {

    this.initDrawFlow()
  },
  methods: {
    async checkId() {
      if (this.$route.params.id) {
        this.tree.id = this.$route.params.id
        await this.load()
      }
    },

    async initDrawFlow() {
      await this.checkId()
      this.editor = new Drawflow(this.$refs.drawflow, Vue);

      const props = {};
      const options = {};
      this.editor.registerNode('StateNode', StateNode, props, options);
      this.editor.registerNode('RuleNode', RuleNode, props, options);
      this.editor.start()

      if (this.tree.id && this.tree.json) {
       this.importData()
      }


    },
    importData(){
      this.editor.import(this.tree.json)
    },
    exportData() {
      console.log(JSON.stringify(this.editor.export()));
    },

    load() {
      return new Promise((resolve, reject) => {
        this.loading = true
        TreeProvider.findTree(this.tree.id)
            .then(r => {
              this.tree.id = r.data.treeFind.id
              this.tree.json = r.data.treeFind.json
              this.tree.name = r.data.treeFind.name
              resolve(this.tree)
            })
            .catch(e => reject(e))
            .finally(() => {
              this.loading = false
            })
      })

    },

  }
}
</script>

<style scoped>
#drawflow {
  width: 100%;
  height: 500px;
  border: 1px solid grey;
  text-align:initial;
}
</style>
