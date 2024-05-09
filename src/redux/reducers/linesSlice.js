import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    lines: [],
    status: 'idle',
    error: null
}

export const fetchLinesData = createAsyncThunk('lines/fetchLinesData', async () => {
    // require file instead of fetch API
    const response = await require("../../data/data.json")
    return response
})



const linesSlice = createSlice({
    name: 'lines',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLinesData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLinesData.fulfilled, (state, action) => {
                state.loading = false;
                state.lines = action.payload;
            })
            .addCase(fetchLinesData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default linesSlice.reducer;


export const selectLineById = (state, lineId) => {
    return state.lines.lines.find(line => line.line === lineId)
}
