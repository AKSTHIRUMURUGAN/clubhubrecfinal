import  {configureStore} from "@reduxjs/toolkit"
import eventReducers from "./eventSlice"
const store = configureStore({
    reducer:{
        events:eventReducers

    }
})
export default store;