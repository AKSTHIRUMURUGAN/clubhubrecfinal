import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      {/* Image at the left corner */}
      <Link to="/" className="navbar-brand">
        <img
          src="../../public/images/logo.png"
          width="50"
          height="50"
          className="d-inline-block align-top"
          alt="Logo"
        />
      </Link>

      {/* Navbar (rest of the content) */}
      <Navbar bg="dark" variant="dark" expand="md" className="ml-auto">
        {/* Text centered within the Navbar */}
        <Navbar.Brand className="mx-auto" id="t">
          Club Hub
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/image-gallery" className="nav-link">
              Image Gallery
            </Link>
            <Link to="/events" className="nav-link">
              Events
            </Link>
            <NavDropdown title="More" id="basic-nav-dropdown">
              <Link to="/login" className="dropdown-item">
                Add Event
              </Link>
              <Link to="/about-us" className="dropdown-item">
                About Us
              </Link>
              <Link to="/contact-us" className="dropdown-item">
                Contact Us
              </Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
