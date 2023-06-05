import {
	createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface UserState {
	name: string;
	userCooking: string[];
}

const initialState: UserState = { name: '', userCooking: [] };

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserName: (state, action) => {
			state.name = action.payload;
		},
		addToUserCooking: (state, action) => {
			if (!state.userCooking.find((item) => item === action.payload)) {
				state.userCooking.push(action.payload);
			}
		},
		removeFromUserCooking: (state, action) => {
			state.userCooking = state.userCooking.filter(
				(item) => item !== action.payload
			);
		},
	},
});

export const { setUserName, addToUserCooking, removeFromUserCooking } = userSlice.actions;

export const selectUserName = (state: RootState) => state.user.name;

export const selectUserCooking = (state: RootState) => state.user.userCooking;

export default userSlice.reducer;
