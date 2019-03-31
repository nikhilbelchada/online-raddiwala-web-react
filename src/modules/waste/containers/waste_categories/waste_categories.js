import React, {Component} from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/actions';

import {
  Container,
  Button,
  Row,
  Table,
} from '../../../base/components'


class WasteCategories extends Component {
  componentWillMount() {
    this.props.getWasteCategories();
  }
  render() {
    const headers = [
      {name: "Name", key: "name", isLink: true, linkKey: "id", linkPath: "/waste-categories/" },
      {name: "Description", key: "description"},
    ];

    return (
      <Container>
        <Row>
           <h2 className="center-align teal-text">Waste Category</h2>
        </Row>

        <Row>
          <Button
            type="link"
            to="/waste-categories/new">
            Create New
          </Button>
        </Row>

        <Row>
          <Table headers={headers} rows={this.props.wasteCategories}/>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    wasteCategories: state.wasteCategory.waste_categories
  };
};

const mapDispatchToProps = dispatch => {
    return {
      createWasteCategory: (details) => dispatch(actions.createWasteCategoryAction(details)),
      getWasteCategories: () => dispatch(actions.getWasteCategoriesAction()),
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( WasteCategories );
