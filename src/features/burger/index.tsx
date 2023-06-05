import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks';
import { OrderStatus, selectBurger, selectById, setDone } from '../ordersList/ordersSlice';
import { Button, Container, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { FormEvent, useState } from 'react';
import { removeFromUserCooking } from '../user/userSlice';

export function Burger() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);

    const order = useAppSelector((state) => selectById(state, String(id)));
    const burger = useAppSelector(selectBurger);

    const currentBurger = new Set(order?.ingredients);

    const groups = [];
    for (const group of burger) {
		const inOrder = group.options.filter((item) =>
			currentBurger.has(item.id)
		);

		if (inOrder.length) {
			groups.push(
				<Form.Group key={`group-${group.categoryId}`}>
					<h2 className='mt-5'> {group.category} </h2>
					<ul className='list-unstyled'>
						{inOrder.map((option) => (
							<li
								className='m-3'
								key={`group-${group.categoryId}-${option.id}`}
							>
								<Form.Check
									required
									type='checkbox'
									label={option.value}
									title={option.value}
									name={group.categoryId}
									id={option.id}
									defaultChecked={
										order?.orderStatus === OrderStatus.done
									}
									disabled={order?.orderStatus !== OrderStatus.cooking}
								/>
							</li>
						))}
					</ul>
				</Form.Group>
			);
		}
    }

    function handleDone(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
		event.stopPropagation();
		const form = event.currentTarget;

		if (form.checkValidity() === false) {
			setValidated(true);
		} else {
			dispatch(setDone(order?.id));
            dispatch(removeFromUserCooking(order?.id));
			navigate('/orders', { replace: true });
		}
	}

    return (
		<Container>
			<h1 className='mt-5'>Приготовление заказа</h1>
			<p className='mb-5'>ID бургера: {order?.id}</p>
			<Form
				className='mb-5'
				noValidate
				validated={validated}
				onSubmit={handleDone}
			>
				{groups}
				{order?.orderStatus === OrderStatus.cooking && (
					<Button variant='primary' type='submit' className='mt-5'>
						Готово
					</Button>
				)}
			</Form>
		</Container>
	);

}