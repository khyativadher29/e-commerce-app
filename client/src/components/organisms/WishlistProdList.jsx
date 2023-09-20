import Card from "../molecules/Card";
import React, { useEffect, useState } from "react";
import EmptyWishlist from "../molecules/EmptyWishlist";
import { getData, deleteData } from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";

function WishlistProdList() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("userData"));
  const tempId = sessionStorage.getItem("tempUserId");
  // console.log("user data", userData._id);
  useEffect(() => {
    getData(`${API_BASE_URL}wishlist/${userData?._id}`).then((res) => {
      setWishlist(res.wishlistData.products);
    });
  }, []);
  console.log("wishlist", wishlist);
  async function handleDelete(product) {
    try {
      const res = await deleteData(
        `${API_BASE_URL}wishlist/${userData?._id}/${product.productId}`
      );
      // navigate("/wihslist");
      if (res.status === true) {
        setWishlist(wishlist.filter((p) => p.productId !== product.productId));
        console.log("wishlist here is", wishlist);
        toast.success("item removed successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          bodyClassName: "my-toast-body",
          className: "my-toast",
          icon: (
            <div className="d-flex justify-content-between w-100">
              <img
                className="toast-icon"
                src={product.selectedVarient[0].images[0]}
                alt="Product"
              />
            </div>
          ),
        });
      } else {
        throw new Error("Product could not be deleted");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  function handleOnClick(product) {
    navigate(`/productdetails/${product?.productId}`);
    console.log(product, "product details");
  }
  const noOfProd = wishlist && wishlist.length;
  return (
    <>
      <div className="wishlist__container-bg">
        {wishlist && wishlist.length > 0 ? (
          <>
            <ToastContainer />
            <h1 className="wishlist__container-heading">
              my wishlist <span> {noOfProd} items</span>
            </h1>
            <div className="row d-flex wishlist_product-details">
              {wishlist.map((product) => (
                <Card
                  onClick={() => handleOnClick(product)}
                  key={product._id}
                  product={product}
                  onDelete={() => handleDelete(product)}
                />
              ))}
            </div>
          </>
        ) : (
          <EmptyWishlist />
        )}
      </div>
    </>
  );
}

export default WishlistProdList;
