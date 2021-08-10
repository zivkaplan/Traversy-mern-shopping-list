import React, { Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    NavbarText,
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';
import LoginModal from './auth/LoginModal';

class AppNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false };
        this.toggle = this.toggle.bind(this);
    }
    static propTypes = {
        auth: PropTypes.object.isRequired,
    };

    toggle() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;
        const authLinks = (
            <Fragment>
                <NavbarText>
                    <strong>{user ? `Welcome, ${user.name}` : null}</strong>
                </NavbarText>
                <NavItem>
                    <Logout />
                </NavItem>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal />
                </NavItem>
                <NavItem>
                    <LoginModal />
                </NavItem>
            </Fragment>
        );
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">MERN Shopping List</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ms-auto" navbar>
                                {isAuthenticated ? authLinks : guestLinks}
                                <NavItem>
                                    <NavLink href="https://github.com/zivkaplan/Traversy-mern-shopping-list">
                                        Github Repo
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({ auth: state.auth });
export default connect(mapStateToProps, null)(AppNavbar);
