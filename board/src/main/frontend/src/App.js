import React from "react";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import BoardPage from "./pages/BoardPage";
import Main from "./pages/Main";
import ArticlePage from "./pages/ArticlePage";
import RegisterPage from "./pages/RegisterPage";
import DetailPage from "./pages/DetailPage";
import Paging from "./pages/sections/Paging";
import {Container, Nav, Navbar} from "react-bootstrap";

function App() {
  return (
      <BrowserRouter>
          <div>
              <>
                  <Navbar bg="dark" variant="dark">
                      <Container>
                          <Navbar.Brand href="/">Navbar</Navbar.Brand>
                          <Nav className="me-auto">
                              <Nav.Link href="/">Home</Nav.Link>
                              <Nav.Link href="/Board">Board</Nav.Link>
                          </Nav>
                      </Container>
                  </Navbar>
                  <br />
              </>
              <Routes>
                  <Route path ="/" element={<Main />} />
                  <Route path ="Board" element ={<BoardPage />} />
                  <Route path ="article" element={<ArticlePage />} />
                  <Route path ="Register" element ={<RegisterPage />} />
                  <Route path ="detail" element ={<DetailPage />} />
                  <Route path ="paging" element ={<Paging />} />
              </Routes>
          </div>
      </BrowserRouter>
  );
}
export default App;
