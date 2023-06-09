import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { OrderStatus, selectById, setCooking } from '../../features/ordersList/ordersSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { EntityId } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';
import { addToUserCooking, selectUserName } from '../../features/user/userSlice';

export function OrderCard({ id }: { id: EntityId }) {
	const dispatch = useAppDispatch();
    const order = useAppSelector((state) => selectById(state, id));
    const chief = useAppSelector(selectUserName);

	function startCooking() {
		dispatch(setCooking(id));
        dispatch(addToUserCooking(order?.id));
	}

	const statusInfo = () => {
		switch (order?.orderStatus) {
			case OrderStatus.idle:
				return (
					<Button variant='primary' onClick={startCooking}>
						Взять в работу
					</Button>
				);
			case OrderStatus.cooking:
				return <p>Готовит {chief}</p>;
			case OrderStatus.done:
				return <p>Готово ({chief})</p>;
		}
	};

    const statusColor =
		order?.orderStatus === OrderStatus.idle ? 'warning' : 'secondary';

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
