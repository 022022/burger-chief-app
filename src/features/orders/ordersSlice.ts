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
	fetchStatus: 'idle' | 'loading' | 'failed' | 'success';
}

export interface BurgerOrder {
	totalOrderId: string;
    date: Date;
	id: string;
	ingredients: string[];
    chief: string;
	orderStatus: 'idle' | 'cooking' | 'done';
}

export interface TotalOrder {
    totalOrderId: string;
    date: Date;
	phone: string;
	address: string;
	orderContents: BurgerOrder[];
}

const ordersAdapter = createEntityAdapter<BurgerOrder>({
	selectId: (order) => order.id,
});

const initialState = ordersAdapter.getInitialState<{
	burger: BurgerGroup[];
	fetchStatus: string;
}>({
	burger: [],
	fetchStatus: 'idle',
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
            ordersAdapter.updateOne(state, {id: action.payload, changes: {orderStatus: 'cooking'}})
		},
		setDone: (state, action) => {
            ordersAdapter.updateOne(state, {id: action.payload, changes: {orderStatus: 'done'}})
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getData.pending, (state) => {
				state.fetchStatus = 'loading';
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
									date: new Date(item.orderDate),
									id: burger.id,
									ingredients: burger.ingredients,
                                    chief: '',
									orderStatus: 'idle',
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
					state.fetchStatus = 'success';
				}
			)
			.addCase(getData.rejected, (state) => {
				state.fetchStatus = 'failed';
			});
	},
});

export const { setCooking, setDone } = orderSlice.actions;

export const { selectAll, selectById, selectIds } =
	ordersAdapter.getSelectors<RootState>((state) => state.orders);

export const selectBurger = (state: RootState) =>
		state.orders.burger;

export const selectFetchStatus = (state: RootState) => state.orders.fetchStatus;

export default orderSlice.reducer;
