import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sessionStorage from "redux-persist/es/storage/session";
import persistReducer from "redux-persist/es/persistReducer";
import { UserSlice } from "./UserSlice";
import persistStore from "redux-persist/es/persistStore";
import { PaperSlice } from "./PaperSlice";



const userpersistconfig = {
    key:"Auth",
    storage:sessionStorage
}

const persistconfiguser = persistReducer(userpersistconfig,UserSlice.reducer)
const rootreducer = combineReducers({
    Auth:persistconfiguser,
    Papers:PaperSlice.reducer
})

export const store = configureStore({
    reducer:rootreducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:false}),
})

export const persistor = persistStore(store)