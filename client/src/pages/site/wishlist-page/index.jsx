import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SiteHeader from "../../../layouts/site/header/header";
import {
  allWishlist,
  clearWishlistAsync,
  deleteWishlist,
  selectWishlist,
} from "../../../redux/slice/wishList";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import "./index.scss";
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Popover,
  Select,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import {
  addBasket,
  allBaskets,
  SelectLoadingBasket,
} from "../../../redux/slice/addToBasket";
import { selectLocalUser, selectUser } from "../../../redux/slice/authSlice";

// -----------------

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

// ------------

const Wishlist = () => {
  // -----------

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [wishlistLength, setWishlistLength] = useState("");

  // -----
  const loadingBasket = useSelector(SelectLoadingBasket);
  // -----
  const wishlist = useSelector(selectWishlist);
  // -----
  const localUser = useSelector(selectLocalUser);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(allWishlist());
  }, []);
  useEffect(() => {
    wishlist.length === 0
      ? setWishlistLength(0)
      : setWishlistLength(wishlist[0]?.products?.length);
  }, [wishlist]);
  
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  //   ----
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")} ${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(
      date.getSeconds()
    ).padStart(2, "0")}`;
  };
  //   -----
  const handleClearWishlist = async () => {
    let userId = user._id;
    await dispatch(clearWishlistAsync({ userId: userId, enqueueSnackbar }));
    await dispatch(allWishlist());
  };
  //   ----
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
  const delimiter = ",";
  const sizeArray = expandedCardId?.size?.split(delimiter);
  const colorArray = expandedCardId?.color?.split(delimiter);
  const materialArray = expandedCardId?.material?.split(delimiter);
  const [selectedSize, setSize] = useState("none");
  const [selectedColor, setColor] = useState("none");
  const [selectedMaterial, setMaterial] = useState("none");
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "size") setSize(value);
    if (name === "color") setColor(value);
    if (name === "material") setMaterial(value);
  };
  const addTocart = async (e) => {
    const data = {
      userId: user._id,
      productId: e._id,
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
    } else enqueueSnackbar("Please select all values!", { variant: "info" });
    return;
  };
  return (
    <>
      <SiteHeader />
      <Helmet>
        <meta charSet="utf-8" />
        <title>Me Wishlist</title>
      </Helmet>
      <Box id="wishlistPage">
        <Box className="headerForWishlit">
          <Box className="container">
            <h2>Your Wish List</h2>
            <Box className="link-title">
              <Link to={"/"}>Home /</Link> <span> Wishlist</span>
            </Box>
          </Box>
        </Box>
        <Box className="bodyForWishlist">
          <Box className="container">
            {wishlistLength === 0 ? (
              <>
                <Box className="ifEmptyWishlist">
                  <Box className="emptyBox"></Box>
                  <p className="message">Your Wish list is empty!</p>
                </Box>
                <Box className="startShoppingMainDiv">
                  <Box className="startShoppingDiv">
                    <Box className="heartIconDiv">
                      <FavoriteBorderOutlinedIcon className="heartIcon" />
                    </Box>
                    <p>Don't be bad, let's go shopping.</p>
                    <Button
                      variant="outlined"
                      className="shopBtn"
                      onClick={() => navigate("/products")}
                    >
                      Start shopping
                    </Button>
                  </Box>
                </Box>
                <Box className="shopBtnMobDiv">
                  <Button
                    variant="outlined"
                    className="shopBtnMobile"
                    onClick={() => navigate("/products")}
                  >
                    Start shopping
                  </Button>
                </Box>
              </>
            ) : (
              <Box maxWidth="1150px" margin="0 auto">
                <Box className="popUpClearWishlist">
                  <h2>Your products in wish list:</h2>
                  <PopupState variant="popover" popupId="demo-popup-popover">
                    {(popupState) => (
                      <Box>
                        <Button
                          className="clearBtn"
                          variant="contained"
                          {...bindTrigger(popupState)}
                        >
                          Clear all Wishlist
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
                          <Button onClick={handleClearWishlist}>Yes</Button>
                          <Button onClick={popupState.close}>No</Button>
                        </Popover>
                      </Box>
                    )}
                  </PopupState>
                </Box>
                <Grid className="wishList">
                  {wishlist[0]?.products?.map((e) => {
                    return (
                      <Box className="cartsBox" key={e._id}>
                        <Card className="carts">
                          <CardHeader
                            titleTypographyProps={{
                              style: {
                                fontSize:
                                  width > 1023
                                    ? "18px"
                                    : width <= 1023 && width > 767
                                    ? "14px"
                                    : "12px",
                              },
                            }}
                            subheaderTypographyProps={{
                              style: { fontSize: "14px" },
                            }}
                            sx={{ maxHeight: 70 }}
                            title={e.name}
                            subheader={formatTime(e.createdAt)}
                            className="cartHeader"
                          />
                          <CardMedia
                            component="img"
                            height="194"
                            image={e?.images[0]?.images}
                            alt="Paella dish"
                          />
                          <CardContent sx={{ maxHeight: 50 }}>
                            <Typography variant="body2" color="text.secondary">
                              {e.discounted ? `Discount: ${e.discounted}%` : ""}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <span
                                style={{
                                  color: "#9c9b9b",
                                  textDecoration: "line-through",
                                  fontSize: "16px",
                                }}
                              >
                                {e.discounted ? `$${e.sale}   ` : ""}
                              </span>
                              <span
                                style={{
                                  fontSize: "16px",
                                }}
                              >
                                {e.discounted
                                  ? ` $${e.sale -
                                      (e.sale / 100) * e.discounted}`
                                  : `$${e.sale}`}
                              </span>
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <IconButton
                              aria-label="add to favorites"
                              onClick={() => {
                                removeItemWishlist(e._id);
                              }}
                            >
                              <span
                                title="Remove Wishlist"
                                className="ti-heart-broken icon"
                                style={{ color: "#ff4136" }}
                              ></span>
                            </IconButton>
                            <ExpandMore
                              onClick={() => {
                                expandedCardId?._id === e._id
                                  ? setExpandedCardId(null)
                                  : setExpandedCardId(e);
                              }}
                              expand={expandedCardId?._id === e._id}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </ExpandMore>
                          </CardActions>
                          <Collapse
                            in={expandedCardId?._id === e._id}
                            timeout="auto"
                            unmountOnExit
                          >
                            <CardContent className="cardContent">
                              <Typography paragraph>Features:</Typography>
                              {expandedCardId?._id === e._id ? (
                                <div className="wishlistCardMainDiv">
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
                                      item?.array.length === 1 &&
                                      item?.array[0] === "none"
                                    ) {
                                      return null;
                                    }

                                    return (
                                      <FormControl
                                        key={item.name}
                                        sx={{ m: 1, minWidth: 120 }}
                                        className="wishlistControl"
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
                                          className="wishListSelect"
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
                              ) : null}
                              <div className="quantity">
                                <p>Quantity:</p>
                                <div className="qunatityMainBtn">
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
                              </div>
                              <div className="addToCartBtn">
                                <button
                                  onClick={() => {
                                    addTocart(e);
                                  }}
                                >
                                  {loadingBasket ? (
                                    <CircularProgress
                                      size={25}
                                      sx={{ marginTop: 1 }}
                                    />
                                  ) : (
                                    "Add To Cart"
                                  )}
                                </button>
                              </div>
                            </CardContent>
                          </Collapse>
                        </Card>
                      </Box>
                    );
                  })}
                </Grid>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Wishlist;
