import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosClient from "../client/axiosClient";
// import { act } from "react";
// import { startSession } from "../../day8/src/model/user";
// import { logout } from "../../day8/src/controllers/userAuthent";

export const registerUser=createAsyncThunk(
    'auth/register',
   async (userData, {rejectWithValue})=>{
    try{
        const response=await axiosClient.post('/user/register',userData);
        return response.data.user;
    }
    catch(error){
        return rejectWithValue(error);
    }
   }
);
export const loginUser=createAsyncThunk(
    'auth/login',
    async(credentials,{rejectWithValue})=>{
        try{
            const response=await axiosClient.post('/user/login',credentials);
            return response.data.user;
        }
        catch(error){
            return rejectWithValue(error);

        }
    }
);
export const checkAuth=createAsyncThunk(
    'auth/check',
    async(_,{rejectWithValue})=>{
        try{
            const {data}=await axiosClient.get('/user/check');
            return data.user;

        }
        catch(error){
            return rejectWithValue(error);
        }
    }
);
export const logoutUser=createAsyncThunk(
    'auth/logout',
    async(_,{rejectWithValue})=>{
        try{
        await axiosClient.post('/user/logout');
        return null;
        }
        catch(error){
            return rejectWithValue(error);
        }
    }
);



const slicereducer=createSlice({
    name:'auth',
    initialState:{
        user:null,
        isauthenticated:false,
        error:null,
        loading:false
    },
        reducers:{
        clearError: (state) => {
            state.error = null;
        }
    },

    extraReducers:(builder)=>{
        //regiser user cases
        builder
        .addCase(registerUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.isauthenticated=!!action.payload;
            state.user=action.payload;
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || 'Something Went wrong';
            state.isauthenticated=false;
            state.user=null;

        })
        //loginUser user cases
        .addCase(loginUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.isauthenticated=!!action.payload;
            state.user=action.payload;
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || 'Something Went Wrong';
            state.user=null;
            state.isauthenticated=false;
        })

        //Check Auth cases
        .addCase(checkAuth.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(checkAuth.fulfilled,(state,action)=>{
            state.loading=false;
            state.isauthenticated=!!action.payload;
            state.user=action.payload;
            
        })
        .addCase(checkAuth.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || 'Something Went Wrong';
            state.user=null;
            state.isauthenticated=false;
        })
        // Logout user cases
        .addCase(logoutUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(logoutUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.isauthenticated=false;
            state.user=null;
            state.error=null;
        })
        .addCase(logoutUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message || 'Something Went Wrong';
            state.user=null;
            state.isauthenticated=false;
        })
    }
})
export const { clearError } = slicereducer.actions;
export default slicereducer.reducer;