import CartTable from "./cart-table";
import { getMycartItems } from "@/lib/actions/cartactions";
export const metadata = {
    title:"Shopping cart"
}
const CartPage = async () => {
    const cart = await getMycartItems()
    return ( <><CartTable cart={cart}/></> );
}
 
export default CartPage;