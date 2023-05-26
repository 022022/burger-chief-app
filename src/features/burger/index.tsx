import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks';
import { selectBurger, selectById, setDone } from '../ordersList/ordersSlice';
import { Button, Container, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

export function Burger() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(id, Number(id), String(id));
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
									type={group.type}
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

    function handleDone() {
		dispatch(setDone(order?.id));
		navigate('/', { replace: true });
	}

    return (
		<Container>
			<Form className=''>
				{groups}
                { order?.orderStatus === 'cooking' &&
                    <Button variant='primary' onClick={handleDone}>
                        Готово
                    </Button>
                }
			</Form>
		</Container>
	);

}