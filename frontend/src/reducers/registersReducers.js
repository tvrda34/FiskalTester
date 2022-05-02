import {
    REGISTER_LIST_REQUEST,
    REGISTER_LIST_SUCCESS,
    REGISTER_LIST_FAIL,

    REGISTER_DETAILS_REQUEST,
    REGISTER_DETAILS_SUCCESS,
    REGISTER_DETAILS_FAIL,

    REGISTER_DELETE_REQUEST,
    REGISTER_DELETE_SUCCESS,
    REGISTER_DELETE_FAIL,

    REGISTER_CREATE_REQUEST,
    REGISTER_CREATE_SUCCESS,
    REGISTER_CREATE_FAIL,
    REGISTER_CREATE_RESET,

    REGISTER_UPDATE_REQUEST,
    REGISTER_UPDATE_SUCCESS,
    REGISTER_UPDATE_FAIL,
    REGISTER_UPDATE_RESET,

} from '../constants/registerConstants'


export const registersListReducer = (state = { registers: [] }, action) => {
    switch (action.type) {
        case REGISTER_LIST_REQUEST:
            return { loading: true, registers: [] }

        case REGISTER_LIST_SUCCESS:
            return {
                loading: false,
                registers: action.payload
            }

        case REGISTER_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}



export const registerDetailsReducer = (state = { register: [] }, action) => {
    switch (action.type) {
        case REGISTER_DETAILS_REQUEST:
            return { loading: true, ...state }

        case REGISTER_DETAILS_SUCCESS:
            return { loading: false, register: action.payload }

        case REGISTER_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const registerDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case REGISTER_DELETE_REQUEST:
            return { loading: true }

        case REGISTER_DELETE_SUCCESS:
            return { loading: false, success: true }

        case REGISTER_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}



export const registerCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case REGISTER_CREATE_REQUEST:
            return { loading: true }

        case REGISTER_CREATE_SUCCESS:
            return { loading: false, success: true, register: action.payload }

        case REGISTER_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case REGISTER_CREATE_RESET:
            return {}

        default:
            return state
    }
}


export const registerUpdateReducer = (state = { register: {} }, action) => {
    switch (action.type) {
        case REGISTER_UPDATE_REQUEST:
            return { loading: true }

        case REGISTER_UPDATE_SUCCESS:
            return { loading: false, success: true, register: action.payload }

        case REGISTER_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case REGISTER_UPDATE_RESET:
            return { register: {} }

        default:
            return state
    }
}