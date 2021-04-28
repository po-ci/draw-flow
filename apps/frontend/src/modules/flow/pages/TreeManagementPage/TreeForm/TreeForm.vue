<template>
    <v-form ref="form" autocomplete="off" @submit.prevent="save" >
        <v-row>
           
                    <v-col cols="12" sm="6">
                        <v-text-field
                                
                                prepend-icon="badge"
                                name="name"
                                v-model="form.name"
                                :label="$t('flow.tree.labels.name')"
                                :placeholder="$t('flow.tree.labels.name')"
                                :error="hasInputErrors('name')"
                                :error-messages="getInputErrors('name')"
                                color="secondary"
                                :rules="required"
                        ></v-text-field>
                    </v-col>
    
 
                    <v-col cols="12" sm="6">
                        <v-text-field
                                
                                prepend-icon="account_tree"
                                name="json"
                                v-model="form.json"
                                :label="$t('flow.tree.labels.json')"
                                :placeholder="$t('flow.tree.labels.json')"
                                :error="hasInputErrors('json')"
                                :error-messages="getInputErrors('json')"
                                color="secondary"
                                
                        ></v-text-field>
                    </v-col>
    
        </v-row>
    </v-form>
</template>

<script>

    import {InputErrorsByProps, RequiredRule } from '@dracul/common-frontend'
    
    
    
    

    

    export default {
        name: "TreeForm",
        mixins: [InputErrorsByProps, RequiredRule    ],
        
        props:{
            value: {
                type: Object,
                required: true
            },
        },
        computed: {
           form: {
                get() { return this.value },
                set(val) {this.$emit('input', val)}
            }
        },
         watch: {
            form: {
                handler(newVal) {
                    this.$emit('input', newVal)
                },
                deep: true
            }
        },
        methods: {
            validate(){
              return this.$refs.form.validate()
            }
        },
        data(){
            return {
                
            }
        }
    }
</script>

<style scoped>

</style>

