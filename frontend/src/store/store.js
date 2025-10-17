import { configureStore } from "@reduxjs/toolkit";
import slicereducer from "../utilis/authSlice";

 const stores=configureStore({
    reducer:{
        auth:slicereducer
    }

});
export default stores;
