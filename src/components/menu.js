import React from 'react';
import {Nav,Navbar,NavItem,Badge} from 'react-bootstrap';

class Menu extends React.Component{
    render()
    {
        return(
            <Navbar inverse collapseOnSelect fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                    <a href="/">AS - Shopping Cart</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                    <NavItem eventKey={1} href="/About">
                        Know Us
                    </NavItem>
                    <NavItem eventKey={2} href="Contact">
                        Contact Us 
                    </NavItem>
                    </Nav>
                    <Nav pullRight>
                    <NavItem eventKey={1} href="/admin">
                        Admin
                    </NavItem>
                    <NavItem eventKey={2} href="/cart">
                        Your Cart
                        {(this.props.cartItemNumber > 0)?(<Badge className="badge">{this.props.cartItemNumber}</Badge>):('')}
                    </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
export default Menu;