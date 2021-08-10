import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert,
} from 'reactstrap';

import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class LoginModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            email: '',
            password: '',
            message: null,
        };
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
    };
    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            if (error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.message.message });
            } else {
                this.setState({ msg: null });
            }
        }
        if (this.state.modal && isAuthenticated) {
            this.toggle();
        }
    }

    toggle() {
        this.props.clearErrors();
        this.setState({ modal: !this.state.modal });
    }
    handleSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;
        const user = { email, password };
        this.props.login(user);
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        return (
            <div>
                <NavLink
                    href="#"
                    // color="dark"
                    // style={{ marginBottom: '2rem' }}
                    onClick={this.toggle}
                >
                    Login
                </NavLink>
                <Modal isOpen={this.state.modal} toggle={this.state.toggle}>
                    <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (
                            <Alert color="danger">{this.state.msg}</Alert>
                        ) : null}
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="email">Email:</Label>
                                <Input
                                    className="mb-3"
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    onChange={this.handleChange}
                                />
                                <Label htmlFor="password">Password:</Label>
                                <Input
                                    className="mb-3"
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="password"
                                    onChange={this.handleChange}
                                />
                                <Button
                                    color="dark"
                                    style={{ marginTop: '2rem' }}
                                >
                                    Login
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
});
export default connect(mapStateToProps, { login, clearErrors })(LoginModal);
