import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ImgTag from "../atoms/ImgTag";
import Carticon from "../molecules/Carticon";

export default function CartHeader(props) {
  const navigate = useNavigate();
  const { className } = props;

  const [headers, setHeaders] = useState({
    isOutOfCart: getLocalStorageDataByKey("isOutOfCart", true),
    isAddressSelected: getLocalStorageDataByKey("isAddressSelected", false),
    isPaymentDone: getLocalStorageDataByKey("isPaymentDone", false),
  });

  function getLocalStorageDataByKey(key, defaultValue = undefined) {
    let data = localStorage.getItem(key);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (error) {
        return data;
      }
    } else {
      return defaultValue;
    }
  }

  return (
    <header className={className}>
      <div className="header-cart__tags w-50 d-flex justify-content-between text-center">
        <Carticon
          src={`/assets/images/${
            !headers.isOutOfCart ? "edit-icon.svg" : "tick-icon.svg"
          }`}
          imgClassName="header-cart__image"
          alt="altimg"
          className="header-cart__tag"
          aText="CART"
          href="#"
        />
      </div>
    </header>
  );
}
