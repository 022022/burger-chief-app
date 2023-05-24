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
		switch (order?.status) {
			case 'idle':
				return (
					<Button variant='secondary' onClick={startCooking}>
						Взять в работу
					</Button>
				);
			case 'cooking':
				return <p>В работе</p>;
			case 'done':
				return <p>Готово</p>;
		}
	};

	return (
		<Card className='text-center' bg='dark' text='light'>
			<Card.Header>
				{order?.totalOrderId}/{id}
			</Card.Header>
			<Card.Body>
				<Card.Title>Заказ</Card.Title>
				<Card.Text>{order?.ingredients}</Card.Text>
				{statusInfo()}
			</Card.Body>
			<Card.Footer className='text-muted'>
				Время заказа: {order?.time}
			</Card.Footer>
		</Card>
	);
}
