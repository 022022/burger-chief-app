import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks';
import { selectBurger, selectById, setDone } from '../ordersList/ordersSlice';
import { Button, Container, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { FormEvent, useState } from 'react';

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
					<h2> {group.category} </h2>
					<ul>
						{inOrder.map((option) => (
							<li
								className=''
								key={`group-${group.categoryId}-${option.id}`}
							>
								<Form.Check
                                    required
									type='checkbox'
									label={option.value}
									title={option.value}
									name={group.categoryId}
									id={option.id}
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
			navigate('/', { replace: true });
		}
	}

    return (
		<Container>
			<Form
				className=''
				noValidate
				validated={validated}
				onSubmit={handleDone}
			>
				{groups}
				{order?.orderStatus === 'cooking' && (
					<Button variant='primary' type='submit'>
						Готово
					</Button>
				)}
			</Form>
		</Container>
	);

}