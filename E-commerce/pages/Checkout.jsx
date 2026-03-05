import "./Checkout.css";
import "./Checkout-header.css";
import { Amount } from "../src/utilities/money";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";

export function Checkout({ cart }) {
  const [deliveryoptions, setdeliveryoptions] = useState([]);
  const [paymentsum, setpaymentsum] = useState([]);

  useEffect(() => {
    axios
      .get("/api/delivery-options?expand=estimatedDeliveryTime")
      .then((res) => {
        setdeliveryoptions(res.data);
      });

    axios.get("/api/payment-summary").then((res) => {
      setpaymentsum(res.data);
    });
  }, []);

  return (
    <>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <a href="/">
              <img className="logo" src="images/logo.png" />
              <img className="mobile-logo" src="images/mobile-logo.png" />
            </a>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <a className="return-to-home-link" href="/">
              3 items
            </a>
            )
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
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

                      <div className="delivery-options">
                        <div className="delivery-options-title">
                          Choose a delivery option:
                        </div>
                        {deliveryoptions.map((deliveryoption) => {
                          let shippingdate = "Free-Shipping";

                          if (deliveryoption.priceCents > 0) {
                            shippingdate = `${Amount(deliveryoption.priceCents)}`;
                          }
                          return (
                            <div
                              key={deliveryoption.id}
                              className="delivery-option"
                            >
                              <input
                                type="radio"
                                Checked={
                                  deliveryoption.id ===
                                  cartItem.deliveryoptionId
                                }
                                className="delivery-option-input"
                                name={`delivery-option- ${cartItem.productId}`}
                              />
                              <div>
                                <div className="delivery-option-date">
                                  {dayjs(
                                    deliveryoption.estimatedDeliveryTimeMs,
                                  ).format("dddd , MMMM D")}
                                </div>
                                <div className="delivery-option-price">
                                  {shippingdate}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">Payment Summary</div>

            {paymentsum && (
              <>
                <div className="payment-summary-row">
                  <div>Items ({paymentsum.totalItems}):</div>
                  <div className="payment-summary-money">
                    {Amount(paymentsum.productCostCents)}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Shipping &amp; handling:</div>
                  <div className="payment-summary-money">
                    {Amount(paymentsum.shippingCostCents)}
                  </div>
                </div>

                <div className="payment-summary-row subtotal-row">
                  <div>Total before tax:</div>
                  <div className="payment-summary-money">
                    {Amount(paymentsum.totalCostBeforeTaxCents)}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Estimated tax (10%):</div>
                  <div className="payment-summary-money">
                    {Amount(paymentsum.taxCents)}
                  </div>
                </div>

                <div className="payment-summary-row total-row">
                  <div>Order total:</div>
                  <div className="payment-summary-money">
                    {Amount(paymentsum.totalCostCents)}
                  </div>
                </div>

                <button className="place-order-button button-primary">
                  Place your order
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
