import React, { lazy, Suspense } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { GlobalStyle } from "./global.styles";

import Splash from "./components/splash/splash.component";
import Header from "./components/header/header.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import Spinner from "./components/spinner/spinner.component";

const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));

const App = ({ location }) => {
  const { pathname } = location;

  return (
    <div className="app">
      <GlobalStyle />
      {pathname !== "/" ? <Header /> : null}
      <Switch>
        <Route exact path="/" component={Splash} />
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route path="/shop" component={ShopPage} />
            <Route exact path="/checkout" component={CheckoutPage} />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
};

export default withRouter(App);
