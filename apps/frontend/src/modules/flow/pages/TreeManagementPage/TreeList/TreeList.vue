<template>
  <v-row row wrap>

    <v-col cols="12" sm="6" md="4" offset-md="8" offset-sm="6">
      <search-input @search="performSearch" v-model="search"/>
    </v-col>

    <v-col cols="12">

      <v-data-table
          class="mt-3"
          :headers="headers"
          :items="items"
          :search="search"
          :single-expand="false"
          :server-items-length="totalItems"
          :loading="loading"
          :page.sync="pageNumber"
          :items-per-page.sync="itemsPerPage"
          :sort-by.sync="orderBy"
          :sort-desc.sync="orderDesc"
          :footer-props="{ itemsPerPageOptions: [5, 10, 25, 50] }"
          @update:page="fetch"
          @update:sort-by="fetch"
          @update:sort-desc="fetch"
          @update:items-per-page="fetch"
      >


        <template slot="no-data">
          <div class="text-xs-center" v-t="'common.noData'"></div>
        </template>

        <template slot="loading">
          <div class="text-xs-center" v-t="'common.loading'"></div>
        </template>

        <template v-slot:item.action="{ item }">
          <show-button @click="$router.push({name: 'TreeViewPage', params: {id: item.id}})"/>
          <v-btn x-small color="blue" icon :to="{name: 'TreeEditorPage', params: {id: item.id}}">
            <v-icon>edit</v-icon>
          </v-btn>
          <delete-button @click="$emit('delete', item)"/>

        </template>

      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import TreeProvider from "../../../providers/TreeProvider";

import {DeleteButton, ShowButton, SearchInput} from "@dracul/common-frontend"


export default {
  name: "TreeList",
  components: {DeleteButton, ShowButton, SearchInput},

  data() {
    return {
      items: [],
      totalItems: null,
      loading: false,
      orderBy: null,
      orderDesc: false,
      itemsPerPage: 5,
      pageNumber: 1,
      search: ''
    }
  },
  computed: {
    headers() {
      return [
        //Entity Headers
        {text: this.$t('flow.tree.labels.name'), value: 'name'},
        //  {text: this.$t('flow.tree.labels.json'), value: 'json'},
        //Actions
        {text: this.$t('common.actions'), value: 'action', sortable: false},
      ]
    },
    getOrderBy() {
      return (Array.isArray(this.orderBy)) ? this.orderBy[0] : this.orderBy
    },
    getOrderDesc() {
      return (Array.isArray(this.orderDesc)) ? this.orderDesc[0] : this.orderDesc
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    performSearch() {
      this.pageNumber = 1
      this.fetch()
    },
    fetch() {
      this.loading = true
      TreeProvider.paginateTrees(
          this.pageNumber,
          this.itemsPerPage,
          this.search,
          this.getOrderBy,
          this.getOrderDesc
      ).then(r => {
        this.items = r.data.treePaginate.items
        this.totalItems = r.data.treePaginate.totalItems
      }).catch(err => {
        console.error(err)
      }).finally(() => this.loading = false)
    }
  }

}
</script>


