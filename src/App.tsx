import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/style.css';
import { Main } from './pages/Main';
import { Route, Routes } from 'react-router';
import Layout from './layouts/Layout';

function App() {

		return (
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Main />} />
					<Route path='*' element={<Main />} />
				</Route>
			</Routes>
		);

}

export default App;
