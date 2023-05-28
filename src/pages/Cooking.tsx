
import { Container } from 'react-bootstrap';
import { useAppSelector } from '../app/hooks';
import { selectIds, selectUserCooking } from '../features/ordersList/ordersSlice';
import { OrderCard } from '../components/OrderCard/OrderCard';

export function Cooking() {
	const allOrdersIds = useAppSelector(selectIds);
    const userCooking = new Set(useAppSelector(selectUserCooking));

	const usersOrders = allOrdersIds.filter((id) => userCooking.has(String(id)));

	return (
		<Container>
			<h1>У меня в работе</h1>
			<div className='d-flex flex-wrap gap-3'>
				{usersOrders.map((id) => (
					<OrderCard key={id} id={id} />
				))}
			</div>
		</Container>
	);
}
