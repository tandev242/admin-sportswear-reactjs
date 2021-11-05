import React, { useState, useEffect } from 'react'
import Layout from "../../components/Layout";
import {
    Container,
    Row,
    Col,
    ButtonGroup,
    DropdownButton,
    Dropdown
} from 'react-bootstrap';
import { Bar, Line, Radar, Doughnut } from "react-chartjs-2";
import './style.scss'

export default function Statistic() {

    const [typeChart, setTypeChart] = useState("Bar");

    const Chart = ({ data, options }) => {
        if (typeChart === "Doughnut") {
            return <Doughnut data={data} options={{ ...options, maintainAspectRatio: false }} height={600} />;
        } else if (typeChart === "Line") {
            return <Line data={data} options={options} />;
        } else if (typeChart === "Radar ") {
            return <Radar data={data} options={{ ...options, maintainAspectRatio: false }} height={650} />;
        }
        return <Bar data={data} options={options} />;
    }

    return (
        <Layout sidebar>
            <Container className="statistic-wrapper">
                <Row>
                    <Col md={12}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h3>Statistic</h3>
                            <ButtonGroup size="sm" className="btn-group-order-status">
                                <DropdownButton
                                    className="dropdown-role" as={ButtonGroup}
                                    title={typeChart}
                                    onSelect={(e) => setTypeChart(e)}
                                >
                                    <Dropdown.Item eventKey="Bar">Bar</Dropdown.Item>
                                    <Dropdown.Item eventKey="Line">Line</Dropdown.Item>
                                    <Dropdown.Item eventKey="Radar ">Radar </Dropdown.Item>
                                    <Dropdown.Item eventKey="Doughnut">Doughnut</Dropdown.Item>
                                </DropdownButton>
                            </ButtonGroup>
                        </div>
                    </Col>
                </Row>
                <hr />
                <Row >
                    <Chart
                        data={{
                            labels: [
                                "Africa",
                                "Asia",
                                "Europe",
                                "Latin America",
                                "North America"
                            ],
                            datasets: [
                                {
                                    label: "Population (millions)",
                                    backgroundColor: [
                                        "#3e95cd",
                                        "#8e5ea2",
                                        "#3cba9f",
                                        "#e8c3b9",
                                        "#c45850"
                                    ],
                                    data: [2478, 5267, 734, 784, 433]
                                }
                            ]
                        }}
                        options={{
                            legend: { display: false },
                            title: {
                                display: true,
                                text: "Predicted world population (millions) in 2050"
                            }
                        }}
                    />
                </Row>
            </Container>
        </Layout>
    )
}
