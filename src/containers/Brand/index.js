import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Layout from '../../components/Layout'
import CheckboxTree from 'react-checkbox-tree';
import { addBrand, deleteBrands } from '../../actions';
import AddBrandModal from './components/AddBrandModal';
import {
    IoIosCheckboxOutline,
    IoIosCheckbox,
    IoIosArrowForward,
    IoIosArrowDown,
    IoIosPhotos,
    IoIosAdd,
    IoIosTrash,
    IoIosCloudUpload
} from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import UpdateBrandModal from './components/UpdateBrandModal';

export default function Brand() {

    const brand = useSelector(state => state.brand);
    const [checked, setChecked] = useState([]);
    const [arrChecked, setArrChecked] = useState([]);
    const [brandName, setBrandName] = useState("");
    const [show, setShow] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const dispatch = useDispatch();

    const renderBrands = (brands) => {
        const myBrands = [];
        brands.map(brand => {
            myBrands.push({
                label: brand.name,
                value: brand._id
            })
        })
        return myBrands;
    }

    const deleteBrandsChecked = () => {
        if (checked.length > 0) {
            if (window.confirm('Are you sure you want to delete') == true) {
                const checkedIdsArray = checked.map((id) => ({ _id: id }));
                dispatch(deleteBrands(checkedIdsArray));
            }
        }
    }
    const handleShow = () => {
        setShow(true);
    }
    const handleShowUpdate = () => {
        setShowUpdate(true);
    }

    const handleClose = () => {
        if (brandName === "") {
            alert('Brand name is required');
            setShow(false);
            return;
        }
        dispatch(addBrand({ name: brandName }));
        setBrandName("");
        setShow(false);
    }
const handleCloseUpdate = () => {

    }
    const onCheck = (arr) => {
        setChecked(arr);
        const arrTemp = [];
        arr.map(id => {
            const br = brand.brands.find(br => br._id == id);
            arrTemp.push(br);
        })
        setArrChecked(arrTemp);
    }



    
    const handleInputUpdate = (id, value) => {
        const arr = arrChecked.map(br => br._id == id ? { _id: br._id, name: value} : br);
        setArrChecked(arr);
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Brand</h3>
                            <div className="actionBtnContainer">
                                <span>Actions: </span>
                                <button onClick={handleShow}><IoIosAdd /> <span>Add</span></button>
                                <button onClick={deleteBrandsChecked} ><IoIosTrash /> <span>Delete</span></button>
                                <button onClick={handleShowUpdate}><IoIosCloudUpload /> <span>Edit</span></button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <CheckboxTree
                            nodes={renderBrands(brand.brands)}
                            checked={checked}
                            onCheck={checked => onCheck(checked)}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowDown />
                            }}
                        />
                    </Col>
                </Row>
                <AddBrandModal modalTitle={`Add Brand`}
                    show={show}
                    onSubmit={handleClose}
                    handleClose={() => setShow(false)}
                    brandName={brandName}
                    setBrandName={setBrandName}
                />
                <UpdateBrandModal modalTitle={`Edit Brand Name`}
                    show={showUpdate}
                    onSubmit={handleCloseUpdate}
                    handleClose={() => setShowUpdate(false)}
                    handleInputUpdate={handleInputUpdate}
                    arrChecked={arrChecked}
                />
            </Container>
        </Layout>
    )
}
