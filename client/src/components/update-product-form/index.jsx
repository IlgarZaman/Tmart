import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormLabel,
  Grid,
  TextField,
} from "@mui/material";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { updateSchema } from "./schema";
import Textarea from "@mui/joy/Textarea";
import {
  allProducts,
  reset,
  selectloadingProduct,
  selectProductById,
  updateProduct,
} from "../../redux/slice/getDataProducts";
import SendIcon from "@mui/icons-material/Send";
import { enqueueSnackbar } from "notistack";

const UpdateProductForm = () => {
  // -----

  const loadingProduct = useSelector(selectloadingProduct);
  const productById = useSelector(selectProductById);

  // -----
  const dispatch = useDispatch();

  const id = productById?._id;
  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues: {
      name: productById?.name || "",
      description: productById?.description || "",
      type: productById?.type || "",
      sale: productById?.sale || "",
      discounted: productById?.discounted || "",
      size: productById?.size || "",
      color: productById?.color || "",
      images: productById?.images,
      material: productById?.material || "",
      id: productById?._id,
    },
    enableReinitialize: true,
    validationSchema: updateSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(updateProduct({ id, values, enqueueSnackbar }));
        dispatch(reset());
        dispatch(allProducts());
      } catch (err) {
        console.log(err);
      }
    },
  });
  return (
    <Box>
      <Box className="container" id="updateProductForm">
        <Box>
          <Box
            onSubmit={handleSubmit}
            component="form"
            px={3}
            py={2}
            onChange={handleChange}
          >
            <Box>
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
                  <FormLabel sx={{ display: "flex" }}>Description</FormLabel>
                  <Textarea
                    label="Name"
                    name="description"
                    id="description"
                    disabled={false}
                    minRows={2}
                    value={values.description}
                    placeholder="Description"
                    size="md"
                    variant="outlined"
                  />
                  <Grid container spacing={1} className="gridClass">
                    <Grid item xs={10} sm={10}>
                      {errors.description && touched.description && (
                        <span className="redError">{errors.description}</span>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={10} sm={10}>
                  <TextField
                    id="type"
                    name="type"
                    label="Type"
                    variant="standard"
                    fullWidth
                    margin="dense"
                    value={values.type}
                  />
                  <Grid container spacing={1} className="gridClass">
                    <Grid item xs={10} sm={10}>
                      {errors.type && touched.type && (
                        <span className="redError">{errors.type}</span>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={10} sm={10}>
                  <TextField
                    id="sale"
                    name="sale"
                    value={values.sale}
                    label="Sale"
                    variant="standard"
                    fullWidth
                    margin="dense"
                    type={"number"}
                  />
                  <Grid container spacing={1} className="gridClass">
                    <Grid item xs={10} sm={10}>
                      {errors.sale && touched.sale && (
                        <span className="redError">{errors.sale}</span>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={10} sm={10}>
                  <TextField
                    id="discounted"
                    name="discounted"
                    value={values.discounted}
                    label="Discounted"
                    variant="standard"
                    fullWidth
                    margin="dense"
                    type={"number"}
                  />
                  <Grid container spacing={1} className="gridClass">
                    <Grid item xs={10} sm={10}>
                      {errors.discounted && touched.discounted && (
                        <span className="redError">{errors.discounted}</span>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={10} sm={10}>
                  <TextField
                    id="size"
                    name="size"
                    value={values.size}
                    label="Size"
                    variant="standard"
                    fullWidth
                    margin="dense"
                  />
                  <Grid container spacing={1} className="gridClass">
                    <Grid item xs={10} sm={10}>
                      {errors.size && touched.size && (
                        <span className="redError">{errors.size}</span>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={10} sm={10}>
                  <TextField
                    id="color"
                    name="color"
                    value={values.color}
                    label="Color"
                    variant="standard"
                    fullWidth
                    margin="dense"
                  />
                  <Grid container spacing={1} className="gridClass">
                    <Grid item xs={10} sm={10}>
                      {errors.color && touched.color && (
                        <span className="redError">{errors.color}</span>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={10} sm={10}>
                  <TextField
                    id="material"
                    name="material"
                    value={values.material}
                    label="Material"
                    variant="standard"
                    fullWidth
                    margin="dense"
                  />
                  <Grid container spacing={1} className="gridClass">
                    <Grid item xs={10} sm={10}>
                      {errors.material && touched.material && (
                        <span className="redError">{errors.material}</span>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Box mt={3} className="boxButton">
                <Button
                  variant="outlined"
                  endIcon={<SendIcon />}
                  color="primary"
                  type="submit"
                >
                  {loadingProduct ? <CircularProgress /> : "UPDATE"}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default UpdateProductForm;
