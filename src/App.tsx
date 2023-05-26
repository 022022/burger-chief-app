import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/style.css';
import { Main } from './pages/Main';
import { Route, Routes } from 'react-router';
import Layout from './layouts/Layout';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect } from 'react';
import { getData, selectFetchStatus } from './features/orders/ordersSlice';
import { Error } from './pages/Error';
import { Burger } from './features/burger/Burger';

function App() {
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectFetchStatus);

    useEffect(() => {
        dispatch(getData());
    }, [dispatch]);

    if (status === 'idle' || status === 'loading') {
		return <p className='text-center pt-3'>Идет загрузка...</p>;
	} else if (status === 'failed') {
		return <Error />;
	} else {
        return (
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Main />} />
					<Route path='burger/:id' element={<Burger />} />
					<Route path='*' element={<Main />} />
				</Route>
			</Routes>
		);
    }
}

export default App;
