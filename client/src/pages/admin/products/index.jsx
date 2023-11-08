import { useEffect, useMemo, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import moment from "moment";
import { grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import "./index.scss";
import {
  allProducts,
  deleteProduct,
  SelectProductById,
  selectProducts,
} from "../../../redux/slice/getDataProducts";
import UpdateProductForm from "../../../components/update-product-form";
import AddProductModal from "../../../components/add-product-modal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { enqueueSnackbar } from "notistack";
import { selectUser } from "../../../redux/slice/authSlice";

const Products = () => {
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);
  // ----
  const products = useSelector(selectProducts);
  const user = useSelector(selectUser);
  // ----
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allProducts());
  }, []);
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure wanted to delete that user ?")) {
      try {
        await dispatch(deleteProduct({ id, enqueueSnackbar }));
        dispatch(allProducts());
      } catch (err) {
        console.log(err);
      }
    }
  };
  const selectProduct = async (id) => {
    try {
      await dispatch(SelectProductById({ id }));
    } catch (error) {
      console.log(error);
    }
  };
  const columns = useMemo(
    () => [
      {
        field: "user",
        headerName: "User",
        width: 150,
        renderCell: (params) => {
          return (
            <Box id="imageDiv" style={{ display: "flex" }}>
              <img
                src={
                  params.row?.images[0]?.images
                    ? params.row?.images[0]?.images
                    : ""
                }
              />
              <img
                src={
                  params.row?.images[1]?.images
                    ? params.row?.images[1]?.images
                    : ""
                }
              />
              <img
                src={
                  params.row?.images[2]?.images
                    ? params.row?.images[2]?.images
                    : ""
                }
              />
              <img
                src={
                  params.row?.images[3]?.images
                    ? params.row?.images[3]?.images
                    : ""
                }
              />
            </Box>
          );
        },
      },
      { field: `name`, headerName: "Name", width: 180 },
      { field: `description`, headerName: "Description", width: 120 },
      { field: `type`, headerName: "Type", width: 120 },
      { field: `sale`, headerName: "Sale", width: 80, flex: 1 },
      { field: `discounted`, headerName: "Discounted", width: 80 },
      { field: `size`, headerName: "Size", width: 120, flex: 1 },
      { field: `color`, headerName: "Color", width: 120, flex: 1 },
      { field: `material`, headerName: "Material", width: 120, flex: 1 },
      {
        field: "createdAt",
        headerName: "Created At",
        width: 200,
        renderCell: (params) =>
          moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
      },
      {
        field: "Delete",
        headerName: "Delete",
        width: 100,
        renderCell: (e) => (
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            color="error"
            size="small"
            tabIndex={e.hasFocus ? 0 : -1}
            disabled={user.role === "superAdmin" ? false : true}
            onClick={() => {
              handleDelete(e.id);
            }}
          >
            Delete
          </Button>
        ),
      },
      {
        field: "Edit",
        headerName: "Edit",
        width: 100,
        renderCell: (e) => (
          <Button
            variant="outlined"
            color="info"
            size="small"
            startIcon={<EditIcon />}
            disabled={user.role === "superAdmin" ? false : true}
            onClick={() => {
              selectProduct(e.id);
            }}
          >
            Edit
          </Button>
        ),
      },
    ],
    [rowId]
  );

  return (
    <>
      <Box
        sx={{
          height: 600,
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: 500,
          }}
        >
          <Typography
            variant="h3"
            component="h3"
            sx={{ textAlign: "center", mt: 8, mb: 3 }}
          >
            Manage Products
          </Typography>
          <DataGrid
            columns={columns}
            rows={products}
            getRowId={(row) => row._id}
            rowsPerPageOptions={[0, 10]}
            pageSize={pageSize}
            rowHeight={80}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            getRowSpacing={(params) => ({
              top: params.isFirstVisible ? 0 : 5,
              bottom: params.isLastVisible ? 0 : 5,
            })}
            sx={{
              [`& .${gridClasses.row}`]: {
                bgcolor: (theme) =>
                  theme.palette.mode === "light" ? grey[200] : grey[900],
              },
            }}
          />
        </Box>
      </Box>
      <Box>
        <AddProductModal />
      </Box>
      <UpdateProductForm />
    </>
  );
};

export default Products;
