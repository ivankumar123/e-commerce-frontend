import { Product } from "./Product";

export function Productgrid({ products, loadcart }) {
  return (
    <div className="products-grid">
      {products.map((product) => {
        return (
          <Product key={product.id} product={product} loadcart={loadcart} />
        );
      })}
    </div>
  );
}
