import React from 'react';
import Input from '../../../components/UI/Input';
import Modal from '../../../components/UI/Modal';
import { Row, Col } from 'react-bootstrap';


const UpdateBrandModal = (props) => {
    const {
        show,
        handleClose,
        modalTitle,
        arrChecked,
        handleInputUpdate,
        onSubmit
    } = props;


    return (
        <Modal
            show={show}
            handleClose={handleClose}
            onSubmit={onSubmit}
            modalTitle={modalTitle}
        >
            {arrChecked.length > 0 && arrChecked.map((item, index) =>
                <Row key={index}>
                    <Col>
                        <Input
                            value={item.name}
                            placeholder={`Brand Name`}
                            onChange={(e) => handleInputUpdate(item._id, e.target.value)}
                            className="form-control-sm"
                        />
                    </Col>
                </Row>
            )}
        </Modal>
    );

}

export default UpdateBrandModal;