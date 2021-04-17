import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import Layout from '../../components/Layout';


const Signin = (props) => {
    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={userLogin}>
                            <Input
                                label="Email"
                                placeholder="Email"
                                value=""
                                type="email"
                            />

                            <Input
                                label="Password"
                                placeholder="Password"
                                value=""
                                type="password"
                            />
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>

            </Container>
        </Layout>
    )
}

export default Signin;