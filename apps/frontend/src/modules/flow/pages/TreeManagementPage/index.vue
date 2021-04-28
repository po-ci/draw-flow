<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" class="pa-3">
               <tree-crud />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import TreeCrud from "./TreeCrud";
    export default {
        name: "Tree",
        components: {TreeCrud}
    }
</script>

<style scoped>

</style>

