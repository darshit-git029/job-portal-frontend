import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: 'job',
    initialState: {
        alljobs: [],
        allAdminJobs: [],
        singlejob: null,
        searchJobByText : "",
        allAppliedJobs:[],
        searchquery:""
    },
    reducers: {
        setAlljob: (state, action) => {
            state.alljobs = action.payload

        },
        setSingleJob: (state, action) => {
            state.singlejob = action.payload
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload
        },
        setSearchJobsByText:(state,action)=>{
            state.searchJobByText =action.payload
        },
        setAllAppliedJobs:(state,action)=>{
            state.allAppliedJobs = action.payload
        },
        setSearchquery:(state,action)=>{
            state.searchquery = action.payload
        }
    }
})

export const { setAlljob, setSingleJob, setAllAdminJobs , setSearchJobsByText, setAllAppliedJobs, setSearchquery} = jobSlice.actions
export default jobSlice.reducer