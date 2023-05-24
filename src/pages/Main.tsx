import { useAppSelector } from '../app/hooks';
import { OrderCard } from '../components/OrderCard/OrderCard';
import { selectBurger, selectIds, selectLoadStatus } from '../features/orders/ordersSlice';

export function Main() {
    const allOrdersIds = useAppSelector(selectIds);

    const burger = useAppSelector(selectBurger);
    const status = useAppSelector(selectLoadStatus);

    const orders = allOrdersIds.map((id) => (
		<OrderCard
			key={id}
			id={id}
		/>
	));

    return <>{orders}</>;
}