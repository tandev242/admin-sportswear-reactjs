import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllCategory,
    addCategory,
    deleteCategories as deleteCategoriesAction,
    updateCategories
} from '../../actions';
import Modal from '../../components/UI/Modal';
import CheckboxTree from 'react-checkbox-tree';
import {
    IoIosCheckboxOutline,
    IoIosCheckbox,
    IoIosArrowForward,
    IoIosArrowDown,
    IoIosPhotos,
    IoIosAdd,
    IoIosTrash,
    IoIosCloudUpload
} from 'react-icons/io'

import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import AddCategoryModal from './components/AddCategoryModal';
import UpdateCategoriesModal from './components/UpdateCategoriesModal';
import './style.css';


const Category = (props) => {

    const category = useSelector(state => state.category);
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [show, setShow] = useState(false);
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!category.loading) {
            setShow(false);
        }
    }, [category.loading]);


    const handleShow = () => setShow(true);

    const handleClose = () => {
        const form = new FormData();

        if (categoryName === "") {
            alert('Category name is required');
            setShow(false);
            return;
        }
        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);
        dispatch(addCategory(form));
        setCategoryName('');
        setParentCategoryId('');
        setShow(false);
    }

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }

    const deleteCategory = () => {
        if (checked.length == 0 && expanded.length == 0) {
            alert('Please select category to delete')
        } else {
            updateCheckedAndExpandedCategories();
            setDeleteCategoryModal(true);
        }

    }

    const updateCheckedAndExpandedCategories = () => {
        const categories = createCategoryList(category.categories);
        const checkedArr = [];
        const expandedArr = [];
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const cat = categories.find((category, _index) => categoryId == category.value);
            cat && checkedArr.push(cat);
        })
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const cat = categories.find((category, _index) => categoryId == category.value);
            cat && expandedArr.push(cat);
        })
        setCheckedArray(checkedArr);
        setExpandedArray(expandedArr);
    }


    const updateCategory = () => {
        if (checked.length == 0 && expanded.length == 0) {
            alert('Please select category to edit')
        } else {
            updateCheckedAndExpandedCategories();
            setUpdateCategoryModal(true);
        }
    }

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
            );
        }
        return myCategories;
    }

    const createCategoryList = (categories, options = []) => {

        for (let category of categories) {
            options.push({
                value: category._id,
                name: category.name,
                parentId: category.parentId
            });
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;
    }

    const deleteCategories = () => {
        const checkedIdsArray = checkedArray.map((item, index) => ({ _id: item.value }));
        const expandedIdsArray = expandedArray.map((item, index) => ({ _id: item.value }));
        const idsArray = expandedIdsArray.concat(checkedIdsArray);

        if (checkedIdsArray.length > 0) {
            dispatch(deleteCategoriesAction(checkedIdsArray))
                .then(result => {
                    if (result) {
                        dispatch(getAllCategory())
                        setDeleteCategoryModal(false)
                    }
                });
        }
        setDeleteCategoryModal(false);
    }

    const updateCategoriesForm = () => {
        const form = new FormData();
        expandedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
        });
        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
        });
        dispatch(updateCategories(form));
        setUpdateCategoryModal(false);
        alert("Updated successful !");
    }

    const handleCategoryInput = (key, value, index, type) => {
        if (type === "checked") {
            const updatedCheckedArr = checkedArray.map((item, _index) =>
                index === _index ? { ...item, [key]: value } : item);
            setCheckedArray(updatedCheckedArr);
        } else if (type === "expanded") {
            const updatedExpandedArr = expandedArray.map((item, _index) =>
                index === _index ? { ...item, [key]: value } : item);
            setExpandedArray(updatedExpandedArr);
        }
    }

    const renderDeleteCategoryModal = () => {
        return <Modal
            modalTitle="Confirm"
            show={deleteCategoryModal}
            handleClose={() => setDeleteCategoryModal(false)}
            buttons={[
                {
                    label: 'Yes',
                    color: 'primary',
                    onClick: deleteCategories
                },
                {
                    label: 'No',
                    color: 'danger',
                    onClick: () => {
                        setDeleteCategoryModal(false);
                    },
                }
            ]}
        >
            <h5>Expanded</h5>
            {expandedArray.map((item, index) => <span key={index}>{item.name}  </span>)}
            <h5>Checked</h5>
            {checkedArray.map((item, index) => <span key={index} >{item.name}&emsp;</span>)}

        </Modal>
    }

    const categoryList = createCategoryList(category.categories);

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <div className="actionBtnContainer">
                                <span>Actions: </span>
                                <button onClick={handleShow}><IoIosAdd /> <span>Add</span></button>
                                <button onClick={deleteCategory}><IoIosTrash /> <span>Delete</span></button>
                                <button onClick={updateCategory}><IoIosCloudUpload /> <span>Edit</span></button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
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
            </Container>
            <AddCategoryModal
                show={show}
                handleClose={() => setShow(false)}
                onSubmit={handleClose}
                modalTitle={'Add New Category'}
                categoryName={categoryName}
                setCategoryName={setCategoryName}
                parentCategoryId={parentCategoryId}
                setParentCategoryId={setParentCategoryId}
                categoryList={categoryList}
                handleCategoryImage={handleCategoryImage}
            />
            <UpdateCategoriesModal
                show={updateCategoryModal}
                handleClose={() => setUpdateCategoryModal(false)}
                onSubmit={updateCategoriesForm}
                modalTitle={'Update Categories'}
                size="lg"
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                handleCategoryInput={handleCategoryInput}
                categoryList={categoryList}
            />
            {renderDeleteCategoryModal()}
        </Layout>
    );
}

export default Category