import {createSlice} from '@reduxjs/toolkit'

export const AdminAuth = createSlice({
    name:'Admin',
    initialState:{
        Token    : null,
        userName : null
    },
    reducers:{
        AdminLogin(state,action){
            state.Token = action.payload.token
        },
        AdminLogout(state,action){
            state.Token = ''
        },
        AdminName(state,action){
            state.userName = action.payload.name
        }
    }
})

export const {AdminLogin,AdminLogout,AdminName} = AdminAuth.actions
export const Adminreducer= AdminAuth.reducer;
