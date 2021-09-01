import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";
export default function Detail() {
  const { id } = useParams();
  const { data: product, error, loading } = useFetch("products/" + id);
  //   return <h1>Detail</h1>;
  if (error) throw error;
  if (loading) return <Spinner />;
  // TODO: Display these products details
  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
