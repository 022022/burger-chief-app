import { useAppSelector } from '../../app/hooks';
import { OrderCard } from '../../components/OrderCard/OrderCard';
import { selectIds } from './ordersSlice';
import { Container } from 'react-bootstrap';

export function OrdersList() {
    const allOrdersIds = useAppSelector(selectIds);

    const orders = allOrdersIds.map((id) => (
		<OrderCard
			key={id}
			id={id}
		/>
	));

    return (
		<Container>
			<h1 className='mt-5 mb-5'>Все заказы</h1>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
					gap: '3rem',
				}}
			>
				{orders}
			</div>
		</Container>
	);
}