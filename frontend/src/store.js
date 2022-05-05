//import { configureStore } from '@reduxjs/toolkit';
import { createStore, combineReducers, applyMiddleware  } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
    userVerifyReducer,
} from './reducers/userReducers'

import { 
    registersListReducer,
    registerCreateReducer,
    registerDeleteReducer,
    registerUpdateReducer,
    registerDetailsReducer,
 } from './reducers/registersReducers'

 import { 
     testsListReducer,
     testDetailsReducer,
     testDeleteReducer, 
} from './reducers/testReducers'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    verified: userVerifyReducer,

    registersList: registersListReducer,
    registerDelete: registerDeleteReducer,
    registerCreate: registerCreateReducer,
    registerDetails: registerDetailsReducer,
    registerUpdate: registerUpdateReducer,

    testsList: testsListReducer,
    testDetails: testDetailsReducer,
    testDelete: testDeleteReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store