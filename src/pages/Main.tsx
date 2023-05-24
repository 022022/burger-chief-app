import { useAppSelector } from '../app/hooks'
import { selectAll, selectBurger, selectOrderStatus } from '../features/orders/ordersSlice'

export function Main() {
    const allOrders = useAppSelector(selectAll);
    const burger = useAppSelector(selectBurger);
    const status = useAppSelector(selectOrderStatus);

    console.log(allOrders);
    console.log(burger);
    console.log(status);
    return <>Main</>
}