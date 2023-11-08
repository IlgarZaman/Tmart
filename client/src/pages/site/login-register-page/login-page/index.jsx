import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUserLoading } from "../../../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import "./index.scss";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import { LoginSchema } from "./schema";
import { enqueueSnackbar } from "notistack";
import jwt_decode from "jwt-decode";
const Login = () => {
  const [showPassword, setShowPassword] = useState(true);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const userLoading = useSelector(selectUserLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      dispatch(login({ values, navigate, enqueueSnackbar }));
      resetForm();
    },
  });
  return (
    <div id="register">
      <div className="container">
        <div className="centerLoginDiv">
          <Box
            onSubmit={handleSubmit}
            component="form"
            px={3}
            py={2}
            onChange={handleChange}
          >
            <div>
              <Grid container spacing={1} className="gridClass">
                <Grid item xs={10} sm={10}>
                  <TextField
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    type="email"
                    margin="dense"
                    variant="standard"
                    value={values.email}
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
              </Grid>
              <Box mt={3} className="boxButton">
                <Button variant="outlined" color="primary" type="submit">
                  {userLoading ? <CircularProgress /> : "Login"}
                </Button>
              </Box>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Login;
