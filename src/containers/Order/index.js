import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import {
    Container,
    Row,
    Col,
    ButtonGroup,
    DropdownButton,
    Dropdown
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import OrderStatusCard from './components/OrderStatusCard';


import "./style.scss";


export default function Order() {
    const order = useSelector(state => state.order);
    const [typeSort, setTypeSort] = useState("all");


    const listOrderByType = (type) => {
        if (type === "all") return order.orders;
        const listOrder = order.orders.filter(item => {
            if (lastCompletedType(item) === type) return true;
            return false;
        })
        return listOrder
    }
    // Lay ra orderStatus.type cuoi cung de sort
    const lastCompletedType = (item) => {
        for (let i = item.orderStatus.length - 1; i >= 0; i--) {
            if (item.orderStatus[i].isCompleted) return item.orderStatus[i].type
        }
    }

    return (
        <Layout sidebar>
            <Container className="table-order">
                <Row>
                    <Col md={12}>
                        <div className="title">
                            <h3>Order</h3>
                            <div>
                                {/* <ButtonGroup size="sm" className="btn-group-payment-status">
                                    <DropdownButton
                                        className="dropdown-role" as={ButtonGroup}
                                        title={`PStatus: all`}
                                    // id="bg-nested-dropdown"
                                    // onSelect={(e) => setType(e)}z
                                    >
                                        <Dropdown.Item eventKey="all">All</Dropdown.Item>
                                        <Dropdown.Item eventKey="pending">pending</Dropdown.Item>
                                        <Dropdown.Item eventKey="completed">completed</Dropdown.Item>
                                        <Dropdown.Item eventKey="cancelled">cancelled</Dropdown.Item>
                                        <Dropdown.Item eventKey="refund">refund</Dropdown.Item>
                                    </DropdownButton>
                                </ButtonGroup> */}
                                <ButtonGroup size="sm" className="btn-group-order-status">
                                    <DropdownButton
                                        className="dropdown-role" as={ButtonGroup}
                                        title={typeSort}
                                        onSelect={(e) => setTypeSort(e)}
                                    >
                                        <Dropdown.Item eventKey="all">all</Dropdown.Item>
                                        <Dropdown.Item eventKey="ordered">ordered</Dropdown.Item>
                                        <Dropdown.Item eventKey="packed">packed</Dropdown.Item>
                                        <Dropdown.Item eventKey="shipped">shipped</Dropdown.Item>
                                        <Dropdown.Item eventKey="delivered">delivered</Dropdown.Item>
                                    </DropdownButton>
                                </ButtonGroup>
                            </div>
                        </div>
                    </Col>
                </Row>
                {
                    listOrderByType(typeSort).map((order, index) => <OrderStatusCard orderItem={order} key={index} />)
                }
            </Container>
        </Layout>
    )
}
