import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";

export default function Detail({ addToCart }) {
  const skuRef = useRef();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, error, loading } = useFetch("products/" + id);

  if (loading) return <Spinner />;
  if (!product) return <PageNotFound />;
  if (error) throw error;
  // TODO: Display these products details

  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>
      <select id="size" ref={skuRef}>
        <option value="">What size?</option>
        {product.skus.map((s) => {
          return (
            <option key={s.sku} value={s.sku}>
              {s.size}
            </option>
          );
        })}
      </select>
      <p>
        <button
          className="btn btn-primary"
          onClick={() => {
            const sku = skuRef.current.value;
            if (!sku) return alert("Select size");
            addToCart(id, sku);
            navigate("/cart");
          }}
        >
          Add to Cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
