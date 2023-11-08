import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "./index.scss";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { updateSchema } from "./schema";
import {
  allUsers,
  reset,
  selectUser,
  selectUserLoading,
  updateUser,
  uselectUserById,
} from "../../redux/slice/authSlice";
import { enqueueSnackbar } from "notistack";

const UpdateUserForm = () => {
  const loadingUser = useSelector(selectUserLoading);
  const userById = useSelector(uselectUserById);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const id = userById?._id;
  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues: {
      name: userById?.name || "",
      surname: userById?.surname || "",
      email: userById?.email || "",
      role: userById?.role || "",
      password: userById?.password,
      image: userById?.image,
      id: userById?._id,
    },
    enableReinitialize: true,
    validationSchema: updateSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(updateUser({ id, values, enqueueSnackbar }));
        dispatch(reset());
        dispatch(allUsers());
      } catch (err) {
        return err;
      }
    },
  });

  return (
    <div id="updateUserForm">
      <div className="container">
        <div>
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
                    id="name"
                    name="name"
                    label="Name"
                    variant="standard"
                    fullWidth
                    margin="dense"
                    value={values.name}
                    autoComplete="false"
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
                    autoComplete="false"
                  />
                  <Grid container spacing={1} className="gridClass">
                    <Grid item xs={10} sm={10}>
                      {errors.email && touched.email && (
                        <span className="redError">{errors.email}</span>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={20}
                  sm={20}
                  style={{
                    display: user?.role !== "superAdmin" ? "none" : "block",
                  }}
                >
                  <Box sx={{ minWidth: 200 }}>
                    <FormControl fullWidth variant="standard">
                      <InputLabel id="role-label">Role</InputLabel>
                      <Select
                        labelId="role-label"
                        id="role"
                        name="role"
                        defaultValue={values.role}
                        label="Role"
                        value={values.role}
                        onChange={handleChange}
                      >
                        <MenuItem value={"admin"}>Admin</MenuItem>
                        <MenuItem value={"user"}>User</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>
              <Box mt={3} className="boxButton">
                <Button
                  variant="outlined"
                  color="primary"
                  endIcon={<SendIcon />}
                  type="submit"
                >
                  {loadingUser ? <CircularProgress /> : "UPDATE"}
                </Button>
              </Box>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};
export default UpdateUserForm;
