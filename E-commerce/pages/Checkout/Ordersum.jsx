import dayjs from "dayjs";
import { Amount } from "../../src/utilities/money";
import { Deliveryot } from "./Deliveryot";

export function Ordersum( { cart , deliveryoptions}){
    return(
         <div className="order-summary">
            {deliveryoptions.length > 0 &&
              cart.map((cartItem) => {
                const selectedelivery = deliveryoptions.find(
                  (deliveryoption) => {
                    return deliveryoption.id === cartItem.deliveryoptionId;
                  },
                );

                return (
                  <div key={cartItem.productId} className="cart-item-container">
                    <div className="delivery-date">
                      Delivery date:{" "}
                      {dayjs(selectedelivery).format("dddd , MMMM D")}
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
                          <span className="update-quantity-link link-primary">
                            Update
                          </span>
                          <span className="delete-quantity-link link-primary">
                            Delete
                          </span>
                        </div>
                      </div>

                      <Deliveryot cartItem={cartItem} deliveryOptions={deliveryoptions}  />
                    </div>
                  </div>
                );
              })}
          </div>
    )
}