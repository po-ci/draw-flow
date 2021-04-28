
import { createTree, updateTree, deleteTree,  findTree, fetchTrees, paginateTrees} from '../../services/TreeService'

import {AuthenticationError, ForbiddenError} from "apollo-server-express";

import {

    TREE_SHOW,
    TREE_UPDATE,
    TREE_CREATE,
    TREE_DELETE
} from "../../permissions/Tree";

export default {
    Query: {
        treeFind: (_, {id}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, TREE_SHOW)) throw new ForbiddenError("Not Authorized")
            return findTree(id)
        },
        treeFetch: (_, {}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, TREE_SHOW)) throw new ForbiddenError("Not Authorized")
            return fetchTrees()
        },
        treePaginate: (_, {pageNumber, itemsPerPage, search, orderBy, orderDesc}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, TREE_SHOW)) throw new ForbiddenError("Not Authorized")
            return paginateTrees(pageNumber, itemsPerPage, search, orderBy, orderDesc)
        },
        
    },
    Mutation: {
        treeCreate: (_, {input}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, TREE_CREATE)) throw new ForbiddenError("Not Authorized")
            return createTree(user, input)
        },
        treeUpdate: (_, {id, input}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, TREE_UPDATE)) throw new ForbiddenError("Not Authorized")
            return updateTree(user, id, input)
        },
        treeDelete: (_, {id}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, TREE_DELETE)) throw new ForbiddenError("Not Authorized")
            return deleteTree(id)
        },
    }

}

