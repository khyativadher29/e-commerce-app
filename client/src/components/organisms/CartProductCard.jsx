import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCirclePlus,
  faCircleMinus,
} from "@fortawesome/free-solid-svg-icons";
// import Loader from "../atoms/Loader";
import axios from "axios";
import cartContext from "../../contexts/cartContext";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";

export default function CartProductCard() {
  const [quantity, setQuantity] = useState(0);
  const tempId = sessionStorage.getItem("tempUserId");
  // const [loader, setLoader] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  const { cartData, fetchData, productsInCart } = useContext(cartContext);
  console.log("contextValue", cartData);

  useEffect(() => {
    fetchData();
  }, []);
  const handleDeleteProduct = async (productId, variantId) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}cart/${
          userData && userData.cartProductsInTempId != null
            ? userData.cartProductsInTempId
            : userData
            ? userData._id
            : tempId
        }/${productId}/${variantId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response?.data;
      console.log(data);
      // setLoader(true);
      fetchData();
    } catch (error) {
      console.error("Error deleting product from cart:", error);
    }
  };

  async function incQuantity(productId, variantId, quantity) {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}cart/${
          userData && userData.cartProductsInTempId != null
            ? userData.cartProductsInTempId
            : userData
            ? userData._id
            : tempId
        }/${productId}/${variantId}`,
        { quantity: quantity + 1 }
      );
      console.log(response?.data?.quantity);

      setQuantity(response?.data?.quantity);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }
  async function decQuantity(productId, variantId, quantity) {
    try {
      if (quantity > 0) {
        const response = await axios.patch(
          `${API_BASE_URL}cart/${
            userData && userData.cartProductsInTempId != null
              ? userData.cartProductsInTempId
              : userData
              ? userData._id
              : tempId
          }/${productId}/${variantId}`,
          { quantity: quantity - 1 }
        );
        console.log(response?.data?.quantity);
        setQuantity(response?.data?.quantity);
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {
        cartData.map((product, index) =>
          product?.selectedVariants?.map((variant, index) => (
            <div
              key={index}
              className="card-product-details d-flex border p-3 mb-3 bg-white rounded "
            >

              <div className="card-product-details__figure mr-3 ">
                <img
                  className="card-product-details__img"
                  style={{ cursor: "pointer" }}
                  width="120px"
                  alt="error"
                  src="https://medias.utsavfashion.com/media/catalog/product/cache/1/small_image/295x/040ec09b1e35df139433887a97daa66f/b/a/bandhej-printed-art-silk-flared-gown-in-pink-v1-tkr100.jpg"
                  onClick={() =>
                    navigate(`/productdetails/${product?.productId}`)
                  }
                />
              </div>
              <div className="card-product-details__body">
                <div className="card-product-details__name fs-6 font-weight-bold">
                  {product?.name.charAt(0).toUpperCase() +
                    product?.name.slice(1)}
                </div>
                <div className="card-product-details__color fs-6 text-secondary">
                  {" "}
                  {product?.productDetails?.brand}{" "}
                </div>
                <div className="card-product-details__manufacturer fs-7 text-muted">
                  {" "}
                  {product?.selectedVariants[0]?.color}{" "}
                </div>
                <div className="card-product-details__btn-wrapper my-2 d-flex flex-column">
                  <span className="pr-2">
                    {" "}
                    <strong>₹ {variant?.price}</strong>
                  </span>

                  <span className="pr-2">
                    {" "}
                    Size: <strong>{variant?.size?.toUpperCase()}</strong>
                  </span>
                  <span>
                    Quantity:
                    <FontAwesomeIcon
                      icon={faCircleMinus}
                  style={{ cursor: "pointer" }}
                      className="mx-2"
                      size="lg"
                      onClick={() =>
                        decQuantity(
                          product?.productId,
                          variant?.variantId,
                          variant?.quantity
                        )
                      }
                    />
                    <strong>{variant?.quantity}</strong>
                    <FontAwesomeIcon
                      icon={faCirclePlus}
                  style={{ cursor: "pointer" }}
                      className="mx-2"
                      size="lg"
                      onClick={() =>
                        incQuantity(
                          product?.productId,
                          variant?.variantId,
                          variant?.quantity
                        )
                      }
                    />
                  </span>
                </div>

                <div className="fs-6 mb-3">
                  <span>
                    <img src="asse/images/exchange.png" width="20px" alt="" />
                  </span>
                  <strong>30 days</strong> return available
                </div>
                <div className="card-btn-group">
                  <button
                    type="button"
                    className="product-delete-btn btn btn-sm btn-danger font-weight-bold mb-2 mr-2"
                    onClick={() =>
                      handleDeleteProduct(
                        product?.productId,
                        variant?.variantId
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )
      }
    </>
  );
}
