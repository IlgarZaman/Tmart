import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SiteHeader from "../../../layouts/site/header/header";
import "./index.scss";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  allUsers,
  selectUser,
  setLogout,
  updateProfileImage,
} from "../../../redux/slice/authSlice";
import { enqueueSnackbar } from "notistack";
import { Helmet } from "react-helmet-async";
import ProfilPhoto from "../../../assets/istockphoto-1300845620-612x612.jpg";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import PublishedWithChangesOutlinedIcon from "@mui/icons-material/PublishedWithChangesOutlined";
const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [initialImage, setInitialImage] = useState("");
  const user = useSelector(selectUser);
  useEffect(() => {
    setInitialImage(ProfilPhoto);
  }, []);
  const handleLogOut = () => {
    dispatch(setLogout());
    navigate("/login-register");
    enqueueSnackbar("Logout Account!", { variant: "default" });
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const imageValue = (file) => {
    setImage(file);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const deletePhoto = async () => {
    setAnchorEl(null);
    const userId = user?._id;
    const formData = new FormData();
    formData.append("profileImage", image);
    await dispatch(updateProfileImage({ userId, formData }))
      .then(() => {
        dispatch(allUsers());
      })
      .catch((error) => {
        return error;
      });
  };
  const upoadNewPhoto = async () => {
    setAnchorEl(null);
  };
  const changeProfilPhoto = async () => {
    const userId = user?._id;
    const formData = new FormData();
    formData.append("profileImage", image);
    await dispatch(updateProfileImage({ userId, formData }))
      .then(() => {
        setImage("");
        dispatch(allUsers());
      })
      .catch((error) => {
        return error;
      });
  };
  return (
    <>
      <SiteHeader />
      <Helmet>
        <meta charSet="utf-8" />
        <title>Account - {`${user?.name} ${user?.surname}`}</title>
      </Helmet>
      <div id="account">
        <div className="mainDiv">
          <div className="centerDiv">
            <div className="title">
              <h2>Account</h2>
              <div className="link-title">
                <Link to={"/"}>Home /</Link> <span> Account</span>
              </div>
            </div>
            <div className="account-section ">
              <div className="image-section">
                <div className="image-center">
                  <div className="avatar-upload">
                    <div className="avatar-edit">
                      <input
                        type="file"
                        id="image"
                        name="image"
                        accept=".png, .jpg, .jpeg"
                        onChange={(e) => imageValue(e.target.files[0])}
                      />
                      <label onClick={handleMenu}></label>
                    </div>
                    <div className="avatar-preview">
                      <div
                        id="imagePreview"
                        style={{
                          backgroundImage: `url(${
                            user?.image === "" ? initialImage : user?.image
                          })`,
                        }}
                      >
                        <Menu
                          id="menu-appbar"
                          anchorEl={anchorEl}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                        >
                          <MenuItem onClick={upoadNewPhoto}>
                            <label htmlFor="image">Upload Photo</label>
                          </MenuItem>
                          <MenuItem onClick={deletePhoto}>
                            Remove Current Photo
                          </MenuItem>
                        </Menu>
                        <LoadingButton
                          style={{
                            display: image === "" ? "none" : "flex",
                          }}
                          className="confirmBtn"
                          loadingPosition="start"
                          startIcon={<PublishedWithChangesOutlinedIcon />}
                          variant="outlined"
                          onClick={changeProfilPhoto}
                        >
                          Confirm
                        </LoadingButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="account-header">
                  <div className="text-section">
                    <h1>My Account</h1>
                  </div>
                  <hr className="hr-small" />
                </div>
                <div className="account-body">
                  <h2>Account Details</h2>
                </div>
                <div className="name">
                  <h2>Name - {user?.name}</h2>
                </div>
                <div className="surname">
                  <h2>Surname - {user?.surname}</h2>
                </div>
                <div className="email">
                  <h2>Email - {user?.email}</h2>
                </div>
                <div className="type">
                  <h2>Role - {user?.role}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
