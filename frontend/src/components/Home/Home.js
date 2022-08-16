import React, { Fragment, useEffect } from "react";
import { FiArrowUpCircle } from "react-icons/fi";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, clearErrors } from "../../actions/productAction";
import Loader from "../layouts/Loader/loader.js";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      return alert.error(error);
      // dispatch(clearErrors());
    }
    dispatch(getProducts());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Eccomerce" />
          <div className="banner">
            <p>Welcome to Eccomerce</p>
            <h1>Find Amazing Products below</h1>
            <a href="#container">
              <button>
                Scroll <FiArrowUpCircle />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
