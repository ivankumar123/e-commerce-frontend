import { Amount } from "../../src/utilities/money"

export function Paymentsum({paymentsum}){
    return(
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
    )
}