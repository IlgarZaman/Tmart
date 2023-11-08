import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Fab,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { register, selectUserLoading } from "../../../../redux/slice/authSlice";
import { RegisterSchema } from "./schema";
import { useFormik } from "formik";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import { enqueueSnackbar } from "notistack";
import ProfilPhoto from "../../../../assets/istockphoto-1300845620-612x612.jpg";

const Register = () => {
  const [passcode, setPasscode] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isMatch, setIsMatch] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [digiCode, setDigiCode] = useState(false);
  const [image, setImage] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const timerId = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [initialImage, setInitialImage] = useState(ProfilPhoto);

  useEffect(() => {
    setInitialImage(ProfilPhoto);
  }, []);

  useEffect(() => {
    if (showSnackbar) {
      enqueueSnackbar("Time is up", {
        variant: "warning",
      });
      setShowSnackbar(false);
    }
  }, [showSnackbar, enqueueSnackbar]);

  // create data
  const dateObj = new Date();
  const formattedDate = `${dateObj.getFullYear()}-${dateObj.getMonth() +
    1}-${dateObj.getDate()} ${dateObj.getHours()}:${dateObj.getMinutes()}`;
  // --------------------------------------------------------

  //time
  const startTimer = () => {
    if (isActive) {
      return;
    }

    setIsActive(true);

    timerId.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerId.current);
          setIsActive(false);
          setShowSnackbar(true);

          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  // --------------------------------
  useEffect(() => {
    setIsMatch(userInput === passcode);
  }, []);

  const imageValue = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setInitialImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loadingUser = useSelector(selectUserLoading);

  const {
    values,
    handleChange: authChange,
    handleSubmit: authSubmit,
    errors,
    touched,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      image: "",
      role: "user",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      setDigiCode(!digiCode);
      const newPasscode = Math.floor(10000 + Math.random() * 90000).toString();
      setPasscode(newPasscode);
      values.image = image;
      const message = "Please check your mail(Inbox or Spam section)";
      setUserInput("");
      function incorrectInput() {
        enqueueSnackbar(message, { variant: "info" });
        setTimeLeft(300);
        let msg = startTimer();
        return msg;
      }
      passcode != 0 && userInput === passcode
        ? dispatch(register({ values, navigate, enqueueSnackbar }))
        : incorrectInput();
      const emailData = {
        Host: process.env.REACT_APP_SMPT_HOST,
        Username: process.env.REACT_APP_SMPT_USERNAME,
        Password: process.env.REACT_APP_SMPT_PASSWORD,
        To: values.email,
        From: process.env.REACT_APP_SMPT_FROM,
        Subject: `Login authentication code - ${formattedDate}`,
        Body: `
        <div style="width: 100%; height: 100vh; background-color: #f1f1f7">
        <div style="width: 500px; padding: 15px; margin: 20px auto">
          <h2 style="font-size: 34px; margin-bottom: 8px; color: #3b3b63">
            Tmart Ecommerce
          </h2>
        </div>
        <div
          style="
            border: 1px solid #e0e0e0;
            width: 500px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 15px;
            margin: 20px auto;
            background-color: #ffffff;
          "
        >
          <p
            style="
              font-size: 16px;
              color: #32325c;
              margin-bottom: 15px;
              font-weight: 600;
              font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
                'Lucida Sans', Arial, sans-serif;
            "
          >
            Login Authentication Code
          </p>
          <p
            style="
              font-size: 16px;
              color: #32325c;
              margin-top: 30px;
              font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
                'Lucida Sans', Arial, sans-serif;
            "
          >
            Hello ${values.email},
          </p>
          <p
            style="
              font-size: 16px;
              color: #32325c;
              margin-top: 30px;
              font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
                'Lucida Sans', Arial, sans-serif;
            "
          >
            Please find your login authentication code below.
          </p>
          <p
            style="
              font-size: 16px;
              color: #32325c;
              margin-top: 20px;
              font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
                'Lucida Sans', Arial, sans-serif;
            "
          >
            Date:
            <span
              style="
                font-size: 16px;
                color: #32325c;
                font-weight: 600;
                font-family: 'Trebuchet MS', 'Lucida Sans Unicode',
                  'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
              "
              >${formattedDate}</span
            >
          </p>
          <p
            style="
              font-size: 16px;
              color: #32325c;
              margin-top: 30px;
              font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
                'Lucida Sans', Arial, sans-serif;
            "
          >
            Code:
          </p>
          <p
            style="
              font-size: 26px;
              font-weight: 600;
              color: #32325c;
              margin-top: 20px;
              font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
                'Lucida Sans', Arial, sans-serif;
            "
          >
            ${newPasscode}
          </p>
        </div>
      </div>
           `,
        IsHtml: true,
      };
      passcode != 0 && isMatch ? "" : window.Email.send(emailData);
    },
  });
  const handleInputChange = (e, handleSubmit) => {
    e.preventDefault();
    setUserInput(e.target.value);
    if (e.target.value.length === 5 && passcode === e.target.value) {
      handleSubmit();
    }
  };
  // ------------------------------------------------------------

  const stopTimer = () => {
    clearInterval(timerId.current);
    setIsActive(false);
    setDigiCode(!digiCode);
    setUserInput("");
    setIsMatch(false);
    setImage("");
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
    setFieldValue("image", "");
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
    resetForm();
    setFieldValue("image", "");
    setFieldValue("password", "");
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const deletePhoto = async () => {
    setInitialImage(ProfilPhoto);
    setImage("");
    setAnchorEl(null);
  };
  const upoadNewPhoto = async () => {
    setAnchorEl(null);
  };
  return (
    <div id="register">
      <div className="container">
        <Box className={digiCode ? "hideCenterLoginDiv" : "centerLoginDiv"}>
          <Box
            onSubmit={authSubmit}
            component="form"
            px={3}
            py={2}
            onChange={authChange}
          >
            <div>
              <Grid container spacing={1} className="gridClass">
                <Grid item xs={10} sm={10}>
                  <TextField
                    id="name"
                    name="name"
                    label="Name"
                    variant="standard"
                    fullWidth
                    margin="dense"
                    value={values.name}
                  />
                  <Grid container spacing={1} className="gridClass">
                    <Grid item xs={10} sm={10}>
                      {errors.name && touched.name && (
                        <span className="redError">{errors.name}</span>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={10} sm={10}>
                  <TextField
                    id="surname"
                    name="surname"
                    value={values.surname}
                    label="Surname"
                    variant="standard"
                    fullWidth
                    margin="dense"
                  />
                  <Grid container spacing={1} className="gridClass">
                    <Grid item xs={10} sm={10}>
                      {errors.surname && touched.surname && (
                        <span className="redError">{errors.surname}</span>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={10} sm={10}>
                  <TextField
                    id="email"
                    name="email"
                    value={values.email}
                    label="Email"
                    variant="standard"
                    fullWidth
                    margin="dense"
                  />
                  <Grid container spacing={1} className="gridClass">
                    <Grid item xs={10} sm={10}>
                      {errors.email && touched.email && (
                        <span className="redError">{errors.email}</span>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={10} sm={10}>
                  <TextField
                    id="password"
                    label="Password"
                    variant="standard"
                    type={showPassword ? "password" : "text"}
                    value={values.password}
                    fullWidth
                    name="password"
                    margin="dense"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Grid container spacing={1} className="gridClass">
                    <Grid item xs={10} sm={10}>
                      {errors.password && touched.password && (
                        <span className="redError">{errors.password}</span>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                {/* <Grid>
                <Box sx={{ marginTop: 2 }}>
                  <label htmlFor="image">
                    <input
                      style={{ display: "none" }}
                      id="image"
                      name="image"
                      type="file"
                      onChange={(e) => imageValue(e.target.files[0])}
                    />
                    <Fab variant="extended" component="span" aria-label="add">
                      <AddAPhotoOutlinedIcon sx={{ mr: 1 }} />
                      Add Photo
                    </Fab>
                  </label>
                </Box>
                <Grid container spacing={1} className="gridClass">
                  <Grid item xs={15} sm={15}>
                    {errors.image && touched.image && (
                      <span className="redError">{errors.image}</span>
                    )}
                  </Grid>
                </Grid>
              </Grid> */}
                <div className="image-section">
                  <div className="image-center">
                    <div className="avatar-upload">
                      <div className="avatar-edit">
                        <input
                          type="file"
                          id="image"
                          name="image"
                          accept=".png, .jpg, .jpeg"
                          onChange={imageValue}
                        />
                        <label onClick={handleMenu}></label>
                      </div>
                      <div className="avatar-preview">
                        <div
                          id="imagePreview"
                          style={{
                            backgroundImage: `url(${initialImage})`,
                          }}
                        >
                          <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                              vertical: "bottom",
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

                            <MenuItem
                              onClick={deletePhoto}
                              style={{
                                display: image === "" ? "none" : "block",
                              }}
                            >
                              Remove Current Photo
                            </MenuItem>
                          </Menu>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
              <Box mt={3} className="boxButton">
                <Button variant="outlined" color="primary" type="submit">
                  {loadingUser ? <CircularProgress /> : "CREATE"}
                </Button>
              </Box>
            </div>
          </Box>
        </Box>
        <Box className="authDiv">
          <Box className={digiCode ? "authDigiCode" : "hideAuthDigiCode"}>
            <Grid item xs={5} sm={5}>
              <Box>
                <TextField
                  id="confirmcode"
                  name="confirmcode"
                  value={userInput}
                  label="5-digit authentication passcode "
                  variant="standard"
                  inputProps={{ maxLength: 5 }}
                  fullWidth
                  margin="dense"
                  onChange={(e) => handleInputChange(e, authSubmit)}
                  disabled={isActive ? false : true}
                />
              </Box>
            </Grid>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <p>
                Remaining time:
                <span style={{ color: "red" }}>
                  {Math.floor(timeLeft / 60)}:
                  {(timeLeft % 60).toString().padStart(2, "0")}
                </span>
              </p>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Button color="error" variant="contained" onClick={stopTimer}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
};
export default Register;
