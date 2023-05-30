import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { addToUserCooking, selectById, setCooking } from '../../features/ordersList/ordersSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { EntityId } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';

export function OrderCard({ id }: { id: EntityId }) {
	const dispatch = useAppDispatch();
    const order = useAppSelector((state) => selectById(state, id));

	function startCooking() {
		dispatch(setCooking(id));
        dispatch(addToUserCooking(id));
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
				return <p>Готово ({order.chief})</p>;
		}
	};

    const statusColor = order?.orderStatus === 'idle' ? 'warning' : 'secondary';

    const date = new Date(order?.date || Date.now());

	return (
		<Card
			className='text-center'
			bg='dark'
			text='light'
			border={statusColor}
		>
			<Card.Body>
				<Card.Text>
					Заказ принят в {date.getHours().toString().padStart(2, '0')}
					:{date.getMinutes().toString().padStart(2, '0')}
				</Card.Text>
				{statusInfo()}
				<Card.Text>Количество: {order?.quantity}</Card.Text>
				<Link
					to={`/burger/${order?.id}`}
					className='d-flex justify-content-center link-light my-4'
				>
					Ингредиенты
				</Link>
			</Card.Body>
			<Card.Footer>
				<p className='fw-lighter'>ID бургера: {id}</p>
				<p className='fw-lighter'>ID заказа: {order?.totalOrderId}</p>
			</Card.Footer>
		</Card>
	);
}
