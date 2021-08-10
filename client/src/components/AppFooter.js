import React, { Fragment } from 'react';
import { Navbar, Container, NavbarText } from 'reactstrap';

class AppFooter extends React.Component {
    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="footer">
                    <Container>
                        <NavbarText href="#">© Ziv Kaplan 2021</NavbarText>
                    </Container>
                </Navbar>
            </div>
        );
    }
}
export default AppFooter;
