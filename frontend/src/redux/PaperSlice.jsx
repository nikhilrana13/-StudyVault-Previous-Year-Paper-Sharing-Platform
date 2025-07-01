import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    paper:[],
    loading:false,
    error:null,
    status:'idle'
}

export const fetchpapers = createAsyncThunk(
    "papers/fetchpapers",async(_,rejectWithValue)=>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/papers/approvedpapers`,{withCredentials:true});
            if(response.data){
                // delay for 1 second to simulate loading state 
                await new Promise((resolve)=>setTimeout(resolve,1000));
                return response.data.approvedpaper
            }
        } catch (error) {
            return rejectWithValue(error.response.data.message || "failed to fetch papers");  
        }
    }
)


export const PaperSlice = createSlice({
    name:"Papers",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchpapers.pending,(state,action)=>{
            state.loading = true
            state.status = 'loading'
            state.error = null
        })
        builder.addCase(fetchpapers.fulfilled,(state,action)=>{
            state.loading = false
            state.status = 'succeeded'
            state.paper = action.payload
            
        })
        builder.addCase(fetchpapers.rejected,(state,action)=>{
            state.loading = false
            state.status = 'failed'
            state.error = action.payload
        })
       
    }
})
export default PaperSlice.reducer