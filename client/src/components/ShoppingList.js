import React from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends React.Component {
    constructor(props) {
        super(props);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }
    componentDidMount() {
        this.props.getItems();
    }
    handleRemove(e) {
        const id = e.target.getAttribute('id');
        this.setState((state) => ({
            items: state.items.filter((item) => item.id !== id),
        }));
    }

    handleAdd(e) {
        const name = prompt('enter item:');
        if (name) {
            this.setState((state) => ({
                items: [...state.items, { id: uuidv4(), name }],
            }));
        }
    }
    render() {
        const items = this.props.item.items.map(({ id, name }) => {
            return (
                <CSSTransition key={id} timeout={500} classNames="fade">
                    <ListGroupItem>
                        <Button
                            id={id}
                            className="remove-btn"
                            color="danger"
                            size="sm"
                            onClick={this.handleRemove}
                        >
                            &times;
                        </Button>
                        {name}
                    </ListGroupItem>
                </CSSTransition>
            );
        });

        return (
            <div>
                <Container>
                    <Button
                        color="dark"
                        style={{ marginBottom: '2rem' }}
                        onClick={this.handleAdd}
                    >
                        Add Item
                    </Button>
                    <ListGroup>
                        <TransitionGroup className="shopping-list">
                            {items}
                        </TransitionGroup>
                    </ListGroup>
                </Container>
            </div>
        );
    }
}

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    item: state.item,
});

export default connect(mapStateToProps, { getItems })(ShoppingList);
