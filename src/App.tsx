import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/style.css';
import { Main } from './pages/Main';
import { Route, Routes } from 'react-router';
import Layout from './layouts/Layout';
import { useAppDispatch } from './app/hooks';
import { useEffect } from 'react';
import { getData } from './features/orders/ordersSlice';

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getData());
    }, [dispatch]);

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
