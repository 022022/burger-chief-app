import {
	createAsyncThunk,
	createEntityAdapter,
	createSelector,
	createSlice,
} from '@reduxjs/toolkit';
import { BurgerGroup } from '../../types/types';
import { fetchData } from '../../services/sanity/fetchData';
import { RootState } from '../../app/store';

export interface OrdersState {
	burger: BurgerGroup[];
	burgerOrders: BurgerOrder[];
	fetchStatus: FetchStatus;
}

export enum FetchStatus {
	idle,
	loading,
	failed,
	success
}

export enum OrderStatus {
    idle, cooking, done
}

export interface BurgerOrder {
	totalOrderId: string;
	date: Date;
	id: string;
	ingredients: string[];
	quantity: number;
	orderStatus: OrderStatus;
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
	fetchStatus: FetchStatus
}>({
	burger: [],
	fetchStatus: FetchStatus.idle,
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
			ordersAdapter.updateOne(state, {
				id: action.payload,
				changes: { orderStatus: OrderStatus.cooking },
			});
		},
		setDone: (state, action) => {
			ordersAdapter.updateOne(state, {
				id: action.payload,
				changes: { orderStatus: OrderStatus.done },
			});
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getData.pending, (state) => {
				state.fetchStatus = FetchStatus.loading;
			})
			.addCase(getData.fulfilled, (state, action) => {
				const burger: BurgerGroup[] = [];
				const ordersArranged: BurgerOrder[] = [];

				for (const item of action.payload) {
					if (item._type === 'category') {
						burger.push(item);
					} else if (item._type === 'orders') {
						for (const burger of item.orderContents) {
							const singleOrder: BurgerOrder = {
								totalOrderId: item.totalOrderId,
								date: item.orderDate,
								id: burger.id,
								ingredients: burger.ingredients,
								quantity: burger.quantity,
                                orderStatus: OrderStatus.idle
							};

							ordersArranged.push(singleOrder);
						}
					}
				}

				state.burger = burger;
				ordersAdapter.setAll(state, ordersArranged);
				state.fetchStatus = FetchStatus.success;
			})
			.addCase(getData.rejected, (state) => {
				state.fetchStatus = FetchStatus.failed;
			});
	},
});

export const { setCooking, setDone } = orderSlice.actions;

export const { selectAll, selectById, selectIds } =
	ordersAdapter.getSelectors<RootState>((state) => state.orders);

export const selectBurger = createSelector(
	[(state: RootState) => state.orders.burger],
	(state) => [...state].sort((a, b) => a.sortOrder - b.sortOrder)
);

export const selectFetchStatus = (state: RootState) => state.orders.fetchStatus;



export default orderSlice.reducer;
