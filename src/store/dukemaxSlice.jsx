import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bannerData : [],
    imageURL :""
}
export const dukemaxSlice = createSlice({
    name :'dukemax',
    initialState,
    reducers :{
        setBannerData : (state,action)=>{
            state.bannerData = action.payload
        },
        setImageURL : (state,action) =>{
            state.imageURL = action.payload
        }
    }
})
export const { setBannerData, setImageURL } = dukemaxSlice.actions

export default dukemaxSlice.reducer