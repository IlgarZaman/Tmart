import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  selectloadingProduct,
  selectTypeFour,
  selectTypeOne,
  selectTypeThree,
  selectTypeTwo,
} from "../../../../redux/slice/getDataProducts";
import { Swiper, SwiperSlide } from "swiper/react";
import "./index.scss";
import "./swiper.scss";
import { Autoplay } from "swiper";
import "swiper/css/navigation";
import {
  addWishlist,
  allWishlist,
  deleteWishlist,
  selectLoadingWishlist,
  selectWishlist,
} from "../../../../redux/slice/wishList";
import { enqueueSnackbar } from "notistack";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
} from "@mui/material";
import {
  addBasket,
  allBaskets,
  SelectLoadingBasket,
} from "../../../../redux/slice/addToBasket";
import { selectLocalUser, selectUser } from "../../../../redux/slice/authSlice";
const ThirdSection = () => {
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [selectProduct, setSelectProduct] = useState([]);
  // ------
  const typeOne = useSelector(selectTypeOne);
  const typeTwo = useSelector(selectTypeTwo);
  const typeThree = useSelector(selectTypeThree);
  const typeFour = useSelector(selectTypeFour);
  const loadingProduct = useSelector(selectloadingProduct);
  // ------
  const wishlist = useSelector(selectWishlist);
  const loadingWishlist = useSelector(selectLoadingWishlist);
  // ------

  const loadingBasket = useSelector(SelectLoadingBasket);
  // ------
  const localUser = useSelector(selectLocalUser);
  const user = useSelector(selectUser);

  //
  const skeletonArr = [1, 2, 3, 4, 5, 6, 7, 8];
  //
  const [productLength, setProductLength] = useState(0);
  useEffect(() => {
    setProductLength(typeOne.length);
  }, [typeOne]);
  //
  const delimiter = ",";
  const sizeArray = selectProduct?.size?.split(delimiter);
  const colorArray = selectProduct?.color?.split(delimiter);
  const materialArray = selectProduct?.material?.split(delimiter);
  const [selectedSize, setSize] = useState("none");
  const [selectedColor, setColor] = useState("none");
  const [selectedMaterial, setMaterial] = useState("none");
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "size") setSize(value);
    if (name === "color") setColor(value);
    if (name === "material") setMaterial(value);
  };

  const openModal = (e) => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
    setSelectProduct(e);
  };
  const closeModal = () => {
    setIsOpen(false);
    setSize("none");
    setMaterial("none");
    setColor("none");
    setQuantity(1);
  };
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
      document.body.style.overflow = "auto";
    }
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);
  const getTypeOne = () => {
    setData([]);
    setData(typeOne);
  };
  const getTypeTwo = () => {
    setData([]);
    setData(typeTwo);
  };
  const getTypeThree = () => {
    setData([]);
    setData(typeThree);
  };
  const getTypeFour = () => {
    setData([]);
    setData(typeFour);
  };
  useEffect(() => {
    setData(typeOne);
  }, [typeOne]);

  const addTocart = async (selectProduct) => {
    const data = {
      userId: user?._id,
      productId: selectProduct?._id,
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
  const addToWishList = async (e) => {
    try {
      localUser?.token
        ? await dispatch(
            addWishlist({
              userId: user._id,
              productId: e._id,
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
  const isAddedToWishlist = (productId) => {
    return wishlist[0]?.products?.some((item) => item._id === productId);
  };
  const removeItemWishlist = async (id) => {
    await dispatch(
      deleteWishlist({
        userId: user._id,
        productId: id,
        enqueueSnackbar,
      })
    );
    dispatch(allWishlist());
  };

  return (
    <div id="thirdSection">
      <div className="container">
        <div className="mainDiv">
          <div className="jwMenu">
            <div className="header">
              <h3>BAGS & SHOES</h3>
            </div>
            <div className="body">
              <ul>
                <li>
                  <Link to={"/products"}>Duffel Bag</Link>
                </li>
                <li>
                  <Link to={"/products"}>Shoulder Bags</Link>
                </li>
                <li>
                  <Link to={"/products"}>Tote Bags</Link>
                </li>
                <li>
                  <Link to={"/products"}>Clutches & Evening</Link>
                </li>
                <li>
                  <Link to={"/products"}>Hobos</Link>
                </li>
                <li>
                  <Link to={"/products"}>Aaron Preacher</Link>
                </li>
                <li>
                  <Link to={"/products"}>Tyler Mansfield</Link>
                </li>
                <li>
                  <Link to={"/products"}>Nathan Valencia</Link>
                </li>
                <li>
                  <Link to={"/products"}>Patrick Sumugat</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="productsType">
            <div className="header">
              <ul>
                <li>
                  <Link to={"#"}>
                    <div className="tab-menu-text" onClick={getTypeOne}>
                      <h4
                        className={data[0]?.type === "featured" ? "active" : ""}
                      >
                        featured
                      </h4>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to={"#"}>
                    <div className="tab-menu-text" onClick={getTypeTwo}>
                      <h4
                        className={data[0]?.type === "bestsale" ? "active" : ""}
                      >
                        best sale
                      </h4>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to={"#"}>
                    <div className="tab-menu-text" onClick={getTypeThree}>
                      <h4
                        className={data[0]?.type === "onsale" ? "active" : ""}
                      >
                        on sale
                      </h4>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to={"#"}>
                    <div className="tab-menu-text" onClick={getTypeFour}>
                      <h4
                        className={data[0]?.type === "latest" ? "active" : ""}
                      >
                        latest
                      </h4>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
            {productLength === 0 ? (
              <Swiper
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                loop={true}
                className="mySwiper"
                style={{
                  height: "80%",
                }}
                breakpoints={{
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                  768: {
                    spaceBetween: 30,
                    slidesPerView: 2,
                  },
                  1: {
                    slidesPerView: 1,
                  },
                }}
              >
                {skeletonArr.map((e) => {
                  return (
                    <SwiperSlide key={e}>
                      <Box
                        style={{
                          margin:
                            window.innerWidth >= 768 && window.innerWidth < 1024
                              ? "50px 0 20px 0"
                              : null || window.innerWidth < 768
                              ? "50px 0 20px 0"
                              : null,
                        }}
                      >
                        <Skeleton
                          variant="rectangular"
                          width={210}
                          height={150}
                        />
                        <Skeleton width={180} height={40} />
                        <Skeleton width={130} height={30} />
                      </Box>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            ) : (
              <div className="body">
                <Swiper
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  modules={[Autoplay]}
                  loop={true}
                  className="mySwiper"
                  breakpoints={{
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 30,
                    },
                    768: {
                      spaceBetween: 30,
                      slidesPerView: 2,
                    },
                    1: {
                      slidesPerView: 1,
                    },
                  }}
                >
                  {data.map((e) => {
                    return (
                      <SwiperSlide key={e._id}>
                        {loadingProduct ? (
                          <Box>
                            <Skeleton
                              variant="rectangular"
                              width={210}
                              height={118}
                            />
                            <Skeleton width={140} height={30} />
                            <Skeleton width={110} height={20} />
                          </Box>
                        ) : (
                          <div className="productDiv">
                            <div className="productPicture">
                              <img src={e?.images[0].images} alt="" />
                              <div className="hoverMenu">
                                <div className="icons">
                                  <ul>
                                    <li>
                                      <span
                                        title="Add to Cart"
                                        className="ti-shopping-cart icon"
                                        onClick={() => {
                                          openModal(e);
                                        }}
                                      ></span>
                                    </li>
                                    <span className="line">|</span>
                                    {loadingWishlist ? (
                                      <CircularProgress size={18} />
                                    ) : (
                                      <li>
                                        {isAddedToWishlist(e._id) ? (
                                          <span
                                            title="Remove Wishlist"
                                            className="ti-heart-broken icon"
                                            onClick={() => {
                                              removeItemWishlist(e._id);
                                            }}
                                          ></span>
                                        ) : (
                                          <span
                                            title="Add Wishlist"
                                            className="ti-heart icon"
                                            onClick={() => {
                                              addToWishList(e);
                                            }}
                                          ></span>
                                        )}
                                      </li>
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="productTitle">
                              <p>{e.name}</p>
                              <div className={"discountedPrice"}>
                                <span
                                  className={
                                    e.discounted ? "oldPrice" : "oldPriceColor"
                                  }
                                >
                                  ${e.sale}
                                </span>
                                <span className="newPrice">
                                  {e.discounted
                                    ? `$${e.sale -
                                        (e.sale / 100) * e.discounted}`
                                    : ""}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
                {isOpen && (
                  <div className="modal-overlay" onClick={handleOverlayClick}>
                    <div className="modal-content">
                      <div className="closeDiv">
                        <span
                          title="Close"
                          onClick={() => {
                            closeModal();
                          }}
                        >
                          ×
                        </span>
                      </div>
                      <div className="mainContentDiv">
                        <div className="imageDiv">
                          <img src={selectProduct.images[0].images} alt="" />
                        </div>
                        <div className="textDiv">
                          <h1>{selectProduct.name}</h1>
                          <div className={"discountedPrice"}>
                            <span className="newPrice">
                              {selectProduct.discounted
                                ? `$${selectProduct.sale -
                                    (selectProduct.sale / 100) *
                                      selectProduct.discounted}`
                                : ""}
                            </span>
                            <span
                              className={
                                selectProduct.discounted
                                  ? "oldPrice"
                                  : "oldPriceColor"
                              }
                            >
                              {`$${selectProduct.sale}`}
                            </span>
                          </div>
                          <p>{selectProduct.description}</p>
                          <div>
                            {[
                              {
                                name: "size",
                                array: sizeArray,
                                value: selectedSize,
                              },
                              {
                                name: "color",
                                array: colorArray,
                                value: selectedColor,
                              },
                              {
                                name: "material",
                                array: materialArray,
                                value: selectedMaterial,
                              },
                            ].map((item) => {
                              if (
                                item.array.length === 1 &&
                                item.array[0] === "none"
                              ) {
                                return null;
                              }

                              return (
                                <FormControl
                                  key={item.name}
                                  sx={{ m: 1, minWidth: 120 }}
                                >
                                  <InputLabel htmlFor={item.name}>
                                    {item.name.charAt(0).toUpperCase() +
                                      item.name.slice(1)}
                                  </InputLabel>
                                  <Select
                                    name={item.name}
                                    value={item.value}
                                    onChange={handleChange}
                                    displayEmpty
                                    inputProps={{
                                      "aria-label": "Without label",
                                      id: item.name,
                                    }}
                                  >
                                    <MenuItem value="none">
                                      <em>None</em>
                                    </MenuItem>
                                    {item.array.map((e, i) => (
                                      <MenuItem key={i} value={e}>
                                        {e}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              );
                            })}
                          </div>
                          <div className="quantity">
                            <p>Quantity:</p>
                            <Button
                              onClick={() => setQuantity(+quantity - 1)}
                              disabled={quantity > 1 ? false : true}
                              className="quantityButton"
                            >
                              -
                            </Button>
                            <p>{quantity}</p>
                            <Button
                              className="quantityButton"
                              onClick={() => setQuantity(+quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                          <div className="addToCartBtn">
                            <button
                              onClick={() => {
                                addTocart(selectProduct);
                              }}
                            >
                              {loadingBasket ? (
                                <CircularProgress
                                  size={25}
                                  sx={{ marginTop: 2 }}
                                />
                              ) : (
                                "Add To Cart"
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThirdSection;
