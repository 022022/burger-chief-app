import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
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
	totalOrderId: string;
    time: string;
	id: string;
	ingredients: string[];
	status: 'idle' | 'cooking' | 'done';
}

export interface TotalOrder {
    totalOrderId: string;
	phone: string;
	address: string;
	orderContents: BurgerOrder[];
}

const ordersAdapter = createEntityAdapter<BurgerOrder>({
	selectId: (order) => order.id,
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
	return response;
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
				getData.fulfilled, (state,	action) => {
                    const burger: BurgerGroup[] = [];
                    const ordersArranged: BurgerOrder[]  = [];

                    for(const item of action.payload) {
                        if(item._type === 'category') {
                            burger.push(item);
                        } else if (item._type === 'orders') {
							for (const burger of item.orderContents) {
								const singleOrder: BurgerOrder = {
									totalOrderId: item.totalOrderId,
									time: '',
									id: burger.id,
									ingredients: burger.ingredients,
									status: 'idle',
								};

								ordersArranged.push(singleOrder);

								if (burger.quantity > 1) {
									for (let i = 2;	i <= burger.quantity; i++) {
										ordersArranged.push({
											...singleOrder,
											id: `${burger.id}-${i}`,
										});
									}
								}
							}
						}
                    }

                    state.burger = burger;
					ordersAdapter.setAll(state, ordersArranged);
					state.status = 'success';
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

export const selectLoadStatus = (state: RootState) => state.orders.status;

export default orderSlice.reducer;
