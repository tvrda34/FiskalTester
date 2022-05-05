import {
    TEST_LIST_REQUEST,
    TEST_LIST_SUCCESS,
    TEST_LIST_FAIL,

    TEST_DETAILS_REQUEST,
    TEST_DETAILS_SUCCESS,
    TEST_DETAILS_FAIL,


    TEST_DELETE_REQUEST,
    TEST_DELETE_SUCCESS,
    TEST_DELETE_FAIL,

} from '../constants/testConstants'


export const testsListReducer = (state = { tests: [] }, action) => {
    switch (action.type) {
        case TEST_LIST_REQUEST:
            return { loading: true, tests: [] }

        case TEST_LIST_SUCCESS:
            return {
                loading: false,
                tests: action.payload
            }

        case TEST_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const testDetailsReducer = (state = { tests: [] }, action) => {
    switch (action.type) {
        case TEST_DETAILS_REQUEST:
            return { loading: true, ...state }

        case TEST_DETAILS_SUCCESS:
            return { loading: false, tests: action.payload }

        case TEST_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const testDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case TEST_DELETE_REQUEST:
            return { loading: true }

        case TEST_DELETE_SUCCESS:
            return { loading: false, success: true }

        case TEST_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}