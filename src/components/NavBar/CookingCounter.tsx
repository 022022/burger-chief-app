import { Nav } from 'react-bootstrap';
import { useAppSelector } from '../../app/hooks';
import { selectUserCooking } from '../../features/user/userSlice';
import { NavLink } from 'react-router-dom';
import { selectUserName } from '../../features/user/userSlice';

export function CookingCounter() {
    const userCooking = useAppSelector(selectUserCooking);
    const userName = useAppSelector(selectUserName);

    return userCooking.length > 0 ? (
		<Nav>
			<Nav.Link
				to='/cooking'
				as={NavLink}
				className='nav-link'
				eventKey='4'
			>
				{userName} | Заказы в работе ({userCooking.length})
			</Nav.Link>
		</Nav>
	) : null;
}