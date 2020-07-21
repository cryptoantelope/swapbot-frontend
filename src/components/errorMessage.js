import React from 'react'
import {Alert, Col, Container, Row} from 'react-bootstrap'

const styles = {
    container: {
        position: 'absolute',
        paddingTop: '1rem',
        top: 0,
    },
    alert: {
        zIndex: 3
    }
}

const message = props => {
    return  <Row>
                <Container style={styles.container}>
                    <Row>
                        <Col md={{span: 3, offset: 9}} sm={12} style={styles.alert}>
                            { 
                                props.errors.map((e, i)=> 
                                    <Alert key={i} variant="danger">
                                        {e? e.msg: "Sorry y get unknown error"}
                                    </Alert>
                                )
                            }
                        </Col>
                    </Row>
                </Container>
            </Row>

}

export default message