import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { selectById, setCooking } from '../../features/orders/ordersSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { EntityId } from '@reduxjs/toolkit';
import { Link, useNavigate } from 'react-router-dom';

export function OrderCard({ id }: { id: EntityId }) {
	const dispatch = useAppDispatch();
    const order = useAppSelector((state) => selectById(state, id));
    const navigate = useNavigate();

	function startCooking() {
		dispatch(setCooking(id));
        navigate(`/burger/${order?.id}`, { replace: true });
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
                     :
					{date.getMinutes().toString().padStart(2, '0')}
				</Card.Text>
				{statusInfo()}
			</Card.Body>
			<Card.Footer className='text-muted'>
				<Link to={`/burger/${order?.id}`}>ID бургера: {id}</Link>
				<p>ID заказа: {order?.totalOrderId}</p>
			</Card.Footer>
		</Card>
	);
}
