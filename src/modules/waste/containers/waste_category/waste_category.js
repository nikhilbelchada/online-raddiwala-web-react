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
} from '../../../base/components'


class WasteCategory extends Component {
  state = {
    id: null,
    name: "",
    description: "",
    errors: {},
  }

  componentDidMount() {
    window.M.updateTextFields();
  }

  componentWillReceiveProps(nextProps) {
    const {name, description, id} = nextProps.wasteCategory;
    if(!this.state.name && name) {
      this.setState({name, description, id});
    }
  }

  componentWillMount() {
    const {id} = this.props.match.params;
    if(id && id !== "new") {
      this.props.getWasteCategory(this.props.match.params.id);
    }
  }

  buildForm() {
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
      </Form>
    )
  }

  submit = (event) => {
    if(this.validate()) {
      const {id, name, description} = this.state;
      if(id) {
        this.props.updateWasteCategory({id, name, description}, this.props.history);
      }
      else {
        this.props.createWasteCategory({id, name, description}, this.props.history);
      }
    }
  }

  delete = (event) => {
    this.props.deleteWasteCategory({id: this.state.id}, this.props.history);
  }

  render() {
    return (
      <Container>
        <Row>
           <h2 className="center-align teal-text">Waste Category</h2>
        </Row>

        <Row>

          <Column classes={["s12", "m6", "offset-m3"]}>

            <Card>
              <CardContent>
                <CardTitle>Create Waste Category</CardTitle>

                {this.buildForm()}

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
    const {name, description} = this.state;

    if(!name) {
      isValid = false;
      errors.name = "Name is mandatory";
    }
    if(!description) {
      isValid = false;
      errors.description = "Description is mandatory";
    }

    this.setState({errors});
    return isValid;
  }
}

const mapStateToProps = state => {
  return {
    wasteCategory: state.wasteCategory.waste_category,
  };
};

const mapDispatchToProps = dispatch => {
    return {
      createWasteCategory: (details, history) => dispatch(actions.createWasteCategoryAction(details, history)),
      updateWasteCategory: (details, history) => dispatch(actions.updateWasteCategoryAction(details, history)),
      getWasteCategory: (id) => dispatch(actions.getWasteCategoryAction(id)),
      deleteWasteCategory: (id, history) => dispatch(actions.deleteWasteCategoryAction(id, history)),
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( WasteCategory );
