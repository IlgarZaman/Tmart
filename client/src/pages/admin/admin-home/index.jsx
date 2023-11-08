import { useEffect, useMemo, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import moment from "moment";
import { grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import {
  allUsers,
  deleteUser,
  selectAllUsersWithoutSuperadmin,
  selectForAdmin,
  selectUser,
  SelectUserById,
} from "../../../redux/slice/authSlice";
import UpdateUserForm from "../../../components/update-user-from";
import "./indeex.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { enqueueSnackbar } from "notistack";
import {
  allBaskets,
  deleteUserBasket,
  selectAllUserBasket,
} from "../../../redux/slice/addToBasket";
import {
  allWishlist,
  deleteUserWishlist,
  selectAllUserWishlist,
  selectWishlist,
} from "../../../redux/slice/wishList";

const AdminHome = () => {
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);
  // -----
  const allUsersWithoutSuperadmin = useSelector(
    selectAllUsersWithoutSuperadmin
  );
  const forAdmin = useSelector(selectForAdmin);
  const user = useSelector(selectUser);
  const allUserWishlist = useSelector(selectAllUserWishlist);
  const allUserBasket = useSelector(selectAllUserBasket);
  // -----
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allUsers());
    dispatch(allWishlist());
    dispatch(allBaskets());
  }, []);
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure wanted to delete that user ?")) {
      try {
        const wishlistId = allUserWishlist.find((e) => e.userId === id);
        const basketId = allUserBasket.find((e) => e.userId === id);
        await dispatch(deleteUser({ id, enqueueSnackbar }));
        dispatch(allUsers());
        await dispatch(deleteUserBasket({ id: basketId?._id }));
        await dispatch(deleteUserWishlist({ id: wishlistId._id }));
      } catch (err) {
        return err;
      }
    }
  };
  const selectuser = async (id) => {
    try {
      await dispatch(SelectUserById({ id }));
    } catch (error) {
      return error;
    }
  };
  const columns = useMemo(
    () => [
      {
        field: "user",
        headerName: "User",
        width: 120,
        renderCell: (params) => {
          return (
            <Box className="imageDiv" style={{ display: "flex" }}>
              <img src={params.row?.image} />
            </Box>
          );
        },
      },
      { field: `name`, headerName: "Name", width: 120 },
      { field: `surname`, headerName: "surname", width: 120 },
      { field: "email", headerName: "Email", width: 200 },
      {
        field: "role",
        headerName: "Role",
        width: 100,
      },
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
            color="error"
            size="small"
            tabIndex={e.hasFocus ? 0 : -1}
            startIcon={<DeleteIcon />}
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
              selectuser(e.id);
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
    <Box
      sx={{
        height: 400,
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
          sx={{ textAlign: "center", mt: 3, mb: 3 }}
        >
          Manage Users
        </Typography>
        <DataGrid
          columns={columns}
          rows={
            user?.role === "superAdmin"
              ? allUsersWithoutSuperadmin
              : user?.role === "admin"
              ? forAdmin
              : []
          }
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
      <UpdateUserForm />
    </Box>
  );
};

export default AdminHome;
