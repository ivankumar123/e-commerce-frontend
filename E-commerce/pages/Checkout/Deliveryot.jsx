import dayjs from "dayjs";
import axios from "axios";
import { Amount } from "../../src/utilities/money";

export function Deliveryot({ cartItem, deliveryOptions, loadcart }) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>
      {deliveryOptions.map((deliveryOption) => {
        let priceString = "FREE Shipping";

        if (deliveryOption.priceCents > 0) {
          priceString = `${Amount(deliveryOption.priceCents)} - Shipping`;
        }

        const updateCartItem = async () => {
          
          await axios.put(`/api/cart-items/${cartItem.productId}`, {
            deliveryOptionId: deliveryOption.id,
            
          });
          await loadcart();
        };

        return (
          <div
            key={deliveryOption.id}
            className="delivery-option"
            onClick={updateCartItem}
          >
            <input
              type="radio"
              checked={deliveryOption.id === cartItem.deliveryOptionId} //checked={deliveryOption.id === cartItem.deliveryOptionId}
              onChange={() => {}}
              className="delivery-option-input"
              name={`delivery-option-${cartItem.productId}`}
            />
            <div>
              <div className="delivery-option-date">
                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D",
                )}
              </div>
              <div className="delivery-option-price">{priceString}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
