import React from 'react';
import Input from '../../../components/UI/Input';
import Modal from '../../../components/UI/Modal';
import { Row, Col } from 'react-bootstrap';


const AddBrandModal = (props) => {
    const {
        show,
        handleClose,
        modalTitle,
        brandName,
        setBrandName,
        handleBrandImage,
        onSubmit
    } = props;

    return (
        <Modal
            show={show}
            handleClose={handleClose}
            onSubmit={onSubmit}
            modalTitle={modalTitle}
        >
            <Row>
                <Col>
                    <Input
                        value={brandName}
                        placeholder={`Brand Name`}
                        onChange={(e) => setBrandName(e.target.value)}
                        className="form-control-sm"
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <input type="file" name="brandImage" accept="image/x-png,image/gif,image/jpeg" onChange={handleBrandImage} />
                </Col>
            </Row>
        </Modal>
    );

}

export default AddBrandModal;