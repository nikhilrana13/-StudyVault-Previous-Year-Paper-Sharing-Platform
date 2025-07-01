import { createSlice } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";




export const UserSlice = createSlice({
    name:"Auth",
    initialState:{
        user:null
    },
    reducers:{
        SetUser:(state,action)=>{
            state.user = action.payload
        }
    }
})
export const{SetUser} = UserSlice.actions
export const persistconfig = {
    key:"Auth",
    storage:sessionStorage
}
export const persistedReducer = persistReducer(persistconfig,UserSlice.reducer)
export default persistReducer
