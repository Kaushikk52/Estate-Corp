import {configureStore} from '@reduxjs/toolkit';
import filtersReducer from '@/features/Filters/filterSlice'

const store = configureStore({
    reducer:{
        filters: filtersReducer,
    }
});

export default store;