import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../../components/Header";
import "./Orders.css";
import dayjs from "dayjs";
import { Amount } from "../../utiles/money";

export function Orders({ cart, loadcart }) {
  const [orders, setorders] = useState([]);

  useEffect(() => {
    const getorders = async () => {
      const Ordersno = await axios.get("/api/orders?expand=products");
      setorders(Ordersno.data);
    };

    getorders();
  }, []);

  const addToCart = async (productId, quantity) => {
    await axios.post("/api/cart-items", {
      productId: productId,
      quantity: 1,
    });
    await loadcart();
  };

  return (
    <>
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => {
            return (
              <div key={order.id} className="order-container">
                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>
                        {dayjs(order.orderTimeMs).format("dddd MMMM , D")}
                      </div>
                    </div>
                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>{Amount(order.totalCostCents)}</div>
                    </div>
                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order.id}</div>
                  </div>
                </div>

                <div className="order-details-grid">
                  {order.products.map((orderproduct) => {
                    return (
                      <Fragment key={orderproduct.id}>
                        <div className="product-image-container">
                          <img src={orderproduct.product.image} />
                        </div>

                        <div className="product-details">
                          <div className="product-name">
                            {orderproduct.product.name}
                          </div>
                          <div className="product-delivery-date">
                            Arriving at date:{" "}
                            {dayjs(orderproduct.estimatedDeliveryTimeMs).format(
                              "MMMM D",
                            )}
                          </div>
                          <div className="product-quantity">
                            Quantity :{orderproduct.quantity}
                          </div>
                          <button
                            className="buy-again-button button-primary"
                            onClick={() => addToCart(orderproduct.product.id)}
                          >
                            <img
                              className="buy-again-icon"
                              src="images/icons/buy-again.png"
                            />
                            <span className="buy-again-message">
                              Add to Cart
                            </span>
                          </button>
                        </div>

                        <div className="product-actions">
                          <a href="/">
                            <button className="track-package-button button-secondary">
                              Track package
                            </button>
                          </a>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
