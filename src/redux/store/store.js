import { configureStore } from '@reduxjs/toolkit'
import linesReducer from '../reducers/linesSlice';
import transportTypesReducer from '../reducers/transportTypesSlice';

const store = configureStore({
    reducer: {
        lines: linesReducer,
        transportTypes: transportTypesReducer
    },
});

export default store;