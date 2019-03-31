import React, {Component} from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/actions';

import {
  Input,
  Form,
  Container,
  Button,
  Column,
  Row,
  Card,
  CardContent,
  CardTitle,
  CardAction ,
  Select,
} from '../../../base/components'


class Waste extends Component {
  state = {
    id: null,
    name: "",
    unit: "",
    description: "",
    price: 0.00,
    waste_category: "",
    errors: {},
  }

  componentDidMount() {
    window.M.updateTextFields();
  }

  componentWillReceiveProps(nextProps) {
    const {name, unit, description, price, waste_category, id} = nextProps.waste;
    if(!this.state.name && name) {
      this.setState({name, unit, description, price, waste_category, id});
    }
  }

  componentWillMount() {
    const {id} = this.props.match.params;
    if(id && id !== "new") {
      this.props.getWaste(id);
    }
    this.props.getWasteCategories();
  }

  buildForm(categories) {
    return (
      <Form>
        <Row>
          <Input
            id="name"
            label="Name"
            for="name"
            value={this.state.name}
            placeholder="Enter Name"
            onChange={(event) => this.setState({name: event.target.value})}
            divClasses={["s12"]}
            errorMessage={this.state.errors.name}
            />
        </Row>
        <Row>
          <Input
            id="description"
            label="Description"
            for="description"
            placeholder="Enter Description"
            value={this.state.description}
            onChange={(event) => this.setState({description: event.target.value})}
            divClasses={["s12"]}
            errorMessage={this.state.errors.description}
            />
        </Row>
        <Row>
          <Input
            id="unit"
            label="Unit"
            for="unit"
            placeholder="Enter Unit"
            value={this.state.unit}
            onChange={(event) => this.setState({unit: event.target.value})}
            divClasses={["s12"]}
            errorMessage={this.state.errors.unit}
            />
        </Row>
        <Row>
          <Input
            id="price"
            type="number"
            label="Price"
            for="price"
            placeholder="Enter Price"
            value={this.state.price}
            onChange={(event) => this.setState({price: event.target.value})}
            divClasses={["s12"]}
            errorMessage={this.state.errors.price}
            />
        </Row>

        <Row>
          <Select
            classes={["s12"]}
            label="Waste Category"
            rows={categories}
            defaultLabel="Select Category"
            onChange={(event) => this.setState({waste_category: event.target.value})}
            value={this.state.waste_category}
            errorMessage={this.state.errors.waste_category}
            />
        </Row>
      </Form>
    )
  }

  submit = (event) => {
    if(this.validate()) {
      const {id, name, description, unit, price, waste_category} = this.state;
      if(id) {
        this.props.updateWaste({id, name, description, unit, price, waste_category}, this.props.history);
      }
      else {
        this.props.createWaste({id, name, description, unit, price, waste_category}, this.props.history);
      }
    }
  }

  delete = (event) => {
    this.props.deleteWaste({id: this.state.id}, this.props.history);
  }

  render() {
    const categories = this.props.waste_categories.map(category => {
      return {id: category.id, label: category.name};
    });
    return (
      <Container>
        <Row>
           <h2 className="center-align teal-text">Waste</h2>
        </Row>

        <Row>

          <Column classes={["s12", "m6", "offset-m3"]}>

            <Card>
              <CardContent>
                <CardTitle>Create Waste</CardTitle>

                {this.buildForm(categories)}

              </CardContent>

              <CardAction>
                <Button onClick={this.submit}>{this.state.id ? "Update" : "Create"}</Button>
                &nbsp; &nbsp;
                {this.state.id ? <Button onClick={this.delete} classes={["red"]}>Delete</Button> : null}
              </CardAction>

            </Card>

          </Column>

        </Row>
      </Container>
    );
  }

  validate() {
    let isValid = true;
    let errors = {};
    const {name, unit, price, waste_category} = this.state;

    if(!name) {
      isValid = false;
      errors.name = "Name is mandatory";
    }
    if(!unit) {
      isValid = false;
      errors.unit= "Unit is mandatory";
    }
    if(price <= 0) {
      isValid = false;
      errors.price = "Price cannot be negative";
    }
    if(!waste_category) {
      isValid = false;
      errors.waste_category = "Waste Category is mandatory";
    }

    this.setState({errors});
    return isValid;
  }
}

const mapStateToProps = state => {
  return {
    waste: state.waste.waste,
    waste_categories: state.wasteCategory.waste_categories,
  };
};

const mapDispatchToProps = dispatch => {
    return {
      createWaste: (details, history) => dispatch(actions.createWasteAction(details, history)),
      updateWaste: (details, history) => dispatch(actions.updateWasteAction(details, history)),
      getWaste: (id) => dispatch(actions.getWasteAction(id)),
      deleteWaste: (id, history) => dispatch(actions.deleteWasteAction(id, history)),
      getWasteCategories: () => dispatch(actions.getWasteCategoriesAction()),
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Waste );
