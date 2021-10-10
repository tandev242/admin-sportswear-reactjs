import { Container, Row, Col, Table, Button } from "react-bootstrap";
import Modal from "../../../components/UI/Modal";


export default function productModal(props) {
    const {
        handleClose,
        product,
        show,
    } = props;
    
    if (!product) {
        return null;
    }
    return (
        <Modal
            show={show}
            handleClose={handleClose}
            modalTitle={"Product Details"}
            size="lg"
        >
            <Row>
                <Col md="6">
                    <label className="key">Name</label>
                    <p className="value">{product.name}</p>
                </Col>
                <Col md="6">
                    <label className="key">Price</label>
                    <p className="value">{product.price}</p>
                </Col>
            </Row>
            <Row>
                <Col md="6">
                    <label className="key">Category</label>
                    <p className="value">{product.category.name}</p>
                </Col>
                <Col md="6">
                    <label className="key">Brand</label>
                    <p className="value">{product.brand.name}</p>
                </Col>
            </Row>
            <Row>
                <Col md="12">
                    <label className="key">Size</label>
                    <div style={{ display: "flex" }}>
                        {product.sizes.map((size) => (
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
                    <p className="value">{product.description}</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <label className="key">Product Pictures</label>
                    <div style={{ display: "flex" }}>
                        {product.productPictures.map((picture) => (
                            <div className="productImgContainer">
                                <img src={picture.img} alt="image not found" />
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>
        </Modal>
    );
}
