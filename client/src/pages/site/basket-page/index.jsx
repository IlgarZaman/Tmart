import {
  Button,
  FormControl,
  MenuItem,
  Popover,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import SiteHeader from "../../../layouts/site/header/header";
import {
  allBaskets,
  clearBasketAsync,
  deleteBasket,
  selectBasket,
  updateBasket,
} from "../../../redux/slice/addToBasket";
import "./index.scss";
import { enqueueSnackbar } from "notistack";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link, useNavigate } from "react-router-dom";
import {
  allProducts,
  selectProducts,
} from "../../../redux/slice/getDataProducts";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import { selectUser } from "../../../redux/slice/authSlice";
const BasketPage = () => {
  const [basketLength, setBasketLength] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const basket = useSelector(selectBasket);
  const products = useSelector(selectProducts);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(allBaskets());
    dispatch(allProducts());
  }, []);
  useEffect(() => {
    setBasketLength(basket.length);
  }, [basket]);
  const handleChange = async (event, basketItem) => {
    const { name, value } = event.target;
    let updatedItem = {
      ...basketItem,
      [name]: value,
    };
    const updateData = {
      userId: user?._id,
      productId: updatedItem._id,
      productItemId: updatedItem.id,
      size: updatedItem.size,
      material: updatedItem.material,
      color: updatedItem.color,
      quantityChange: 0,
    };

    (await dispatch(updateBasket({ updateData }))) && dispatch(allBaskets());
  };
  let totalPrice = 0;
  const basketProductData = basket.map((item) => ({
    id: item.product,
    quantity: item.quantity,
    size: item.size,
    color: item.color,
    material: item.material,
    _id: item._id,
  }));
  const filteredProducts = products.filter((product) => {
    const matchingBasketItems = basketProductData.filter(
      (basketItem) => basketItem.id === product._id
    );
    return matchingBasketItems?.length > 0;
  });
  filteredProducts.map((e) => {
    const basketItem = basketProductData.find((item) => item.id === e._id);
    totalPrice = e.discounted
      ? `${+totalPrice +
          (e.sale - (e.sale / 100) * e.discounted) * basketItem.quantity}`
      : +totalPrice + e.sale * basketItem.quantity;
  });
  const deleteBasketByID = async (basketItem) => {
    await dispatch(
      deleteBasket({
        userId: user._id,
        productId: basketItem._id,
        enqueueSnackbar,
      })
    );
    await dispatch(allBaskets());
  };

  const handleIncrease = async (basketItem) => {
    const updateData = {
      userId: user?._id,
      productId: basketItem._id,
      size: basketItem.size,
      material: basketItem.material,
      color: basketItem.color,
      quantityChange: 1,
      actionType: "increase",
    };
    (await dispatch(updateBasket({ updateData }))) && dispatch(allBaskets());
  };

  const handleDecrease = async (basketItem) => {
    const updateData = {
      userId: user?._id,
      productId: basketItem._id,
      size: basketItem.size,
      material: basketItem.material,
      color: basketItem.color,
      quantityChange: -1,
      actionType: "decrease",
    };
    if (basketItem.quantity > 1) {
      (await dispatch(updateBasket({ updateData }))) && dispatch(allBaskets());
    }
  };
  const handleClearBasket = async () => {
    let userId = user._id;
    await dispatch(clearBasketAsync({ userId: userId, enqueueSnackbar }));
    await dispatch(allBaskets());
  };
  const sendEmail = () => {
    const customer = user;
    const emailData = {
      Host: process.env.REACT_APP_SMPT_HOST,
      Username: process.env.REACT_APP_SMPT_USERNAME,
      Password: process.env.REACT_APP_SMPT_PASSWORD,
      To: user.email,
      From: process.env.REACT_APP_SMPT_FROM,
      Subject: "Product Details",
      Body: `
      <h3 style="color:black;padding:0;margin:0;">Dear: ${customer?.name} ${
        customer?.surname
      }<h3>
      <p style="font-size:14px;">Thank you for using our market.</p>
      <ul style="list-style-type: none; padding: 0;">
      ${filteredProducts
        .map((product) => {
          const basketItem = basketProductData.filter(
            (basketItem) => basketItem.id === product._id
          );
          return basketItem.map(
            (basketItem) =>
              `<div style="display:flex;align-items:center">
            <div>
            <img src=${product.images?.[0].images}  width="150" height="150">
            </div>
            <div style="margin-left:5px;">
            <li style="margin: 10px 5px;padding: 5px;>
            <p style="font-size:16px;">Product Name: ${product.name}</p>
            <p style="font-size:16px;">Price: ${
              product.discounted
                ? `${product.sale - (product.sale / 100) * product.discounted}`
                : product.sale
            }$<p>
            <p style="font-size:16px;">Quantity: ${basketItem.quantity}<p>
            </li>
            </div>
          </div>
          `
          );
        })
        .join("")}
        <p style="font-size:14px; color:darkblue">Total price: ${totalPrice}$<p>
        </ul>
      <p style="font-size:14px;">'Tmart' online-market is just a startup project.<p>
      <p style="color:red;font-size:12px;">All rights reserved for this project.<p>
       `,
      IsHtml: true,
    };
    window.Email.send(emailData)
      .then((response) => {
        const message =
          "Your carts detail sent your own mail! Please check your mail inbox or span.";
        enqueueSnackbar(message, { variant: "success" });
      })
      .catch((error) => {
        const message = "Something be wrong!";
        enqueueSnackbar(message, { variant: "error" });
      });
  };

  return (
    <>
      <SiteHeader />
      <Helmet>
        <meta charSet="utf-8" />
        <title>Me Basket</title>
      </Helmet>
      <div id="basketpage">
        <div className="headerForBasket">
          <div className="container">
            <h2>Your Shopping Cart</h2>
            <div className="link-title">
              <Link to={"/"}>Home /</Link> <span> Basket</span>
            </div>
          </div>
        </div>
        {basketLength === 0 ? (
          <>
            <div className="container">
              <div className="ifEmptyBasket">
                <div className="emptydiv"></div>
                <p className="message">Your Basket is empty!</p>
              </div>
              <div className="startShoppingMainDiv">
                <div className="startShoppingDiv">
                  <div className="heartIconDiv">
                    <LocalMallOutlinedIcon className="heartIcon" />
                  </div>
                  <p>Don't be bad, let's go shopping.</p>
                  <Button
                    variant="outlined"
                    className="shopBtn"
                    onClick={() => navigate("/products")}
                  >
                    Start shopping
                  </Button>
                </div>
              </div>
              <div className="shopBtnMobDiv">
                <Button
                  variant="outlined"
                  className="shopBtnMobile"
                  onClick={() => navigate("/products")}
                >
                  Start shopping
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="popUpClearBasket container">
              <h2>Your products in basket:</h2>
              <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                  <div>
                    <Button
                      className="clearBtn"
                      variant="contained"
                      {...bindTrigger(popupState)}
                    >
                      Clear all Basket
                    </Button>
                    <Popover
                      {...bindPopover(popupState)}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                    >
                      <Typography sx={{ p: 2 }}>Are you sure?</Typography>
                      <Button onClick={handleClearBasket}>Yes</Button>
                      <Button onClick={popupState.close}>No</Button>
                    </Popover>
                  </div>
                )}
              </PopupState>
            </div>
            <div className="bodyForBasket">
              <div className="container">
                {filteredProducts?.map((e) => {
                  const basketItem = basketProductData.filter(
                    (basketItem) => basketItem.id === e._id
                  );
                  const delimiter = ",";
                  const materialArray = e?.material?.split(delimiter);
                  const sizeArray = e?.size?.split(delimiter);
                  const colorArray = e?.color?.split(delimiter);
                  return basketItem.map((basketItem, index) => (
                    <div className="mainBasketDiv" key={`${e._id}-${index}`}>
                      <div className="imgDiv">
                        <img src={e.images?.[0].images} alt="" />
                      </div>
                      <div className="textDiv">
                        <div className="leftSection">
                          <div className="mainName">
                            <div className="name">
                              <p>{e.name}</p>
                            </div>
                            <div className="formcontrol">
                              {["size", "color", "material"].map((property) => {
                                if (e[property] === "none") {
                                  return null;
                                }
                                return (
                                  <FormControl
                                    key={property}
                                    sx={{ m: 1, minWidth: 120 }}
                                  >
                                    <Select
                                      className="selectBasket"
                                      name={property}
                                      defaultValue={basketItem[property]}
                                      value={basketItem[property]}
                                      onChange={(event) =>
                                        handleChange(event, basketItem)
                                      }
                                      displayEmpty
                                      inputProps={{
                                        "aria-label": "Without label",
                                      }}
                                    >
                                      {property === "size"
                                        ? sizeArray.map((e, i) => (
                                            <MenuItem key={i} value={e}>
                                              {e}
                                            </MenuItem>
                                          ))
                                        : property === "color"
                                        ? colorArray.map((e, i) => (
                                            <MenuItem key={i} value={e}>
                                              {e}
                                            </MenuItem>
                                          ))
                                        : materialArray.map((e, i) => (
                                            <MenuItem key={i} value={e}>
                                              {e}
                                            </MenuItem>
                                          ))}
                                    </Select>
                                  </FormControl>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="centerAndRightSection">
                          <div className="centerSection">
                            <div className="button">
                              <Button
                                sx={{
                                  border: 1,
                                  borderColor: "grey.500",
                                  marginRight: "15px",
                                }}
                                onClick={() => handleDecrease(basketItem)}
                                disabled={
                                  basketItem.quantity > 1 ? false : true
                                }
                                className="quantityButton"
                              >
                                -
                              </Button>
                              <p>{basketItem.quantity}</p>
                              <Button
                                sx={{
                                  border: 1,
                                  borderColor: "grey.500",
                                  marginLeft: "15px",
                                }}
                                className="quantityButton"
                                onClick={() => handleIncrease(basketItem)}
                              >
                                +
                              </Button>
                            </div>
                          </div>
                          <div className="rightSection">
                            <p>Price:</p>
                            <p>
                              {e.discounted
                                ? `${(e.sale - (e.sale / 100) * e.discounted) *
                                    basketItem.quantity}`
                                : e.sale * basketItem.quantity}
                              $
                            </p>
                            <p
                              onClick={() => {
                                deleteBasketByID(basketItem);
                              }}
                              className="deleteBtn"
                            >
                              <DeleteForeverIcon
                                titleAccess="Remove from list"
                                style={{ color: "red", fontSize: "28px" }}
                              />
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ));
                })}
                <div className="totalPrice">
                  <div className="priceText">
                    <p>Order Summary: </p>
                    <h4> {totalPrice} $</h4>
                  </div>
                  <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    onClick={sendEmail}
                    className="sendmailbutton"
                  >
                    Confirm Cart
                  </Button>
                </div>
              </div>
            </div>
            <div className="bodyForMobile">
              <div className="container">
                {filteredProducts?.map((e) => {
                  const basketItem = basketProductData.filter(
                    (basketItem) => basketItem.id === e._id
                  );
                  const delimiter = ",";
                  const materialArray = e?.material?.split(delimiter);
                  const sizeArray = e?.size?.split(delimiter);
                  const colorArray = e?.color?.split(delimiter);
                  return basketItem.map((basketItem, index) => (
                    <div className="mainBasketDiv" key={`${e._id}-${index}`}>
                      <div className="imgDiv">
                        <img src={e.images?.[0].images} alt="" />
                      </div>
                      <div className="mainTextDiv">
                        <div className="textDiv">
                          <div className="leftSection">
                            <div className="mainName">
                              <div className="name">
                                <p>{e.name}</p>
                              </div>
                              <div className="formcontrol">
                                {["size", "color", "material"].map(
                                  (property) => {
                                    if (e[property] === "none") {
                                      return null;
                                    }
                                    return (
                                      <FormControl
                                        key={property}
                                        sx={{ m: 1, minWidth: 120 }}
                                        className="formcontrolcss"
                                      >
                                        <Select
                                          className="selectBasket"
                                          name={property}
                                          defaultValue={basketItem[property]}
                                          value={basketItem[property]}
                                          onChange={(event) =>
                                            handleChange(event, basketItem)
                                          }
                                          displayEmpty
                                          inputProps={{
                                            "aria-label": "Without label",
                                          }}
                                        >
                                          {property === "size"
                                            ? sizeArray.map((e, i) => (
                                                <MenuItem key={i} value={e}>
                                                  {e}
                                                </MenuItem>
                                              ))
                                            : property === "color"
                                            ? colorArray.map((e, i) => (
                                                <MenuItem key={i} value={e}>
                                                  {e}
                                                </MenuItem>
                                              ))
                                            : materialArray.map((e, i) => (
                                                <MenuItem key={i} value={e}>
                                                  {e}
                                                </MenuItem>
                                              ))}
                                        </Select>
                                      </FormControl>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="centerAndRightSection">
                            <div className="centerSection">
                              <div className="button">
                                <Button
                                  sx={{
                                    border: 1,
                                    borderColor: "grey.500",
                                    marginRight: "15px",
                                  }}
                                  onClick={() => handleDecrease(basketItem)}
                                  disabled={
                                    basketItem.quantity > 1 ? false : true
                                  }
                                  className="quantityButton btnleft"
                                >
                                  -
                                </Button>
                                <p>{basketItem.quantity}</p>
                                <Button
                                  sx={{
                                    border: 1,
                                    borderColor: "grey.500",
                                    marginLeft: "15px",
                                  }}
                                  className="quantityButton btnright"
                                  onClick={() => handleIncrease(basketItem)}
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                            <div className="rightSection">
                              <p>Price:</p>
                              <p>
                                {e.discounted
                                  ? `${(e.sale -
                                      (e.sale / 100) * e.discounted) *
                                      basketItem.quantity}`
                                  : e.sale * basketItem.quantity}
                                $
                              </p>
                              <p
                                onClick={() => {
                                  deleteBasketByID(basketItem);
                                }}
                                className="deleteBtn"
                              >
                                <DeleteForeverIcon
                                  titleAccess="Remove from list"
                                  style={{ color: "red", fontSize: "28px" }}
                                />
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ));
                })}
                <div className="totalPrice">
                  <div className="priceText">
                    <p>Order Summary: </p>
                    <h4> {totalPrice} $</h4>
                  </div>
                  <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    onClick={sendEmail}
                    className="sendmailbutton"
                  >
                    Confirm Cart
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BasketPage;
