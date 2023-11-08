import { Button, CircularProgress, Skeleton } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import SiteHeader from "../../../layouts/site/header/header";
import {
  addBasket,
  allBaskets,
  SelectLoadingBasket,
} from "../../../redux/slice/addToBasket";
import { selectLocalUser, selectUser } from "../../../redux/slice/authSlice";
import {
  allProducts,
  selectProducts,
} from "../../../redux/slice/getDataProducts";
import {
  addWishlist,
  allWishlist,
  deleteWishlist,
  selectWishlist,
} from "../../../redux/slice/wishList";
import CustomTab1 from "./tab1/customTab-1";
import CustomTab2 from "./tab2/customTab-2";
import "./index.scss";
import MoreInfo from "./moreInfo/moreInfo";
const DetailPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loadingBasket = useSelector(SelectLoadingBasket);
  const user = useSelector(selectUser);
  const localUser = useSelector(selectLocalUser);
  const wishlist = useSelector(selectWishlist);
  const [mainImage, setMainImage] = useState("");
  const [show, setShow] = useState("");
  const { id } = useParams();
  const product = products.find((e) => e?._id === id);
  const delimiter = ",";
  const sizeArray = product?.size?.split(delimiter);
  const colorArray = product?.color?.split(delimiter);
  const materialArray = product?.material?.split(delimiter);
  const [selectedSize, setSize] = useState("none");
  const [selectedColor, setColor] = useState("none");
  const [selectedMaterial, setMaterial] = useState("none");
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    setShow("moreInfo");
    dispatch(allWishlist()), dispatch(allProducts()), dispatch(allBaskets());
  }, []);

  const handleImageClick = (event) => {
    const clickedImage = event.target;
    setMainImage(clickedImage.src);

    const parentElements = document.querySelectorAll(".opacity");
    parentElements.forEach((parentElement) => {
      parentElement.classList.remove("opacity");
    });

    clickedImage.classList.add("opacity");
  };
  const handleInfoClick = (event) => {
    const clickedBtn = event.target;
    const parentElements = document.querySelectorAll(".colorful");
    parentElements.forEach((parentElement) => {
      parentElement.classList.remove("colorful");
    });

    clickedBtn.classList.add("colorful");
    setShow(clickedBtn.parentElement.classList.value);
  };
  useEffect(() => {
    if (product) {
      setMainImage(product.images[0].images);
      const firstImage = document.querySelector(
        'img[src="' + product.images[0].images + '"]'
      );
      if (firstImage) {
        firstImage.classList.add("opacity");
      }
    }
  }, [product]);

  const handleClick = (value, name) => {
    if (name === "size") setSize(value);
    if (name === "color") setColor(value);
    if (name === "material") setMaterial(value);
  };
  const skeletonArr = [1, 2, 3, 4];
  useEffect(() => {
    if (colorArray?.length > 0 && selectedColor === "none") {
      handleClick(colorArray[0], "color");
    }

    if (sizeArray?.length > 0 && selectedSize === "none") {
      handleClick(sizeArray[0], "size");
    }

    if (materialArray?.length > 0 && selectedMaterial === "none") {
      handleClick(materialArray[0], "material");
    }
  }, [
    colorArray,
    selectedColor,
    sizeArray,
    selectedSize,
    materialArray,
    selectedMaterial,
  ]);
  const addTocart = async () => {
    const data = {
      userId: user?._id,
      productId: product?._id,
      size: selectedSize,
      material: selectedMaterial,
      color: selectedColor,
      quantity: quantity,
    };
    if (
      sizeArray.includes(selectedSize) &&
      colorArray.includes(selectedColor) &&
      materialArray.includes(selectedMaterial)
    ) {
      localUser?.token
        ? (await dispatch(addBasket({ data, enqueueSnackbar }))) &&
          dispatch(allBaskets())
        : navigate("/login-register") &
          enqueueSnackbar("Please first login or register!", {
            variant: "info",
          });
      setSize("none");
      setMaterial("none");
      setColor("none");
      setQuantity(1);
    } else {
      enqueueSnackbar("Please select all values!", { variant: "info" });
    }
  };

  const addToWishList = async () => {
    try {
      localUser?.token
        ? await dispatch(
            addWishlist({
              userId: user?._id,
              productId: product?._id,
              enqueueSnackbar,
            })
          )
        : navigate("/login-register") &
          enqueueSnackbar("Please first login or register!", {
            variant: "info",
          });
      dispatch(allWishlist());
    } catch (error) {
      return error;
    }
  };
  const removeItemWishlist = async () => {
    await dispatch(
      deleteWishlist({
        userId: user._id,
        productId: product._id,
        enqueueSnackbar,
      })
    );
    dispatch(allWishlist());
  };
  const isAddedToWishlist = (productId) => {
    return wishlist[0]?.products?.some((item) => item._id === productId);
  };
  return (
    <>
      <SiteHeader />
      <Helmet>
        <meta charSet="utf-8" />
        <title>{product?.name}</title>
      </Helmet>
      <div id="detailPage">
        <div className="mainDiv">
          <div className="title">
            <h2>{product?.name}</h2>
            <div className="link-title">
              <Link to={"/"}>Home /</Link> <span>{product?.name}</span>
            </div>
          </div>
          <div className="productDetailDiv">
            <div className="container">
              <div className="leftSec">
                <div className="mainImg">
                  {product ? (
                    <img src={mainImage} />
                  ) : (
                    <Skeleton variant="rounded" width={"100%"} height={400} />
                  )}
                </div>
                <div className="childImgs">
                  {product ? (
                    <div className="childImg">
                      {product?.images.map((e) => {
                        return (
                          <img
                            src={e?.images}
                            onClick={handleImageClick}
                            key={e._id}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    <div className="childSkeleton">
                      {skeletonArr.map((e) => {
                        return (
                          <Skeleton
                            variant="rounded"
                            width={"100%"}
                            height={70}
                            key={e}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div className="rightSec">
                {product ? (
                  <>
                    <div className="name">
                      <h2>{product?.name}</h2>
                    </div>
                    <div className="description">
                      <p>{product?.description}</p>
                    </div>
                    <div className="price">
                      <p className="priceTyp">
                        <span
                          className={
                            product?.discounted ? "oldPrice" : "oldPriceColor"
                          }
                        >
                          ${product?.sale}
                        </span>
                        <span className="newPrice">
                          {product?.discounted
                            ? `$${product?.sale -
                                (product?.sale / 100) * product?.discounted}`
                            : ""}
                        </span>
                      </p>
                    </div>
                    <div
                      className="sizeMain"
                      style={{ display: sizeArray[0] === "none" && "none" }}
                    >
                      <p className="sizeText">Size:</p>
                      {sizeArray?.map((size) => {
                        return (
                          <div
                            key={size}
                            className="size"
                            onClick={() => handleClick(size, "size")}
                            style={{
                              color: selectedSize === size && "#ff4136",
                            }}
                          >
                            {size}
                          </div>
                        );
                      })}
                    </div>
                    <div
                      className="colorMain"
                      style={{ display: colorArray[0] === "none" && "none" }}
                    >
                      <p className="colorText">Color:</p>
                      <div className="colorsDiv">
                        {colorArray.map((color) => {
                          return (
                            <div
                              key={color}
                              style={{
                                backgroundColor: color,
                                border:
                                  selectedColor == color &&
                                  "1px solid rgb(43, 35, 35, 0.868)",
                              }}
                              className="color"
                              title={color}
                              onClick={() => handleClick(color, "color")}
                            >
                              {selectedColor === color && (
                                <span role="img" aria-label="selected">
                                  ✔
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div
                      className="materialMain"
                      style={{ display: materialArray[0] === "none" && "none" }}
                    >
                      <p className="materialText">Material:</p>
                      <div className="materialDiv">
                        {materialArray?.map((material) => {
                          return (
                            <div
                              key={material}
                              className="material"
                              onClick={() =>
                                handleClick(material, (name = "material"))
                              }
                              style={{
                                color:
                                  selectedMaterial === material && "#ff4136",
                              }}
                            >
                              {material}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="quantityMain">
                      <p>Quantity:</p>
                      <div className="quantity">
                        <Button
                          onClick={() => setQuantity(+quantity - 1)}
                          disabled={quantity > 1 ? false : true}
                          className="quantityButton"
                        >
                          -
                        </Button>
                        <p>{quantity}</p>
                        <Button
                          className="quantityBtn"
                          onClick={() => setQuantity(+quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div className="buttons">
                      <div className="addToCartBtn">
                        <button
                          onClick={() => {
                            addTocart();
                          }}
                        >
                          {loadingBasket ? (
                            <CircularProgress size={25} />
                          ) : (
                            "BUY NOW"
                          )}
                        </button>
                      </div>
                      <div className="addWishlist">
                        {isAddedToWishlist(product._id) ? (
                          <button onClick={removeItemWishlist}>
                            <i className="fa-solid added fa-heart"></i>
                          </button>
                        ) : (
                          <button onClick={addToWishList}>
                            <i className="fa-regular notadded fa-heart"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <Skeleton variant="text" width={"60%"} height={50} />
                    <Skeleton variant="text" width={"100%"} height={100} />
                    <Skeleton variant="text" width={200} height={50} />
                    <Skeleton variant="text" width={100} height={50} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="extraInfoSec">
            <div className="container">
              <div className="mainInfoBtn">
                <div className="moreInfo">
                  <p onClick={handleInfoClick} className="colorful">
                    More Info
                  </p>
                </div>
                <div className="customTab-1">
                  <p onClick={handleInfoClick}>Custom Tab-1</p>
                </div>
                <div className="customTab-2">
                  <p onClick={handleInfoClick}>Custom Tab-2</p>
                </div>
              </div>
              <div className="mainInfoEachSec">
                {(show === "moreInfo" && <MoreInfo />) ||
                  (show === "customTab-1" && <CustomTab1 />) ||
                  (show === "customTab-2" && <CustomTab2 />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;
