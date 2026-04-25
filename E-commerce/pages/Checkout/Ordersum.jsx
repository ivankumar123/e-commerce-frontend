import dayjs from "dayjs";
import { Amount } from "../../utiles/money";
import { Deliveryot } from "./Deliveryot";

export function Ordersum( { cart , deliveryoptions, loadcart }) {
    return(
         <div className="order-summary">
            {deliveryoptions.length > 0 &&
              cart.map((cartItem) => {
                const selectedelivery = deliveryoptions.find(
                  (deliveryoption) => {
                    return deliveryoption.id === cartItem.deliveryOptionId;
                  },
                );

            const deleletcartItem = async () => {
                await axios.delete(`/api/cart-items/${cartItem.productId}`);
                
            }
            const updatequantity = async () => {
                await axios.put(`/api/cart-items/${cartItem.productId}`, {
                    quantity: cartItem.product.quantity,
                });
            }
            loadcart();    

                return (
                  <div key={cartItem.productId} className="cart-item-container">
                    <div className="delivery-date">
                      Delivery date:{" "}
                      {dayjs(selectedelivery?.estimatedDeliveryTimeMs).format("dddd , MMMM D")}
                    </div>

                    <div className="cart-item-details-grid">
                      <img
                        className="product-image"
                        src={cartItem.product.image}
                      />

                      <div className="cart-item-details">
                        <div className="product-name">
                          {cartItem.product.name}
                        </div>
                        <div className="product-price">
                          {Amount(cartItem.product.priceCents)}
                        </div>
                        <div className="product-quantity">
                          <span>
                            Quantity:{" "}
                            <span className="quantity-label">
                              {cartItem.product.quantity}
                            </span>
                          </span>
                          <span className="update-quantity-link link-primary"
                          onClick={updatequantity}
                          >
                            Update
                          </span>
                          <span className="delete-quantity-link link-primary">
                            onclick={deleletcartItem}
                            Delete
                          </span>
                        </div>
                      </div>

                      <Deliveryot cartItem={cartItem} deliveryOptions={deliveryoptions} loadcart={loadcart} />
                    </div>
                  </div>
                );
              })}
          </div>
    )
}