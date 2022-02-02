import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

//isplay of header component
function Header(props) {
    return (
<>
<Navbar bg="dark" variant="dark" expand="lg">
  <Container>
    <Navbar.Brand href="#home">BCG Insurance Use Case</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav  className="ms-auto" >
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/analytics">Analytics</Nav.Link>
        
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
</>
)
}

export default Header