import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, deleteProductById } from "../../actions";
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import "./style.scss";


const Product = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [sizeId, setSizeId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [sizes, setSizes] = useState([]);
  const [productPictures, setProductPictures] = useState([]);
  const [show, setShow] = useState(false);
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState(false);
  const category = useSelector((state) => state.category);
  const brand = useSelector((state) => state.brand);
  const product = useSelector((state) => state.product);
  const size = useSelector((state) => state.size);
  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
  };
  useEffect(() => {

  }, [product.loading]);
  const submitProductForm = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);
    form.append("category", categoryId);
    form.append("brand", brandId);
    form.append("sizes", JSON.stringify(sizes));
    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }
    dispatch(addProduct(form)).then(() => setShow(false));
  };
  const handleShow = () => setShow(true);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };
  const createBrandList = (brands, options = []) => {
    for (let brand of brands) {
      options.push({ value: brand._id, name: brand.name });
    }
    return options;
  }
  const createSizeList = (sizes, options = []) => {
    for (let size of sizes) {
      options.push({ value: size._id, size: size.size });
    }
    return options;
  };
  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };
  const handleSizes = (e) => {
    setSizes([...sizes, { size: sizeId, quantity }]);
  }
  const getTotalQtyByProduct = (product) => {
    let qty = 0;
    product.sizes.map((size) => {
      qty += size.quantity;
    })
    return qty;
  }

  const renderProducts = (products) => {
    return (
      <Table style={{ fontSize: 12 }} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th className="col-name-sort" onClick={() => setSort(!sort)}>Name<UnfoldMoreIcon color="secondary" /></th>
            <th>Price</th>
            <th>Quantity</th>
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
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{getTotalQtyByProduct(product)}</td>
                <td>{product.category.name}</td>
                <td>{product.brand.name}</td>
                <td>
                  <button onClick={() => showProductDetailsModal(product)}>
                    info
                  </button>
                  <button
                    onClick={() => {
                      const payload = {
                        productId: product._id,
                      };
                      if (window.confirm('Are you sure you want to delete') == true) {
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

  const renderAddProductModal = () => {
    return (
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={"Add New Product"}
        onSubmit={submitProductForm}
      >
        <Input
          label="Name"
          value={name}
          placeholder={`Product Name`}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Price"
          value={price}
          placeholder={`Price`}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          label="Description"
          value={description}
          placeholder={`Description`}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="form-control"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option>select category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>

        <select
          className="form-control"
          value={brandId}
          style={{ margin: "20px 0" }}
          onChange={(e) => setBrandId(e.target.value)}
        >
          <option>select brand</option>
          {createBrandList(brand.brands).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        <h6>Sizes</h6>
        <div className="form-add-size">
          <select
            className="form-control"
            value={sizeId}
            onChange={(e) => setSizeId(e.target.value)}
          >
            <option>select size</option>
            {createSizeList(size.sizes).map((option) => (
              <option key={option.value} value={option.value}>
                {option.size}
              </option>
            ))}
          </select>

          <Input
            value={quantity}
            placeholder={`Qty`}
            onChange={(e) => setQuantity(e.target.value)} />
          <button className="btn-add" onClick={handleSizes}>
            add
          </button>
          <div className="size-info">
            {sizes.length > 0
              ? sizes.map((s, index) => (
                <div key={index}>{`Size: ${size.sizes.find((size) => size._id == s.size).size} Qty: ${s.quantity}`}</div>
              ))
              : null}
          </div>
        </div>
        <Input
          type="file"
          name="productPicture"
          onChange={handleProductPictures}
        />
        {productPictures.length > 0
          ? productPictures.map((pic, index) => (
            <div key={index}>{pic.name}</div>
          ))
          : null}
      </Modal>
    );
  };

  const handleCloseProductDetailsModal = () => {
    setProductDetailModal(false);
  };

  const showProductDetailsModal = (product) => {
    setProductDetails(product);
    setProductDetailModal(true);
  };

  const renderProductDetailsModal = () => {
    if (!productDetails) {
      return null;
    }
    console.log(productDetails.productPictures)
    return (
      <Modal
        show={productDetailModal}
        handleClose={handleCloseProductDetailsModal}
        modalTitle={"Product Details"}
        size="lg"
      >
        <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className="key">Price</label>
            <p className="value">{productDetails.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">Category</label>
            <p className="value">{productDetails.category.name}</p>
          </Col>
          <Col md="6">
            <label className="key">Brand</label>
            <p className="value">{productDetails.brand.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <label className="key">Size</label>
            <div style={{ display: "flex" }}>
              {productDetails.sizes.map((size) => (
                <div className="size-info">
                  {`Size: ${size.size.size} Qty: ${size.quantity}`}
                </div>
              ))}
            </div>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <label className="key">Description</label>
            <p className="value">{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="key">Product Pictures</label>
            <div style={{ display: "flex" }}>
              {productDetails.productPictures.map((picture) => (
                <div className="productImgContainer">
                  <img src={picture.img} alt="image not found" />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Modal>
    );
  };

  const filterProductsByName = (sText) => {
    const arrProducts = product.products.filter(product => product.name.toLowerCase().indexOf(sText.toLowerCase()) !== -1 ||
                        product.name.toLowerCase().indexOf(sText.toLowerCase()) !== -1)
    arrProducts.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    })
    // sort by Ascending
    if (sort) {
      return arrProducts.reverse();
    }
    return arrProducts;
  }

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Products</h3>
              <Input type="text"
                style={{ marginBottom: "-15px" }}
                placeholder="Search by name"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)} />
              <Button onClick={handleShow}>Add</Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderProducts(filterProductsByName(searchText))}</Col>
        </Row>
      </Container>
      {renderAddProductModal()}
      {renderProductDetailsModal()}
    </Layout>
  );
};

export default Product;
