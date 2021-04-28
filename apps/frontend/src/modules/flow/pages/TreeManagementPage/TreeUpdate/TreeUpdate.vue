<template>
        <crud-update :open="open"
                 :loading="loading"
                 :title="title"
                 :errorMessage="errorMessage"
                 @update="update"
                 @close="$emit('close')"
    >
         <tree-form ref="form" v-model="form" :input-errors="inputErrors" />
    </crud-update>
</template>

<script>

    import TreeProvider from "../../../providers/TreeProvider";
    
    import {CrudUpdate, ClientError} from '@dracul/common-frontend'
    
    import TreeForm from "../TreeForm";
  
    

    export default {
        name: "TreeUpdate",
        
        components: { TreeForm, CrudUpdate },
        
        props:{
          open: {type: Boolean, default: true},
          item: {type: Object, required: true}
        },

        data() {
            return {
                title: 'flow.tree.editing',
                errorMessage: '',
                inputErrors: {},
                loading: false,
                form: {
                     id: this.item.id,
                    name: this.item.name,
                    json: this.item.json
                }
            }
        },
        methods: {
            update() {
                if (this.$refs.form.validate()) {
                    this.loading = true
                    TreeProvider.updateTree(this.form).then(r => {
                            if (r) {
                                this.$emit('itemUpdated',r.data.treeUpdate)
                                this.$emit('close')
                            }
                        }
                    ).catch(error => {
                         let clientError = new ClientError(error)
                         this.inputErrors = clientError.inputErrors
                         this.errorMessage = clientError.i18nMessage
                    }).finally(() => this.loading = false)
                }

            }
        },
    }
</script>

<style scoped>

</style>

