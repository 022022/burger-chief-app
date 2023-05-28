import { Nav } from 'react-bootstrap';
import { useAppSelector } from '../../app/hooks';
import { selectUserCooking } from '../../features/ordersList/ordersSlice';
import { NavLink } from 'react-router-dom';

export function CookingCounter() {
    const userCooking = useAppSelector(selectUserCooking);

    return userCooking.length > 0 ? (
		<Nav>
			<Nav.Link
				to='/cooking'
				as={NavLink}
				className='nav-link'
				eventKey='4'
			>
				У меня в работе ({userCooking.length})
			</Nav.Link>
		</Nav>
	) : null;
}