import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: string = 'en';

const langReducer = createSlice({
	name: 'langReducer',
	initialState,
	reducers: {
		setLang: (_state, action: PayloadAction<string>) => action.payload,
	},
});

export default langReducer;
