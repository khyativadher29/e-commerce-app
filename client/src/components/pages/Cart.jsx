import React, { useContext } from "react";
import CartHeader from "../organisms/CartHeader";
import CartOrderDetails from "../organisms/CartOrderDetails";
import CartProductCard from "../organisms/CartProductCard";
import CartSimilarProductList from "../organisms/CartSimilarProductList";
import CartReturnPolicy from "../organisms/CartReturnPolicy";
import cartContext from "../../contexts/cartContext";
import { useEffect } from "react";
import CartEmptyContainer from "../organisms/CartEmptyContainer";

export default function Cart() {
  const tempId = sessionStorage.getItem("tempUserId");
  const userData = JSON.parse(localStorage.getItem("userData"));

  const { cartData, fetchData, productsInCart } = useContext(cartContext);
  useEffect(() => {
    if (userData || tempId) {
      fetchData();
    }
  }, []);
  return (
    <>
        <>
          {/* <CartHeader className="header-cart row d-flex justify-content-center align-items-center px-5 py-4 font-weight-bold border-bottom" /> */}

          {cartData.length === 0 ? (
            <CartEmptyContainer />
          ) : (
            <div className="main-container container-fuild" style={{minHeight: "100vh"}}>
              <div className="main-container__top-div container col-xl-11 col-lg-12 col-md-12 col-sm-12  d-flex justify-content-center">
                <div
                  style={{ marginRight: 10, marginTop: 20 }}
                  className="top-div__left-side col-xl-6 col-lg-7 col-md-7 col-sm-12 mt-5 mr-2 "
                >
                  <div className="top-div__heading fs-3 font-weight-bold mb-3">
                    Shopping Cart
                  </div>

                  <div className="top-div__product-details__wrapper">
                    <CartProductCard />
                  </div>
                </div>

                <div className="top-div__right-side  col-xl-5 col-lg-5 col-md-5 col-sm-12 mt-5">
                  <CartOrderDetails />

                  <CartReturnPolicy />
                </div>
              </div>
            </div>
          )}
        </>
    </>
  );
}
