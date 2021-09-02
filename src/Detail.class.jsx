import React, { Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "./cartComtext";
import PageNotFound from "./PageNotFound";
import { Fetch } from "./services/useFetch";
import Spinner from "./Spinner";
export default function DetailWrapper() {
  const { dispatch } = useCart();

  const { id } = useParams();

  return <Detail id={id} dispatch={dispatch} navigate={useNavigate()} />;
}
class Detail extends Component {
  state = {
    sku: "",
  };

  render() {
    const { id, dispatch, navigate } = this.props;

    const { sku } = this.state;

    // TODO: Display these products details
    return (
      <Fetch url={"products/" + id}>
        {(product, loading, error) => {
          if (loading) return <Spinner />;
          if (!product) return <PageNotFound />;
          if (error) throw error;
          return (
            <div id="detail">
              <h1>{product.name}</h1>
              <p>{product.description}</p>
              <p id="price">${product.price}</p>
              <select
                id="size"
                value={sku}
                onChange={(e) => this.setState({ sku: e.target.value })}
              >
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
                  disabled={!sku}
                  className="btn btn-primary"
                  onClick={() => {
                    dispatch({ type: "add", id, sku });
                    navigate("/cart");
                  }}
                >
                  Add to Cart
                </button>
              </p>
              <img src={`/images/${product.image}`} alt={product.category} />
            </div>
          );
        }}
      </Fetch>
    );
  }
}
