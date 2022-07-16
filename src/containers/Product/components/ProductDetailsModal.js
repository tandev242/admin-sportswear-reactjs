import { useState, useEffect } from 'react'
import { Row, Col } from "react-bootstrap";
import Modal from "../../../components/UI/Modal";
import Input from "../../../components/UI/Input";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../../actions";

export default function ProductModal(props) {
    const {
        handleClose,
        product,
        show,
    } = props;
    const [updatedProduct, setUpdatedProduct] = useState(product)
    const dispatch = useDispatch();

    useEffect(() => {
        setUpdatedProduct(product)
    }, [product])

    const onUpdateQuantityBySize = (quantity, sizeId) => {
        const newSizes = updatedProduct.sizes.map(item => {
            if (item.size === sizeId) {
                item.quantity = parseInt(quantity)
            }
            return item
        })
        setUpdatedProduct({ ...updatedProduct, sizes: newSizes })
    }

    const onUpdateByTag = (tag, value) => {
        if (value && value >= 0) {
            const newProduct = { ...updatedProduct }
            newProduct[tag] = parseInt(value)
            setUpdatedProduct(newProduct)
        }
    }

    const onSubmitUpdateProduct = () => {
        const { name, discountPercent, sizes, price, description, _id } = updatedProduct
        const payload = { name, discountPercent, sizes, price, description, _id }
        dispatch(updateProduct(payload))
        alert("Update product successfully !")
    }

    if (!updatedProduct) {
        return null;
    }
    return (
        <Modal
            show={show}
            handleClose={handleClose}
            onSubmit={onSubmitUpdateProduct}
            modalTitle={"Product Details"}
            size="lg"
        >
            <Row>
                <Col md="12">
                    <label className="key">Name</label>
                    <Input className="value"
                        value={updatedProduct.name}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                        placeholder={`name`} />
                </Col>
            </Row>
            <Row>
                <Col md="6" >
                    <label className="key">Price</label>
                    <Input className="value"
                        style={{ width: '150px' }}
                        type='number'
                        min={0}
                        value={updatedProduct.price}
                        onChange={(e) => onUpdateByTag('price', e.target.value)}
                        placeholder={`price`} />
                </Col>
                <Col md="6" >
                    <label className="key">Discount Percent</label>
                    <Input className="value"
                        style={{ width: '150px' }}
                        type='number'
                        min={0}
                        value={updatedProduct.discountPercent}
                        onChange={(e) => onUpdateByTag('discountPercent', e.target.value)}
                        placeholder={`discount percent`} />
                </Col>
            </Row>
            <Row>
                <Col md="6">
                    <label className="key">Category</label>
                    <p className="value">{updatedProduct.category.name}</p>
                </Col>
                <Col md="6">
                    <label className="key">Brand</label>
                    <p className="value">{updatedProduct.brand.name}</p>
                </Col>
            </Row>
            <Row>
                <Col md="12">
                    
                    <div style={{ display: "flex" }}>
                        {updatedProduct.sizes.map((size, index) => (
                            <div className="size-info" key={index}>
                                <label className="key">{`Size: ${size.size.size}`}</label>
                                <Input value={size.quantity}
                                    type='number'
                                    min={0}
                                    onChange={(e) => onUpdateQuantityBySize(e.target.value, size.size)}
                                />
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md="12">
                    <label className="key">Description</label>
                    <Input className="value"
                        type={"textarea"}
                        value={updatedProduct.description}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
                        placeholder={`description`} />
                </Col>
            </Row>
            <Row>
                <Col md="12">
                    <label className="key">Product Pictures</label>
                    <div style={{ display: "flex" }}>
                        {updatedProduct.productPictures.map((picture, index) => (
                            <div className="productImgContainer" key={index}>
                                <img src={picture.img} alt="image not found" />
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>
        </Modal>
    );
}
