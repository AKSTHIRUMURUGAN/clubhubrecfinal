import {createSlice} from "@reduxjs/toolkit"
const eventSlice=createSlice({
    name:"events",
    initialState:{
        events:[]
    },
    reducers:{
        getEvent:(state,action)=>{
         state.events=action.payload.map(event=>
            {return{id:event._id,en:event.eventName,cn:event.clubName,ev:event.venue,ec:event.capacity,ed:event.date,et:event.time,em:event.image}})
        },
        addEvent:(state,action)=>{
            state.events.push(action.payload)
        },
        loginFail(state, action){
            return {
                error:  action.payload
            }
        },
        clearError(state, action){
            return {
                error:  null
            }
        },

    }
})
export const {getEvent,addEvent,loginFail,clearError} = eventSlice.actions;
export default eventSlice.reducer;
