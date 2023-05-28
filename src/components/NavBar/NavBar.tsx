import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { CookingCounter } from './CookingCounter';

export function NavBar() {
    return (
		<Navbar expand='lg' bg='black' variant='dark' collapseOnSelect>
			<Container>
				<Navbar.Brand>
					<Nav.Link
						to='/'
						as={NavLink}
						className='nav-link'
						eventKey='0'
						title='Приложение сотрудника бургерной Раз-два-три бургер'
						end
					>
						<img
							alt='Логотип бургерной Раз-два-три бургер'
							src='images/logo123burger.svg'
							style={{
								height: 25,
								width: 160,
								filter: 'brightness(75%)',
							}}
						/>
					</Nav.Link>
				</Navbar.Brand>

				<Navbar.Toggle aria-controls='responsive-navbar-nav' />
				<Navbar.Collapse id='responsive-navbar-nav'>
					<Nav className='me-auto'>
						<Nav.Link
							to='/info'
							as={NavLink}
							className='nav-link'
							eventKey='1'
						>
							Руководство бургер-шефа
						</Nav.Link>
					</Nav>
                    <CookingCounter />
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}