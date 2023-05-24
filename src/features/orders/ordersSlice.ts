import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit';
import { BurgerGroup } from '../../types/types';
import { fetchData } from '../../services/sanity/fetchData';
import { RootState } from '../../app/store';

export interface OrdersState {
	burger: BurgerGroup[];
	burgerOrders: BurgerOrder[];
	status: 'idle' | 'loading' | 'failed' | 'success';
}

export interface BurgerOrder {
	_type: string;
	_id: string;
	ingredients: string[];
	status: 'idle' | 'cooking' | 'done';
}

const ordersAdapter = createEntityAdapter<BurgerOrder>({
	selectId: (order) => order._id,
});


const initialState = ordersAdapter.getInitialState<{
	burger: BurgerGroup[];
	status: string;
}>({
	burger: [],
	status: 'idle',
});

export const getData = createAsyncThunk('orders/getData', async () => {
	const response = await fetchData();
    const result: { burger: BurgerGroup[]; burgerOrders: BurgerOrder[] } = {
		burger: [],
		burgerOrders: [],
	};
    for(const item of response) {
        if(item._type === 'category') {
            result.burger.push(item);
        } else {
            result.burgerOrders.push(item);
        }
    }
	return result;
});

export const orderSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
		setCooking: (state, action) => {
            ordersAdapter.updateOne(state, {id: action.payload, changes: {status: 'cooking'}})
		},
		setDone: (state, action) => {
            ordersAdapter.updateOne(state, {id: action.payload, changes: {status: 'done'}})
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getData.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(
				getData.fulfilled,
				(
					state,
					action: PayloadAction<{
						burger: BurgerGroup[];
						burgerOrders: BurgerOrder[];
					}>
				) => {
					state.status = 'success';
					state.burger = action.payload.burger;
					ordersAdapter.setAll(state, action.payload.burgerOrders);
				}
			)
			.addCase(getData.rejected, (state) => {
				state.status = 'failed';
			});
	},
});

export const { setCooking, setDone } = orderSlice.actions;

export const { selectAll, selectById, selectIds } =
	ordersAdapter.getSelectors<RootState>((state) => state.orders);

export const selectBurger = (state: RootState) =>
		state.orders.burger;

export const selectOrderStatus = (state: RootState) => state.orders.status;

export default orderSlice.reducer;
