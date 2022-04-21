import Category from "./components/Category";
import Search from "./components/Search";
import Pages from "./pages/Pages";
import Footer from "./pages/Footer";

import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";

function App() {
  return (
    <div className="App">
      <Container>
        <BrowserRouter>
          <Nav>
            <Logo to={"/"}>
              <GiKnifeFork />
              Deliciousss
            </Logo>
          </Nav>
          <Search />
          <Category />
          <Pages />
        </BrowserRouter>
      </Container>
      <Footer />
    </div>
  );
}

const Container = styled.div`
  margin: 0% 10%;
`;

const Nav = styled.div`
  padding: 3rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: "Lobster Two", cursive;

  svg {
    font-size: 2rem;
  }
`;

export default App;
