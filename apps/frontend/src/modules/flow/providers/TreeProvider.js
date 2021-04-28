import graphqlClient from "../../../apollo";

class TreeProvider {

    findTree(id) {
        return graphqlClient.query({
            query: require('./gql/treeFind.graphql'),
            variables: {id:id}
        })
    }

    fetchTrees() {
        return graphqlClient.query({query: require('./gql/treeFetch.graphql')})
    }
    
    paginateTrees(pageNumber, itemsPerPage, search = null,  orderBy = null, orderDesc = false) {
        return graphqlClient.query({
            query: require('./gql/treePaginate.graphql'),
            variables: {pageNumber, itemsPerPage, search, orderBy, orderDesc},
            fetchPolicy: "network-only"
        })
    }
    
    

    createTree(form) {
        return graphqlClient.mutate({
            mutation: require('./gql/treeCreate.graphql'),
            variables: form
        })
    }
    
    updateTree(form) {
        return graphqlClient.mutate({
            mutation: require('./gql/treeUpdate.graphql'),
            variables: form
        })
    }
    
     deleteTree(id) {
        return graphqlClient.mutate({
            mutation: require('./gql/treeDelete.graphql'),
            variables: {id}
        })
    }

}

export default new TreeProvider()


