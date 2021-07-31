import React from 'react';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';

class ItemModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            name: '',
        };
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    toggle() {
        this.setState({ modal: !this.state.modal });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.addItem({ name: this.state.name });
        this.toggle();
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        return (
            <div>
                <Button
                    color="dark"
                    style={{ marginBottom: '2rem' }}
                    onClick={this.toggle}
                >
                    Add Item
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.state.toggle}>
                    <ModalHeader toggle={this.toggle}>Add To Cart</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="item">Item</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="item"
                                    placeholder="Add item"
                                    onChange={this.handleChange}
                                />
                                <Button
                                    color="dark"
                                    style={{ marginTop: '2rem' }}
                                >
                                    Add Item
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({ item: state.item });
export default connect(mapStateToProps, { addItem })(ItemModal);
