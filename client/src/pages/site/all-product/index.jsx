import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Pagination, Skeleton, Stack } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SiteHeader from "../../../layouts/site/header/header";
import {
  allProducts,
  searchProducts,
  selectInitialProducts,
  selectloadingProduct,
  selectProducts,
  selectSearchTerm,
} from "../../../redux/slice/getDataProducts";
import "./index.scss";
import "./input.css";
const AllProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectloadingProduct);
  const searchTerm = useSelector(selectSearchTerm);
  const initialProducts = useSelector(selectInitialProducts);
  useEffect(() => {
    dispatch(allProducts());
  }, []);
  const [page, setPage] = useState(1);
  const productsPerPage = 12;

  const totalPages = Math.ceil(products?.length || 0 / productsPerPage);
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * productsPerPage;
  const endIndex = page * productsPerPage;
  const displayedProducts = products?.slice(startIndex, endIndex);

  const skeletonArr = [1, 2, 3, 4, 5, 6, 7, 8];

  const [initialProductsLength, setInitialProductsLength] = useState(0);
  const [productLength, setProductLength] = useState(0);
  useEffect(() => {
    setInitialProductsLength(initialProducts.length);
  }, [initialProducts]);
  useEffect(() => {
    setProductLength(products.length);
  }, [products]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    dispatch(searchProducts(searchTerm));
  };
  return (
    <>
      <SiteHeader />
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Products</title>
      </Helmet>
      <div id="allProducts">
        <div className="mainDiv">
          <div className="title">
            <h2>All Products</h2>
            <div className="link-title">
              <Link to={"/"}>Home /</Link> <span> All Products</span>
            </div>
          </div>
          <div className="productsDiv">
            <div className="container">
              <div className="searchMain">
                <div className="search">
                  <input
                    type="text"
                    className="search__input"
                    onChange={handleSearch}
                    value={searchTerm}
                    placeholder="Search..."
                  />
                </div>
              </div>
              {initialProductsLength === 0 ? (
                <div className="skeletonSec">
                  {skeletonArr.map((skeleton) => {
                    return (
                      <div
                        key={skeleton}
                        style={{
                          margin:
                            window.innerWidth >= 768 && window.innerWidth < 1024
                              ? "50px 0 20px 0"
                              : null || window.innerWidth < 768
                              ? "50px 0 20px 0"
                              : null,
                        }}
                      >
                        <Skeleton
                          variant="rectangular"
                          width={"100%"}
                          height={150}
                        />
                        <Skeleton width={"80%"} height={40} />
                        <Skeleton width={"60%"} height={30} />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="productSec">
                  {productLength === 0 ? (
                    <>
                      <p>Not found</p>
                    </>
                  ) : (
                    <>
                      {displayedProducts?.map((product) => {
                        return (
                          <Card key={product._id}>
                            {loading ? (
                              <div
                                style={{
                                  margin:
                                    window.innerWidth >= 768 &&
                                    window.innerWidth < 1024
                                      ? "50px 0 20px 0"
                                      : null || window.innerWidth < 768
                                      ? "50px 0 20px 0"
                                      : null,
                                }}
                              >
                                <Skeleton
                                  variant="rectangular"
                                  width={210}
                                  height={150}
                                />
                                <Skeleton width={140} height={30} />
                                <Skeleton width={110} height={20} />
                              </div>
                            ) : (
                              <Link to={`/detail/${product._id}`}>
                                <CardActionArea>
                                  <CardMedia
                                    component="img"
                                    height="200"
                                    image={product?.images[0].images}
                                    alt="green iguana"
                                    className="cardMedia"
                                  />
                                  <CardContent className="textCardContent">
                                    <Typography
                                      gutterBottom
                                      variant="h5"
                                      component="div"
                                    >
                                      {product?.name}
                                    </Typography>
                                    <p className="priceTyp">
                                      <span
                                        className={
                                          product.discounted
                                            ? "oldPrice"
                                            : "oldPriceColor"
                                        }
                                      >
                                        ${product.sale}
                                      </span>
                                      <span className="newPrice">
                                        {product.discounted
                                          ? `$${product.sale -
                                              (product.sale / 100) *
                                                product.discounted}`
                                          : ""}
                                      </span>
                                    </p>
                                  </CardContent>
                                </CardActionArea>
                              </Link>
                            )}
                          </Card>
                        );
                      })}
                    </>
                  )}
                </div>
              )}

              <div className="paginationSec">
                <Stack spacing={2}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    shape="rounded"
                  />
                </Stack>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
