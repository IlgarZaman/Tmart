import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Fab,
  FormLabel,
  Grid,
  TextField,
} from "@mui/material";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  addProducts,
  allProducts,
  selectloadingProduct,
} from "../../redux/slice/getDataProducts";
import { UploadSchema } from "./schema";
import { Textarea } from "@mui/joy";
import { enqueueSnackbar } from "notistack";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddProductModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const handleFileSelection = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(selectedFiles.concat(files));
  };

  const loadingProduct = useSelector(selectloadingProduct);
  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues: {
      name: "",
      description: "",
      type: "",
      sale: "",
      discounted: "",
      size: "",
      color: "",
      material: "",
    },
    validationSchema: UploadSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        selectedFiles.forEach((file) => {
          formData.append("images", file);
        });
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("type", values.type);
        formData.append("sale", values.sale);
        formData.append("discounted", values.discounted);
        formData.append("size", values.size);
        formData.append("color", values.color);
        formData.append("material", values.material);
        await dispatch(addProducts({ formData, enqueueSnackbar }));
        await dispatch(allProducts());
        resetForm();
        setSelectedFiles([]);
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <Box>
      <Button
        onClick={handleOpen}
        color="success"
        variant="contained"
        startIcon={<AddShoppingCartIcon />}
        sx={{ width: "100%" }}
      >
        Add Product
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box
              onSubmit={handleSubmit}
              component="form"
              px={3}
              py={2}
              onChange={handleChange}
            >
              <Box id="uploadProductsForm">
                <Grid container spacing={1} className="gridClass">
                  <div>
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
                      <FormLabel>Description</FormLabel>
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
                            <span className="redError">
                              {errors.description}
                            </span>
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
                  </div>
                  <div>
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
                        label="Discount"
                        variant="standard"
                        fullWidth
                        margin="dense"
                        type={"number"}
                      />
                      <Grid container spacing={1} className="gridClass">
                        <Grid item xs={10} sm={10}>
                          {errors.discounted && touched.discounted && (
                            <span className="redError">
                              {errors.discounted}
                            </span>
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
                        type={"text"}
                      />
                      <Grid container spacing={1} className="gridClass">
                        <Grid item xs={10} sm={10}>
                          {errors.material && touched.material && (
                            <span className="redError">{errors.material}</span>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid>
                      <Box sx={{ marginTop: 2 }}>
                        <label htmlFor="upload-photo">
                          <input
                            style={{ display: "none" }}
                            id="upload-photo"
                            name="upload-photo"
                            type="file"
                            onChange={handleFileSelection}
                            multiple
                            accept="image/png , image/jpeg, image/webp, image/svg, image/jpg"
                          />
                          <Fab
                            variant="extended"
                            component="span"
                            aria-label="add"
                          >
                            <AddAPhotoOutlinedIcon sx={{ mr: 1 }} />
                            Add Photo
                          </Fab>
                        </label>
                      </Box>
                    </Grid>
                  </div>
                </Grid>
                <Box mt={3} className="boxButton">
                  <Button variant="outlined" color="primary" type="submit">
                    {loadingProduct ? <CircularProgress /> : "CREATE"}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default AddProductModal;
