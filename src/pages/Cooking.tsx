
import { Container } from 'react-bootstrap';
import { useAppSelector } from '../app/hooks';
import { selectIds } from '../features/ordersList/ordersSlice';
import { OrderCard } from '../components/OrderCard/OrderCard';
import { selectUserCooking } from '../features/user/userSlice';

export function Cooking() {
	const allOrdersIds = useAppSelector(selectIds);
    const userCooking = new Set(useAppSelector(selectUserCooking));

	const usersOrders = allOrdersIds.filter((id) => userCooking.has(String(id)));

    if (usersOrders.length === 0) {
        return (
			<Container><p>У вас в работе нет заказов</p></Container>
        )
    } else {
		return (
			<Container>
				<h1 className='mt-5 mb-5'>У меня в работе</h1>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns:
							'repeat(auto-fit, minmax(230px, 1fr))',
						gap: '3rem',
					}}
				>
					{usersOrders.map((id) => (
						<OrderCard key={id} id={id} />
					))}
				</div>
			</Container>
		);
    }
}
