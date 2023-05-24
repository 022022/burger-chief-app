import { Outlet } from 'react-router';
import { NavBar } from '../components/NavBar';

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
