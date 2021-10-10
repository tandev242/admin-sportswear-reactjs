import { useState } from "react"
import Input from "../../../components/UI/Input"
import Modal from "../../../components/UI/Modal"
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import RangeSlider from 'react-bootstrap-range-slider'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css'
import { Row, Col, Form } from "react-bootstrap";


export default function AddDiscountModal(props) {
    const { show, handleClose, onSubmit, categories, brands, discount, setDiscount } = props;

    const createBrandList = (brands, options = []) => {
        for (let brand of brands) {
            options.push({ value: brand._id, name: brand.name });
        }
        return options;
    }
    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name });
            if (category.children.length > 0) {
                createCategoryList(category.children, options);
            }
        }
        return options;
    };
    
    const SelectOptions = () => {
        if (discount.type === "brand") {
            return <select
                className="form-control"
                value={discount._id}
                onChange={(e) => setDiscount({ ...discount, _id: e.target.value })}
            >
                <option>select brand</option>
                {createBrandList(brands).map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>
        } else if (discount.type === "category") {
            return <select
                className="form-control"
                value={discount._id}
                onChange={(e) => setDiscount({ ...discount, _id: e.target.value })}
            >
                <option>select category</option>
                {createCategoryList(categories).map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>
        }
        return null
    }


    return (
        <Modal
            show={show}
            handleClose={handleClose}
            modalTitle={"Add Discount"}
            onSubmit={onSubmit}
        >
            <div className="wrapper-discount">
                <h5>Discount By </h5>
                <ToggleButtonGroup
                    name="value"
                    type="radio"
                    size="md"
                    value={discount.type}
                    onChange={(value) => setDiscount({ ...discount, type: value })}
                >
                    <ToggleButton value={"category"}>Category</ToggleButton>
                    <ToggleButton value={"brand"}>Brand</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <hr />
            <SelectOptions />
            <hr />

            <Form >
                <Form.Group>
                    <Form.Label>
                        Discount Percent
                    </Form.Label>
                    <RangeSlider
                        value={discount.discountPercent}
                        size="lg"
                        tooltipLabel={currentValue => `${currentValue}%`}
                        tooltip='on'
                        onChange={e => setDiscount({ ...discount, discountPercent: e.target.value })}
                    />
                </Form.Group>
            </Form>
        </Modal>
    )
}
