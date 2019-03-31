import React, {Component} from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/actions';

import {
  Container,
  Button,
  Row,
  Table,
} from '../../../base/components'


class Wastes extends Component {
  componentWillMount() {
    this.props.getWastes();
  }
  render() {
    const headers = [
      {name: "Name", key: "name", isLink: true, linkKey: "id", linkPath: "/wastes/" },
      {name: "Unit", key: "unit"},
      {name: "Price", key: "price"},
      {name: "Waste Category", key: "waste_category_name"},
    ];

    return (
      <Container>
        <Row>
           <h2 className="center-align teal-text">Waste</h2>
        </Row>

        <Row>
          <Button
            type="link"
            to="/wastes/new">
            Create New
          </Button>
        </Row>

        <Row>
          <Table headers={headers} rows={this.props.wastes}/>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    wastes: state.waste.wastes
  };
};

const mapDispatchToProps = dispatch => {
    return {
      createWaste: (details) => dispatch(actions.createWasteAction(details)),
      getWastes: () => dispatch(actions.getWastesAction()),
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Wastes );
