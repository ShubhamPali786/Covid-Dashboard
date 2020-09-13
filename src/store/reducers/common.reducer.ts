import { Action } from "redux";
import { commonActionTypes } from "../actions/common.action";

interface CommonAction extends Action{
    status:boolean;
}

function commonReducer(state = false, action: CommonAction) {
    switch (action.type) {
      case commonActionTypes.SET_LOADING:
        return action.status;
      default:
        return state;
    }
  }
  export default commonReducer;