import { createSlice } from "@reduxjs/toolkit";
const authslice = createSlice ({
    name:"auth",
    initialState:{
        loading:false,
        user:null,
        token:null
    },      
    reducers:{
        //actions
        setLoading :(state,action) => {
            state.loading = action.payload
        },
        setUser:(state,action) =>{
            state.user = action.payload
        },
        setToken:(state,action)=>{
            state.token = action.payload
        }
    }

})

export const {setLoading,setUser,setToken} = authslice.actions;
export default authslice.reducer;