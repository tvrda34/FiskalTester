export default function registersListReducer (state = {registers:[]}, action) {
    switch(action.type){
        case 'REGISTER_LIST_REQUEST':
            return {loading:true, registers:[]}

        case 'REGISTER_LIST_SUCCESS':
            return {loading:false, registers: action.payload}

        case 'REGISTER_LIST_FAIL':
            return {loading:false, error: action.payload}

        default:
            return state

    }
}