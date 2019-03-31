import {Http} from '../../../utils/http';
import {API_URL} from '../urls';
import {displaySnackbar, startSpinner, stopSpinner} from '../../base/components';
import * as actionTypes from './action_types';

/* Waste Category Actions */
export function getWasteCategoriesAction() {
  return (dispatch) => {
    startSpinner();
    Http.get(API_URL.wasteCategories())
      .then(response => {
        stopSpinner();
        dispatch({
          type: actionTypes.WASTE_CATEGORY_DETAILS,
          waste_categories: response.data
        })
      })
      .catch(response => {
        stopSpinner();
        displaySnackbar("Something went wrong");
      })
  }
}

export function getWasteCategoryAction(id) {
  return (dispatch) => {
    startSpinner();
    Http.get(API_URL.wasteCategory(id))
      .then(response => {
        stopSpinner();
        dispatch({
          type: actionTypes.WASTE_CATEGORY_DETAIL,
          waste_category: response.data
        })
      })
      .catch(response => {
        stopSpinner();
        displaySnackbar("Something went wrong");
      })
  }
}

export function createWasteCategoryAction(data, history) {
  return (dispatch) => {
    startSpinner();
    Http.post(API_URL.wasteCategories(), data)
      .then(response => {
        stopSpinner();
        history.push("/waste-categories");
        displaySnackbar("Created Successfully");
      })
      .catch(response => {
        stopSpinner();
        displaySnackbar("Something went wrong");
      });
  }
}

export function updateWasteCategoryAction(data, history) {
  return (dispatch) => {
    startSpinner();
    Http.put(API_URL.wasteCategory(data.id), data)
      .then(response => {
        stopSpinner();
        history.push("/waste-categories");
        displaySnackbar("Updated Successfully");
      })
      .catch(response => {
        stopSpinner();
        displaySnackbar("Something went wrong");
      });
  }
}

export function deleteWasteCategoryAction(data, history) {
  return (dispatch) => {
    startSpinner();
    Http.delete(API_URL.wasteCategory(data.id), data)
      .then(response => {
        stopSpinner();
        history.push("/waste-categories");
        displaySnackbar("Deleted Successfully");
      })
      .catch(response => {
        stopSpinner();
        displaySnackbar("Something went wrong");
      });
  }
}

/* Waste Actions */
export function getWastesAction() {
  return (dispatch) => {
    startSpinner();
    Http.get(API_URL.wastes())
      .then(response => {
        stopSpinner();
        dispatch({
          type: actionTypes.WASTE_DETAILS,
          wastes: response.data
        })
      })
      .catch(response => {
        stopSpinner();
        displaySnackbar("Something went wrong");
      })
  }
}

export function getWasteAction(id) {
  return (dispatch) => {
    startSpinner();
    Http.get(API_URL.waste(id))
      .then(response => {
        stopSpinner();
        dispatch({
          type: actionTypes.WASTE_DETAIL,
          waste: response.data
        })
      })
      .catch(response => {
        stopSpinner();
        displaySnackbar("Something went wrong");
      })
  }
}

export function createWasteAction(data, history) {
  return (dispatch) => {
    startSpinner();
    Http.post(API_URL.wastes(), data)
      .then(response => {
        stopSpinner();
        history.push("/wastes");
        displaySnackbar("Created Successfully");
      })
      .catch(response => {
        stopSpinner();
        displaySnackbar("Something went wrong");
      });
  }
}

export function updateWasteAction(data, history) {
  return (dispatch) => {
    startSpinner();
    Http.put(API_URL.waste(data.id), data)
      .then(response => {
        stopSpinner();
        history.push("/wastes");
        displaySnackbar("Updated Successfully");
      })
      .catch(response => {
        stopSpinner();
        displaySnackbar("Something went wrong");
      });
  }
}

export function deleteWasteAction(data, history) {
  return (dispatch) => {
    startSpinner();
    Http.delete(API_URL.waste(data.id), data)
      .then(response => {
        stopSpinner();
        history.push("/wastes");
        displaySnackbar("Deleted Successfully");
      })
      .catch(response => {
        stopSpinner();
        displaySnackbar("Something went wrong");
      });
  }
}
