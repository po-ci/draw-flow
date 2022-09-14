<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12" class="pa-0">
        <v-row class="pa-3">
          <v-col cols="12" md="4">
            <v-text-field hide-details filled v-model="tree.name" label="name"></v-text-field>
          </v-col>
          <v-col class="flex-grow-1 text-right">
            <v-btn @click="exportData" class="mx-1">export</v-btn>
            <v-btn @click="save" class="mx-1">save</v-btn>
          </v-col>

        </v-row>

      </v-col>
      <v-col cols="12">
        <v-row>

          <v-col class="flex-shrink-0 flex-grow-0">

            <v-row>
              <v-col cols="12" class="py-0 text-center">IN</v-col>
              <v-col cols="12" class="pa-0 text-center">
                <v-btn icon @click="removeIn">
                  <v-icon>remove</v-icon>
                </v-btn>
                <v-btn icon @click="addIn">
                  <v-icon>add</v-icon>
                </v-btn>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" class="py-0 text-center">OUT</v-col>
              <v-col cols="12" class="pa-0 text-center">
                <v-btn icon @click="removeOut">
                  <v-icon>remove</v-icon>
                </v-btn>
                <v-btn icon @click="addOut">
                  <v-icon>add</v-icon>
                </v-btn>
              </v-col>
            </v-row>

            <v-card>
              <v-navigation-drawer
                  permanent
                  expand-on-hover
              >
                <v-list>

                  <v-list-item
                      v-for="(node,index) in nodes"
                      :key="index"
                      draggable="true"
                      @dragstart="drag"
                      :data-node="node.type"
                  >
                    <v-list-item-icon>
                      <v-icon>{{ node.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{ node.type }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-navigation-drawer>
            </v-card>
          </v-col>

          <v-col class="flex-grow-1">
            <div id="drawflow" ref="drawflow" @drop="drop" @dragover="allowDrop"></div>
          </v-col>
        </v-row>

      </v-col>


    </v-row>

  </v-container>

</template>

<script>
import Vue from 'vue'
import Drawflow from 'drawflow'
import StateNode from "../../nodes/StateNode";
import RuleNode from "../../nodes/RuleNode";
import QueueNode from "../../nodes/QueueNode";
import 'drawflow/dist/drawflow.min.css'
import '@/assets/css/tree.css'
import TreeProvider from "@/modules/flow/providers/TreeProvider";

export default {
  name: "TreeEditorPage",
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
        },
        {
          icon: 'cloud_queue',
          type: 'QueueNode'
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
    addIn() {
      this.editor.addNodeInput(this.nodeSelected)
    },
    removeIn() {
      let node = this.editor.getNodeFromId(this.nodeSelected)
      this.editor.removeNodeInput(this.nodeSelected, 'input_' + Object.keys(node.outputs).length)
    },
    addOut() {
      this.editor.addNodeOutput(this.nodeSelected)
    },
    removeOut() {
      let node = this.editor.getNodeFromId(this.nodeSelected)
      this.editor.removeNodeOutput(this.nodeSelected, 'output_' + Object.keys(node.outputs).length)
    },
    editorOnSelected() {
      this.editor.on('nodeSelected', (id) => {
        this.nodeSelected = id
        this.editor.updateConnectionNodes(id)
      })
    },
    async initDrawFlow() {
      await this.checkId()
      this.editor = new Drawflow(this.$refs.drawflow, Vue);
      this.editorOnSelected()

      const props = {};
      const options = {};
      this.editor.registerNode('StateNode', StateNode, props, options);
      this.editor.registerNode('RuleNode', RuleNode, props, options);
      this.editor.registerNode('QueueNode', QueueNode, props, options);
      this.editor.start()


      if (this.tree.id && this.tree.json) {
       this.importData()
      } else {
        const data = {'name': ''};
        this.editor.addNode('StateNode', 0, 1, 20, 20, '', data, 'StateNode', 'vue');
      }


    },
    importData(){
      this.editor.import(this.tree.json)
    },
    exportData() {
      console.log(JSON.stringify(this.editor.export()));
      // let ex = this.editor.export()
      // this.editor.import(ex)
    },
    save() {
      this.tree.json = this.editor.export()
      if (this.tree.id) {
        this.update()
      } else {
        this.create()
      }
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
    update() {
      return new Promise((resolve, reject) => {
        this.loading = true
        TreeProvider.updateTree(this.tree)
            .then(r => {
              this.tree = r.data.treeUpdate
              resolve(this.tree)
            })
            .catch(e => reject(e))
            .finally(() => {
              this.loading = false
            })
      })
    },
    create() {
      return new Promise((resolve, reject) => {
        this.loading = true
        TreeProvider.createTree(this.tree)
            .then(r => {
              this.tree = r.data.treeCreate
              resolve(this.tree)
            })
            .catch(e => reject(e))
            .finally(() => {
              this.loading = false
            })
      })
    },
    positionMobile(ev) {
      this.mobile_last_move = ev;
    },
    allowDrop(ev) {
      ev.preventDefault();
    },
    drag(ev) {
      console.log("DRAG")
      if (ev.type === "touchstart") {
        this.mobile_item_selec = ev.target.closest(".drag-drawflow").getAttribute('data-node');
      } else {
        console.log(ev.target.getAttribute('data-node'))
        ev.dataTransfer.setData("node", ev.target.getAttribute('data-node'));
      }
    },
    drop(ev) {
      if (ev.type === "touchend") {
        let parentdrawflow = document.elementFromPoint(this.mobile_last_move.touches[0].clientX, this.mobile_last_move.touches[0].clientY).closest("#drawflow");
        if (parentdrawflow != null) {
          this.addNodeToDrawFlow(this.mobile_item_selec, this.mobile_last_move.touches[0].clientX, this.mobile_last_move.touches[0].clientY);
        }
        this.mobile_item_selec = null;
      } else {
        ev.preventDefault();
        let data = ev.dataTransfer.getData("node");
        this.addNodeToDrawFlow(data, ev.clientX, ev.clientY);
      }

    },
    addNodeToDrawFlow(name, pos_x, pos_y) {
      if (this.editor.editor_mode === 'fixed') {
        return false;
      }
      pos_x = pos_x * (this.editor.precanvas.clientWidth / (this.editor.precanvas.clientWidth * this.editor.zoom)) - (this.editor.precanvas.getBoundingClientRect().x * (this.editor.precanvas.clientWidth / (this.editor.precanvas.clientWidth * this.editor.zoom)));
      pos_y = pos_y * (this.editor.precanvas.clientHeight / (this.editor.precanvas.clientHeight * this.editor.zoom)) - (this.editor.precanvas.getBoundingClientRect().y * (this.editor.precanvas.clientHeight / (this.editor.precanvas.clientHeight * this.editor.zoom)));

      switch (name) {
        case 'StateNode':
          this.editor.addNode('StateNode', 1, 1, pos_x, pos_y, '', {'name': '', description: '', area: ''}, 'StateNode', 'vue');
          break;
        case 'RuleNode':
          this.editor.addNode('RuleNode', 1, 2, pos_x, pos_y, '', {'name': ''}, 'RuleNode', 'vue');
          break;
        case 'QueueNode':
          this.editor.addNode('QueueNode', 1, 2, pos_x, pos_y, '', {'name': ''}, 'QueueNode', 'vue');
          break;
      }
    }
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
