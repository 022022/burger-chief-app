import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/style.css';
import { OrdersList } from './features/ordersList';
import { Route, Routes } from 'react-router';
import Layout from './layouts/Layout';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useEffect } from 'react';
import { FetchStatus, getData, selectFetchStatus } from './features/ordersList/ordersSlice';
import { Error } from './pages/Error';
import { Burger } from './features/burger';
import { Info } from './pages/Info';
import { Cooking } from './pages/Cooking';

function App() {
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectFetchStatus);

    useEffect(() => {
        dispatch(getData());
    }, [dispatch]);

    if (status === FetchStatus.idle || status === FetchStatus.loading) {
		return <p className='text-center pt-3'>Идет загрузка...</p>;
	} else if (status === FetchStatus.failed) {
		return <Error />;
	} else {
		return (
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<OrdersList />} />
					<Route path='info' element={<Info />} />
					<Route path='cooking' element={<Cooking />} />
					<Route path='burger/:id' element={<Burger />} />
					<Route path='*' element={<OrdersList />} />
				</Route>
			</Routes>
		);
	}
}

export default App;
