import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({

    name: "application",
    initialState: {
        applicants: []
    },
    reducers:{
        setAllApplicant:(state,action) => {
            state.applicants = action.payload
        }
    }

})

export const {setAllApplicant} = applicationSlice.actions
export default applicationSlice.reducer