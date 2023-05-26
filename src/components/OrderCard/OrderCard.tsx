import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { selectById, setCooking } from '../../features/orders/ordersSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { EntityId } from '@reduxjs/toolkit';

export function OrderCard({ id }: { id: EntityId }) {
	const dispatch = useAppDispatch();
    const order = useAppSelector((state) => selectById(state, id));

	function startCooking() {
		dispatch(setCooking(id));
	}

	const statusInfo = () => {
		switch (order?.orderStatus) {
			case 'idle':
				return (
					<Button variant='primary' onClick={startCooking}>
						Взять в работу
					</Button>
				);
			case 'cooking':
				return <p>Готовит {order.chief}</p>;
			case 'done':
				return <p>Готово</p>;
		}
	};

    const statusColor = order?.orderStatus === 'idle' ? 'warning' : 'secondary';

	return (
		<Card
			className='text-center'
			bg='dark'
			text='light'
			border={statusColor}
		>
			<Card.Body>
				<Card.Text>
					Заказ принят в {
					order?.date.getHours().toString().padStart(2, '0')} : 
					{order?.date.getMinutes().toString().padStart(2, '0')}
				</Card.Text>
				{statusInfo()}
			</Card.Body>
			<Card.Footer className='text-muted'>
				<p>ID бургера: {id}</p>
				<p>ID заказа: {order?.totalOrderId}</p>
			</Card.Footer>
		</Card>
	);
}
