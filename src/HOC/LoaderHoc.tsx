import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";
import Loader from "../components/CommonComponent/Loader";


const withLoader = (WrappedComponent:any) => {
  class WithLoadingScreen extends React.Component {
    render() {
      return (
        <React.Fragment>
          <Loader />
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  }
  hoistNonReactStatics(WithLoadingScreen, WrappedComponent);
  return WithLoadingScreen;
};
export default withLoader;