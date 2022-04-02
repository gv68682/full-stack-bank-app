import styled from "styled-components";
import logo from "./logo.JPG";
import { AuthContext } from "../../contexts/Auth/authContext";
import { useContext } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const Container = styled.nav`
  background-color: white;
  width: 180px;
  align-self: stretch;
`;
const Logo = styled.img`
  padding: 16px;
  padding-left: 25px;
  width: 82px;
`;
const List = styled.ul`
  list-style-type: none;
  padding: 2px 0;
  margin: 0;
`;

const Item = styled.li`
  padding: 16px 24px;
  a {
    :hover {
      color: ${(props) =>  (props.active ? "white" : "#dc3545")} !important;
      transform: translate(0%, -2%);
      transition: color 0.5s;
      font-weight: 600;
    }
    text-decoration: none;
    color: ${(props) => {
      return props.active ? "white" : "black";
    }};
    font-weight: ${(props) => (props.active ? "bold" : "normal")};
  }
  background-color: ${(props) =>  (props.active ? "#dc3545" : "white")}
`;

const NavBar = (props) => {
  const location = useLocation();

  const { userInfo, logout, auth } = useContext(AuthContext);
  return (
    <Container>
      <Logo src={logo} />

      <List>
        <Item active={location.pathname === '/'  || location.pathname === '/createAccount' || location.pathname === '/login'}>
          <Link to="/">Best Bank</Link>
        </Item>
        {auth ? (
          <>
            <Item>
              <div style={{ color: "#dc3545" }}>{`Welcome ${auth.name}!`}</div>
            </Item>
            <Item>
              <span style={{ color: "#dc3545" }}>{userInfo.email}</span>
            </Item>
            <Item active={location.pathname === '/deposit'}>
              <Link to="deposit">Deposit</Link>
            </Item>
            <Item active={location.pathname === '/withdraw'}>
              <Link to="withdraw">Withdraw</Link>
            </Item>
            <Item active={location.pathname === '/balance'}>
              <Link to="balance">Balance</Link>
            </Item>
            <Item active={location.pathname === '/transfer'}>
              <Link to="transfer">Transfer</Link>
            </Item>
            <Item active={location.pathname === '/alldata'}>
              {auth.name === 'abel' ? <Link to="alldata">All Data</Link> : <></> }
            </Item>
            <Item onClick={logout}>
              <Link to="/">Log Out</Link>
            </Item>
          </>
        ) : (
          <>
            {/* <Item active={location.pathname === '/createAccount'}>
              <Link to="createAccount">Create Account</Link>
            </Item>
            <Item active={location.pathname === '/login'}>
              <Link to="login">Login</Link>
            </Item> */}
          </>
        )}
      </List>
    </Container>
  );
};

export { NavBar };
