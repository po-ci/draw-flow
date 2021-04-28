<template>
    <crud-show :title="title" :open="open"  @close="$emit('close')">

        <v-card-text>
            <tree-show-data :item="item" />
        </v-card-text>

  </crud-show>
</template>

<script>
    import TreeShowData from "./TreeShowData";
    import {CrudShow} from '@dracul/common-frontend'
 
    export default {
        name: "TreeShow",
        components: {CrudShow, TreeShowData},
        props: {
            open: {type: Boolean, default: true},
            item: {type: Object, required: true}
        },
        data() {
            return {
                title: 'flow.tree.showing',
            }
        },
    }
</script>

