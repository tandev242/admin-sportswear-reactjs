import { useState } from "react";
import Input from "../../../components/UI/Input";
import Modal from "../../../components/UI/Modal";

export default function AddProductModal(props) {
    const {
        show,
        handleClose,
        onSubmit,
        product,
        setProduct,
        brands,
        categories,
        sizes
    } = props;

    const [size, setSize] = useState({ size: "", quantity: "" });

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
    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name });
            if (category.children.length > 0) {
                createCategoryList(category.children, options);
            }
        }
        return options;
    };

    return (
        <Modal
            show={show}
            handleClose={handleClose}
            modalTitle={"Add New Product"}
            onSubmit={onSubmit}
        >
            <Input
                label="Name"
                value={product.name}
                placeholder={`Product Name`}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
            <Input
                label="Price"
                value={product.price}
                placeholder={`Price`}
                onChange={(e) => setProduct({ ...product, price: e.target.value })}
            />
            <Input
                label="Description"
                value={product.description}
                placeholder={`Description`}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
            />
            <select
                className="form-control"
                value={product.categoryId}
                onChange={(e) => setProduct({ ...product, categoryId: e.target.value })}
            >
                <option>select category</option>
                {createCategoryList(categories).map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>

            <select
                className="form-control"
                value={product.brandId}
                style={{ margin: "20px 0" }}
                onChange={(e) => setProduct({ ...product, brandId: e.target.value })}
            >
                <option>select brand</option>
                {createBrandList(brands).map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>
            <h6>Sizes</h6>
            <div className="form-add-size">
                <select
                    className="form-control"
                    value={size.size}
                    onChange={(e) => setSize({ ...size, size: e.target.value })}
                >
                    <option>select size</option>
                    {createSizeList(sizes).map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.size}
                        </option>
                    ))}
                </select>

                <Input
                    value={size.quantity}
                    placeholder={`Qty`}
                    onChange={(e) => setSize({ ...size, quantity: e.target.value })}
                />
                <button className="btn-add" onClick={() => setProduct({ ...product, sizes: [...product.sizes, size] })}>
                    add
                </button>
                <div className="size-info">
                    {
                        product.sizes.length > 0
                            ? product.sizes.map((sizeItem, index) => (
                                <div key={index}>{`Size: ${sizes.find((size) => size._id == sizeItem.size).size} Qty: ${sizeItem.quantity}`}</div>
                            ))
                            : null
                    }
                </div>
            </div>
            <Input
                type="file"
                name="productPicture"
                accept="image/x-png,image/gif,image/jpeg"
                onChange={(e) => setProduct({ ...product, productPictures: [...product.productPictures, e.target.files[0]] })}
            />
            {product.productPictures.length > 0
                ? product.productPictures.map((pic, index) => (
                    <div key={index}>{pic.name}</div>
                ))
                : null}
        </Modal>
    );
};
