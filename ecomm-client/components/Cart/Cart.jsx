import { Checkbox, Typography, Empty } from "antd";
import CartItem from "./CartItem";
import Coupoun from "./Coupoun";
import Gifting from "./Gifting";
import PriceDetails from "./PriceDetails";
import { useCart } from '../../contexts/cartContext';

const { Text } = Typography;




const Cart = ({ setCurrent }) => {
  const { cart } = useCart();

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };



  return (
    <div className=" my-2.5 flex flex-col gap-7 justify-center min-h-96">
      {/* <div className="flex flex-col gap-2"> */}
        
      <div className="flex flex-col gap-3">
          {cart?.products && cart?.products?.length > 0 ? (
            cart?.products?.map((cartItem,index) => (
             <div className="border rounded-3xl">
               <CartItem
                index={index == cart?.products?.length - 1 ? true : false} 
                key={cartItem._id}
                cartItem={cartItem}
              />
             </div>
            ))
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No items in the cart"/>
          )}
        </div>
      {/* </div> */}
      <div className="flex flex-col gap-5">
        {/* <Coupoun />
        <Gifting /> */}
        {cart?.products?.length > 0 && <PriceDetails setCurrent={setCurrent}/> }
      </div>
    </div>
  );
};

export default Cart;
