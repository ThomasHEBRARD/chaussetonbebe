import React, { useEffect, useRef } from "react";

import { connect, useDispatch } from "react-redux";
import Store from "../../services/redux/store";
import { ReducerStateProps } from "../../services/redux/combinedReducers";

import { ReactComponent as Logo } from "../../chausson.svg";

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
} from "./header.styles";

import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

const Header: React.FC = () => {
  const isOpen = Store.getState().cartReducer.isOpen;
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);

  const handleKeyDown = (ev: KeyboardEvent) => {
    if (ev.key === "Escape") {
      const action = { type: "CLOSE_DROPDOWN" };
      dispatch(action);
    }
  };

  const handleClickOutside = (ev: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(ev.target)) {
      const action = { type: "CLOSE_DROPDOWN" };
      dispatch(action);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to="/shop">Shop</OptionLink>
        <div ref={wrapperRef}>
          <CartIcon />
          {isOpen ? <CartDropdown /> : null}
        </div>
      </OptionsContainer>
    </HeaderContainer>
  );
};

const mapStateToProps = (state: ReducerStateProps) => {
  return { isOpen: state.cartReducer.isOpen };
};
const mapDispatchToProps = (dispatch: (arg0: any) => any) => {
  return { dispatch: (action: any) => dispatch(action) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
