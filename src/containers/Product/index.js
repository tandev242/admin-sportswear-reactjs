import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, deleteProductById, updateDiscount } from "../../actions";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import "./style.scss";
import ProductDetailsModal from "./components/ProductDetailsModal";
import AddProductModal from "./components/AddProductModal";
import AddDiscountModal from "./components/AddDiscountModal";

const Product = () => {
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showProductDetailsModal, setShowProductDetailsModal] = useState(false);
  const [showAddDiscountModal, setShowAddDiscountModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [discount, setDiscount] = useState({
    type: "category",
    _id: "",
    discountPercent: 0,
  });
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState(false);
  const { products } = useSelector((state) => state.product);
  const { sizes } = useSelector((state) => state.size);
  const { categories } = useSelector((state) => state.category);
  const { brands } = useSelector((state) => state.brand);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    categoryId: "",
    brandId: "",
    sizes: [],
    productPictures: [],
    discountPercent: 0,
  });
  const dispatch = useDispatch();
  console.log("hagag")
  const submitProductForm = () => {
    const form = new FormData();
    form.append("name", product.name);
    form.append("price", product.price);
    form.append("description", product.description);
    form.append("category", product.categoryId);
    form.append("brand", product.brandId);
    form.append("sizes", JSON.stringify(product.sizes));
    for (let pic of product.productPictures) {
      form.append("productPicture", pic);
    }
    dispatch(addProduct(form)).then(() => setShowAddProductModal(false));
  };
  const onSubmitDiscountModal = () => {
    dispatch(updateDiscount(discount));
  };

  const getTotalQtyByProduct = (product) => {
    let qty = 0;
    product.sizes.map((size) => {
      qty += size.quantity;
    });
    return qty;
  };

  const filterProductsByName = (sText) => {
    const arrProducts = products.filter(
      (product) =>
        product.name.toLowerCase().indexOf(sText.toLowerCase()) !== -1 ||
        product.name.toLowerCase().indexOf(sText.toLowerCase()) !== -1
    );
    arrProducts.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    // sort by Ascending
    if (sort) {
      return arrProducts.reverse();
    }
    return arrProducts;
  };
  const renderGridProducts = (products) => {
    return (
      <Table style={{ fontSize: 12 }} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th className="col-name-sort" onClick={() => setSort(!sort)}>
              Name
              <UnfoldMoreIcon color="secondary" />
            </th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Discount</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0
            ? products.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td className="product-name">{product.name}</td>
                  <td>{product.price}</td>
                  <td>{getTotalQtyByProduct(product)}</td>
                  <td>{product.discountPercent}%</td>
                  <td>{product.category.name}</td>
                  <td>{product.brand.name}</td>
                  <td>
                    <button
                      onClick={() => {
                        setProductDetails(product);
                        setShowProductDetailsModal(true);
                      }}
                    >
                      info
                    </button>
                    <button
                      onClick={() => {
                        const payload = {
                          productId: product._id,
                        };
                        if (
                          window.confirm("Are you sure you want to delete") ==
                          true
                        ) {
                          dispatch(deleteProductById(payload));
                        }
                      }}
                    >
                      del
                    </button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Products</h3>
              <Input
                type="text"
                style={{ marginBottom: "-15px" }}
                placeholder="Search by name"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <div className="wrapper-btn">
                <Button
                  variant="success"
                  onClick={() => setShowAddDiscountModal(true)}
                >
                  Set Discount
                </Button>
                <Button onClick={() => setShowAddProductModal(true)}>
                  Add
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderGridProducts(filterProductsByName(searchText))}</Col>
        </Row>
      </Container>
      <AddProductModal
        show={showAddProductModal}
        handleClose={() => setShowAddProductModal(false)}
        onSubmit={submitProductForm}
        product={product}
        setProduct={setProduct}
        categories={categories}
        brands={brands}
        sizes={sizes}
      />
      <ProductDetailsModal
        handleClose={() => setShowProductDetailsModal(false)}
        product={productDetails}
        show={showProductDetailsModal}
      />
      <AddDiscountModal
        show={showAddDiscountModal}
        onSubmit={onSubmitDiscountModal}
        handleClose={() => setShowAddDiscountModal(false)}
        categories={categories}
        brands={brands}
        discount={discount}
        setDiscount={setDiscount}
      />
    </Layout>
  );
};

export default Product;
