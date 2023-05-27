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
			<div className='d-flex flex-wrap gap-3'>{orders}</div>
		</Container>
	);
}