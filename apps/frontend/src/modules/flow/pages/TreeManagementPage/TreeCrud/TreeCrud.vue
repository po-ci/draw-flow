<template>
  <crud-layout :title="title" :subtitle="subtitle">

    <template v-slot:list>
      <tree-list
          ref="list"
          @update="update"
          @delete="remove"
          @show="show"

      />
    </template>

    <add-button @click="create"></add-button>

    <tree-create v-if="creating"
                 :open="creating"
                 v-on:itemCreated="onItemCreated"
                 v-on:close="creating=false"
    />

    <tree-update v-if="updating"
                 :open="updating"
                 :item="itemToEdit"
                 v-on:itemUpdated="onItemUpdated"
                 v-on:close="updating=false"
    />

    <tree-show v-if="showing"
               :open="showing"
               :item="itemToShow"
               v-on:close="showing=false"
    />

    <tree-delete v-if="deleting"
                 :open="deleting"
                 :item="itemToDelete"
                 v-on:itemDeleted="onItemDeleted"
                 v-on:close="deleting=false"
    />

    <snackbar v-model="flash"/>

  </crud-layout>
</template>

<script>

import TreeCreate from "../TreeCreate";
import TreeUpdate from "../TreeUpdate";
import TreeDelete from "../TreeDelete";
import TreeShow from "../TreeShow";
import TreeList from "../TreeList";

import {CrudLayout, AddButton, Snackbar} from "@dracul/common-frontend"

export default {
  name: "TreeCrud",
  components: {
    CrudLayout, AddButton, Snackbar,
    TreeCreate,
    TreeUpdate,
    TreeDelete,
    TreeShow,
    TreeList
  },
  data() {
    return {
      title: 'flow.tree.title',
      subtitle: 'flow.tree.subtitle',
      flash: null,
      creating: false,
      updating: false,
      deleting: false,
      showing: false,
      itemToEdit: null,
      itemToDelete: null,
      itemToShow: null,
    }
  },
  methods: {
    //On
    onItemCreated() {
      this.$refs.list.fetch()
      this.flash = "common.created"
    },
    onItemUpdated() {
      this.$refs.list.fetch()
      this.flash = "common.updated"
    },
    onItemDeleted() {
      this.$refs.list.fetch()
      this.flash = "common.deleted"
    },
    //Open
    create() {
      this.$router.push({name: 'TreeEditorPage'})
    },
    update(item) {
      this.updating = true
      this.itemToEdit = item
    },
    show(item) {
      this.showing = true
      this.itemToShow = item
    },
    remove(item) {
      this.deleting = true
      this.itemToDelete = item
    }
  }

}
</script>


