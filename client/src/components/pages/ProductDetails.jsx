import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ParaSpanDiv from "../organisms/ParaSpanDiv";
import PriceBtnDiv from "../organisms/PriceBtnDiv";
import RatingDiv from "../organisms/RatingDiv";
import { FaStar } from "react-icons/fa";
import { getData } from "../../services/api";
import ProductImgDiv from "../organisms/ProductImgDiv";
import Footer from "../organisms/Footer";

function ProductDetails(props) {
  const [data, setData] = useState();
  const [selectedVariant, setSelectedVariant] = useState({});
 
  const { id } = useParams();
  
  useEffect(() => {
    async function func() {
      try {
        
        const d = await getData(`/product/${id}`);
        setData(d?.product);
        setSelectedVariant(d?.product?.variants?.[0]);
      } catch (error) {
        console.log(error);
      }
    }

    func();
  }, [id]);
  // console.log("data",data)
  return (
<>
    <div className="row">
      {/* {console.log("selectedvariant:::",selectedVariant)} */}
      <div className="col d-flex flex-column align-items-center">
        <ProductImgDiv variant={selectedVariant} />
      </div>
      <div className="col right-div">
        <RatingDiv
          brandName={data?.brand}
          name={data?.name}
          PclassName="brand text-uppercase font-weight-bold"
          SclassName="name text-capitalize"
          ratings="4.1"
          icon={<FaStar className="star-icon mb-1" />}
        />
        <hr />
        <PriceBtnDiv
          mrp={selectedVariant?.price}
          discount={selectedVariant?.discount ? selectedVariant?.discount : 0}
          variants={data?.variants}
          data={data}
          selectedVariant={selectedVariant}
          selectVariant={(variantIndex) => {
            setSelectedVariant(variantIndex);
          }}
        />

        <hr />
        <ParaSpanDiv obj={data?.productDetails} />
        <hr />
        {/* <Reviews /> */}
      </div>
    </div>
    <Footer className="footer"/>
    </>
  )
}

export default ProductDetails;
