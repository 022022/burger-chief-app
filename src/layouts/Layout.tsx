import { Outlet } from 'react-router';
import { NavBar } from '../components/NavBar/NavBar';

export default function Layout() {
	return (
		<>
			<NavBar></NavBar>
			<main>
				<Outlet />
			</main>

		</>
	);
}
