import React, { useEffect, useState } from "react";
import "./header.scss";
import logo_medium from "../../../assets/logo_medium.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Divide as Hamburger } from "hamburger-react";
import "./scrollHeader.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  allUsers,
  selectAllUsers,
  selectLocalUser,
  selectUser,
  setLogout,
  setUser,
} from "../../../redux/slice/authSlice";
import { allBaskets, selectBasket } from "../../../redux/slice/addToBasket";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
const SiteHeader = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const basket = useSelector(selectBasket);
  const users = useSelector(selectAllUsers);
  const localUser = useSelector(selectLocalUser);
  const [settings, setSettings] = useState(["Account", "Logout"]);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    user?.role === "admin"
      ? setSettings(newSettings)
      : user?.role === "superAdmin"
      ? setSettings(newSettings)
      : null;
  };
  const navigate = useNavigate();
  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    setting === "Account" ? navigate("/account") : "";
    setting === "Dashboard" ? navigate("/admin/dashboard") : "";
    setting === "Logout"
      ? (dispatch(setLogout()),
        navigate("/login-register"),
        enqueueSnackbar("Logout Account!", { variant: "default" }))
      : "";
    setSettings(["Account", "Logout"]);
  };
  const [basketCount, setBasketCount] = useState(0);
  const findUser = users?.find((item) => item._id === localUser?.id);
  const newSettings = [...settings, "Dashboard"];
  useEffect(() => {
    dispatch(allBaskets());
    dispatch(allUsers());
  }, []);
  useEffect(() => {
    dispatch(setUser(findUser));
  }, [users]);
  useEffect(() => {
    let count = basket.length;
    setBasketCount(count);
  }, [basket]);

  const [menu, setmenu] = useState(false);
  const [mobileMenu, SetMobileMenu] = useState(false);
  const [show, Setshow] = useState(false);
  const [show2, Setshow2] = useState(false);
  const [show3, Setshow3] = useState(false);
  const [show4, Setshow4] = useState(false);
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  }, []);
  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileMenu]);
  useEffect(() => {
    if (menu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menu]);
  return (
    <div id={scroll ? "scrolSiteHeader" : "SiteHeader"}>
      <div className="mainDiv">
        <div className="mainHeader container">
          <div className="left">
            <Link to={"/"} title={"Home"}>
              <img src={logo_medium} alt="logo_medium" />
            </Link>
          </div>
          <div className="mobileLeft">
            <Hamburger
              duration={0.8}
              toggled={mobileMenu}
              toggle={SetMobileMenu}
              distance="sm"
            />
          </div>
          <div className="mobileCenter">
            <Link to={"/"}>
              <img src={logo_medium} alt="logo_medium" />
            </Link>
          </div>

          <div className="center">
            <ul>
              <li>
                <NavLink to={"/"}>Home</NavLink>
              </li>
              <div className="navMenu">
                <li className="dropdown">
                  Shop
                  <div className="dropdownMenu">
                    <div className="forMan">
                      <div className="header">
                        <Link>Men Style</Link>
                      </div>
                      <div className="body">
                        <ul>
                          <li>
                            <Link to={"/products"}>Jackets & Coats</Link>
                          </li>
                          <li>
                            <Link to={"/products"}>Long T-Shirt</Link>
                          </li>
                          <li>
                            <Link to={"/products"}>Swim wear</Link>
                          </li>
                          <li>
                            <Link to={"/products"}>Prom Shoes</Link>
                          </li>
                          <li>
                            <Link to={"/products"}>sleeveless shirt</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="forWoman">
                      <div className="header">
                        <Link>women Style</Link>
                      </div>
                      <div className="body">
                        <ul>
                          <li>
                            <Link to={"/products"}>Shirts & Blouses</Link>
                          </li>
                          <li>
                            <Link to={"/products"}>Halter Tops</Link>
                          </li>
                          <li>
                            <Link to={"/products"}>Long pant</Link>
                          </li>
                          <li>
                            <Link to={"/products"}>Hoodies</Link>
                          </li>
                          <li>
                            <Link to={"/products"}>Sweatshirts</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="other">
                      <div className="header">
                        <Link>Other</Link>
                      </div>
                      <div className="body">
                        <ul>
                          <li>
                            <Link to={"/products"}>furnitures</Link>
                          </li>
                          <li>
                            <Link to={"/products"}>bags</Link>
                          </li>
                          <li>
                            <Link to={"/products"}>decoration</Link>
                          </li>
                          <li>
                            <Link to={"/products"}>accessories</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              </div>

              <div className="navMenu">
                <li className="dropdown">
                  Portfolio
                  <ul className="dropdown-menu">
                    <li>
                      <Link to={"/portfoliogrid"}>portfolio grid view</Link>
                    </li>
                    <li>
                      <Link to={"/portfoliosingle"}>single portfolio</Link>
                    </li>
                  </ul>
                </li>
              </div>

              <div className="navMenu">
                <li className="dropdown">
                  Product
                  <ul className="dropdown-menu">
                    <li>
                      <Link to={"/simpleproduct"}>simple product</Link>
                    </li>
                    <li>
                      <Link to={"/variableproduct"}>variable product</Link>
                    </li>
                    <li>
                      <Link to={"/affiliateproduct"}>affiliate product</Link>
                    </li>
                  </ul>
                </li>
              </div>

              <NavLink to={"/blog"}>
                <li>Blog</li>
              </NavLink>
              <div className="navMenu">
                <li className="dropdown">
                  Pages
                  <ul className="dropdown-menu">
                    <li>
                      <Link to={"/aboutus"}>about us</Link>
                    </li>
                    <li>
                      <Link to={"/contactus"}>contact us</Link>
                    </li>
                    <li>
                      <Link to={"/shippingpolicy"}>shipping policy</Link>
                    </li>
                  </ul>
                </li>
              </div>
            </ul>
          </div>
          <div className="right">
            <Link to={"/wishList"} title={"Favorite"} className="wishlist">
              <span title="Wishlist" className="ti-heart logo"></span>
            </Link>
            <Link to={"/meBasket"} title={"Basket"} className="shopLogo">
              <span className="ti-shopping-cart logo"></span>
              <div className="shopCount">
                <span>{basketCount}</span>
              </div>
            </Link>
            {localUser.token ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src={findUser?.image}
                      sx={{ width: "30px", height: "30px" }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting, number) => (
                    <MenuItem
                      key={number}
                      onClick={() => handleCloseUserMenu(setting)}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <Link to={"/login-register"}>
                <span className="ti-user logo"></span>
              </Link>
            )}
          </div>
          <div className="tabletMode">
            <Hamburger duration={0.8} toggled={menu} toggle={setmenu} />
          </div>
        </div>
        <div className={menu ? "menuTablets" : "noneMenuTablets"}>
          <div
            className="tabletsMainDiv"
            style={{ height: show ? "100vh" : "100vh" }}
          >
            <div className="eachTabletMode">
              {/* -------------------- */}
              <div className="menu1">
                <div className="functionBtn">
                  <div className="spanDiv">
                    <span className={show ? "spanRed" : "spanBlack"}>
                      {show ? " " : " "}
                    </span>
                  </div>
                  <button className="menu1Btn">
                    <Link to={"/"}>Home</Link>
                  </button>
                </div>
              </div>
              {/* -------------------- */}
              <div className="menu1">
                <div className="functionBtn">
                  <div className="spanDiv">
                    <span className={show ? "spanRed" : "spanBlack"}>
                      {show ? "-" : "+"}
                    </span>
                  </div>
                  <button
                    className="menu1Btn"
                    onClick={() => {
                      Setshow(!show);
                      Setshow4(false);
                      Setshow3(false);
                      Setshow2(false);
                    }}
                  >
                    Shop
                  </button>
                </div>
                <div className="menu1MainDiv">
                  <div
                    className={show ? "menu1Area shopArea" : "menu1AreaNone"}
                  >
                    <div>
                      <ul>
                        <div className="navMenu">
                          <Link to={"/products"}>
                            <li className="dark">men style</li>
                          </Link>

                          <Link to={"/products"}>
                            <li className="simple">Jackets & Coats</li>
                          </Link>
                          <Link to={"/products"}>
                            <li className="simple">Long T-Shirt</li>
                          </Link>
                          <Link to={"/products"}>
                            <li className="simple">Swim wear</li>
                          </Link>
                          <Link to={"/products"}>
                            <li className="simple">Prom Shoes</li>
                          </Link>
                          <Link to={"/products"}>
                            <li className="simple">sleeveless shirt</li>
                          </Link>
                        </div>
                      </ul>
                    </div>
                    <div>
                      <ul>
                        <div className="navMenu">
                          <Link to={"/products"}>
                            <li className="dark">women style</li>
                          </Link>
                          <Link to={"/products"}>
                            <li className="simple">Shirts & Blouses</li>
                          </Link>
                          <Link to={"/products"}>
                            <li className="simple">Halter Tops</li>
                          </Link>
                          <Link to={"/products"}>
                            <li className="simple">Long pant</li>
                          </Link>
                          <Link to={"/products"}>
                            <li className="simple">Hoodies</li>
                          </Link>
                          <Link to={"/products"}>
                            <li className="simple">Sweatshirts</li>
                          </Link>
                        </div>
                      </ul>
                    </div>
                    <div>
                      <ul>
                        <div className="navMenu">
                          <Link to={"/products"}>
                            <li className="dark">Other</li>
                          </Link>
                          <Link to={"/products"}>
                            <li className="simple">furnitures</li>
                          </Link>
                          <Link to={"/products"}>
                            <li className="simple">bags</li>
                          </Link>
                          <Link to={"/products"}>
                            <li className="simple">decoration</li>
                          </Link>
                          <Link to={"/products"}>
                            <li className="simple">accessories</li>
                          </Link>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* -------------------- */}
              <div className="menu1">
                <div className="functionBtn">
                  <div className="spanDiv">
                    <span className={show2 ? "spanRed" : "spanBlack"}>
                      {show2 ? "-" : "+"}
                    </span>
                  </div>
                  <button
                    className="menu1Btn"
                    onClick={() => {
                      Setshow2(!show2);
                      Setshow4(false);
                      Setshow3(false);
                      Setshow(false);
                    }}
                  >
                    portfolio
                  </button>
                </div>
                <div className="menu1MainDiv">
                  <div
                    className={show2 ? "menu1Area shopArea" : "menu1AreaNone"}
                  >
                    <div>
                      <ul>
                        <div className="navMenu">
                          <Link to={"/products"}>
                            <li className="simple">portfolio grid view</li>
                          </Link>
                          <Link to={"/products"}>
                            <li className="menu1Li simple">single portfolio</li>
                          </Link>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* -------------------- */}
              <div className="menu1">
                <div className="functionBtn">
                  <div className="spanDiv">
                    <span className={show3 ? "spanRed" : "spanBlack"}>
                      {show3 ? "-" : "+"}
                    </span>
                  </div>
                  <button
                    className="menu1Btn"
                    onClick={() => {
                      Setshow3(!show3);
                      Setshow4(false);
                      Setshow2(false);
                      Setshow(false);
                    }}
                  >
                    product
                  </button>
                </div>
                <div className="menu1MainDiv">
                  <div
                    className={show3 ? "menu1Area shopArea" : "menu1AreaNone"}
                  >
                    <div>
                      <ul>
                        <div className="navMenu">
                          <Link to={"/products"}>
                            <li className="menu1Li simple">simple product</li>
                          </Link>
                          <Link to={"/products"}>
                            <li className="menu1Li simple">variable product</li>
                          </Link>
                          <Link to={"/products"}>
                            <li className="menu1Li simple">
                              affiliate product
                            </li>
                          </Link>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* -------------------- */}
              <div className="menu1">
                <div className="functionBtn">
                  <div className="spanDiv">
                    <span className={show ? "spanRed" : "spanBlack"}>
                      {show ? " " : " "}
                    </span>
                  </div>
                  <button className="menu1Btn">
                    <Link to={"/"}>blog</Link>
                  </button>
                </div>
              </div>
              {/* -------------------- */}
              <div className="menu1">
                <div className="functionBtn">
                  <div className="spanDiv">
                    <span className={show4 ? "spanRed" : "spanBlack"}>
                      {show4 ? "-" : "+"}
                    </span>
                  </div>
                  <button
                    className="menu1Btn"
                    onClick={() => {
                      Setshow4(!show4);
                      Setshow3(false);
                      Setshow2(false);
                      Setshow(false);
                    }}
                  >
                    pages
                  </button>
                </div>
                <div className="menu1MainDiv">
                  <div
                    className={show4 ? "menu1Area shopArea" : "menu1AreaNone"}
                  >
                    <div>
                      <ul>
                        <div className="navMenu">
                          <Link to={"/products"}>
                            <li className="menu1Li simple">about us</li>
                          </Link>
                          <Link to={"/products"}>
                            <li className="menu1Li simple">contact us</li>
                          </Link>
                          <Link to={"/products"}>
                            <li className="menu1Li simple">shipping policy</li>
                          </Link>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* -------------------- */}
            </div>
          </div>
        </div>
      </div>
      <div className={mobileMenu ? "mobileMod" : "mobileModNone"}>
        <div className="eachMobileMode">
          {/* -------------------- */}
          <div className="menu1">
            <div className="functionBtn">
              <div className="spanDiv">
                <span className={show ? "spanRed" : "spanBlack"}>
                  {show ? " " : " "}
                </span>
              </div>
              <button className="menu1Btn">
                <Link to={"/"}>Home</Link>
              </button>
            </div>
          </div>
          {/* -------------------- */}
          <div className="menu1">
            <div className="functionBtn">
              <div className="spanDiv">
                <span className={show ? "spanRed" : "spanBlack"}>
                  {show ? "-" : "+"}
                </span>
              </div>
              <button
                className="menu1Btn"
                onClick={() => {
                  Setshow(!show);
                  Setshow4(false);
                  Setshow3(false);
                  Setshow2(false);
                }}
              >
                Shop
              </button>
            </div>
            <div className="menu1MainDiv">
              <div className={show ? "menu1Area shopArea" : "menu1AreaNone"}>
                <div>
                  <ul>
                    <div className="navMenu">
                      <Link to={"/products"}>
                        <li className="menu1Li dark">men style</li>
                      </Link>
                      <Link to={"/products"}>
                        <li className="menu1Li simple">Jackets & Coats</li>
                      </Link>
                      <Link to={"/products"}>
                        <li className="menu1Li simple">Long T-Shirt</li>
                      </Link>
                      <Link to={"/products"}>
                        <li className="menu1Li simple">Swim wear</li>
                      </Link>
                      <Link to={"/products"}>
                        <li className="menu1Li simple">Prom Shoes</li>
                      </Link>
                      <Link to={"/products"}>
                        <li className="menu1Li simple">sleeveless shirt</li>
                      </Link>
                    </div>
                  </ul>
                </div>
                <div>
                  <ul>
                    <div className="navMenu">
                      <Link to={"/products"}>
                        <li className="menu1Li dark">women style</li>
                      </Link>
                      <Link to={"/products"}>
                        <li className="menu1Li simple">Shirts & Blouses</li>
                      </Link>
                      <Link to={"/products"}>
                        <li className="menu1Li simple">Halter Tops</li>
                      </Link>
                      <Link to={"/products"}>
                        <li className="menu1Li simple">Long pant</li>
                      </Link>
                      <Link to={"/products"}>
                        <li className="menu1Li simple">Hoodies</li>
                      </Link>
                      <Link to={"/products"}>
                        <li className="menu1Li simple">Sweatshirts</li>
                      </Link>
                    </div>
                  </ul>
                </div>
                <div>
                  <ul>
                    <div className="navMenu">
                      <Link>
                        <li className="menu1Li dark">other</li>
                      </Link>
                      <Link to={"/products"}>
                        <li className="menu1Li simple">furnitures</li>
                      </Link>
                      <Link to={"/products"}>
                        <li className="menu1Li simple">bags</li>
                      </Link>
                      <Link to={"/products"}>
                        <li className="menu1Li simple">decoration</li>
                      </Link>
                      <Link to={"/products"}>
                        <li className="menu1Li simple">accessories</li>
                      </Link>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* -------------------- */}
          <div className="menu1">
            <div className="functionBtn">
              <div className="spanDiv">
                <span className={show2 ? "spanRed" : "spanBlack"}>
                  {show2 ? "-" : "+"}
                </span>
              </div>
              <button
                className="menu1Btn"
                onClick={() => {
                  Setshow2(!show2);
                  Setshow4(false);
                  Setshow3(false);
                  Setshow(false);
                }}
              >
                portfolio
              </button>
            </div>
            <div className="menu1MainDiv">
              <div className={show2 ? "menu1Area shopArea" : "menu1AreaNone"}>
                <div>
                  <ul>
                    <div className="navMenu">
                      <Link to={"/products"}>
                        <li className="menu1Li simple">portfolio grid view</li>
                      </Link>
                      <Link to={"/products"}>
                        <li className="menu1Li simple">single portfolio</li>
                      </Link>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* -------------------- */}
          <div className="menu1">
            <div className="functionBtn">
              <div className="spanDiv">
                <span className={show3 ? "spanRed" : "spanBlack"}>
                  {show3 ? "-" : "+"}
                </span>
              </div>
              <button
                className="menu1Btn"
                onClick={() => {
                  Setshow3(!show3);
                  Setshow4(false);
                  Setshow2(false);
                  Setshow(false);
                }}
              >
                product
              </button>
            </div>
            <div className="menu1MainDiv">
              <div className={show3 ? "menu1Area shopArea" : "menu1AreaNone"}>
                <div>
                  <ul>
                    <div className="navMenu">
                      <Link to={"/products"}>
                        <li className="menu1Li simple">simple product</li>
                      </Link>
                      <Link to={"/products"}>
                        <li className="menu1Li simple">variable product</li>
                      </Link>
                      <Link to={"/products"}>
                        <li className="menu1Li simple">affiliate product</li>
                      </Link>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* -------------------- */}
          <div className="menu1">
            <div className="functionBtn">
              <div className="spanDiv">
                <span className={show ? "spanRed" : "spanBlack"}>
                  {show ? " " : " "}
                </span>
              </div>
              <button className="menu1Btn">
                <Link to={"/"}>blog</Link>
              </button>
            </div>
          </div>
          {/* -------------------- */}
          <div className="menu1">
            <div className="functionBtn">
              <div className="spanDiv">
                <span className={show4 ? "spanRed" : "spanBlack"}>
                  {show4 ? "-" : "+"}
                </span>
              </div>
              <button
                className="menu1Btn"
                onClick={() => {
                  Setshow4(!show4);
                  Setshow3(false);
                  Setshow2(false);
                  Setshow(false);
                }}
              >
                pages
              </button>
            </div>
            <div className="menu1MainDiv">
              <div className={show4 ? "menu1Area shopArea" : "menu1AreaNone"}>
                <div>
                  <ul>
                    <div className="navMenu">
                      <Link to={"/products"}>
                        <li className="menu1Li simple">about us</li>
                      </Link>
                      <Link to={"/products"}>
                        <li className="menu1Li simple">contact us</li>
                      </Link>
                      <Link to={"/products"}>
                        <li className="menu1Li simple">shipping policy</li>
                      </Link>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* -------------------- */}
        </div>
      </div>
    </div>
  );
};

export default SiteHeader;
