import React from 'react';

import {
  Container,
  Button,
  Row,
} from '../../../base/components'

const reports = (props) => {
  return (
      <Container>
        <Row>
           <h2 className="center-align teal-text">Reports</h2>
        </Row>

        <Row>
          <Button
            type="link"
            to="/reports/order">
            Order Report
          </Button>
        </Row>

      </Container>
  );
}

export default reports;
