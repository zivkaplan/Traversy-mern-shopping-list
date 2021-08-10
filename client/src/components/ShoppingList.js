import React from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends React.Component {
    constructor(props) {
        super(props);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
    };

    componentDidMount() {
        this.props.getItems();
    }
    handleRemove(e) {
        this.props.deleteItem(e.target.getAttribute('id'));
    }

    handleAdd(e) {
        const name = prompt('enter item:');
        if (name) {
            this.setState((state) => ({
                items: [...state.items, { name }],
            }));
        }
    }
    render() {
        const items = this.props.item.items.map(({ _id, name }) => {
            return (
                <CSSTransition key={_id} timeout={500} classNames="fade">
                    <ListGroupItem>
                        {this.props.isAuthenticated ? (
                            <Button
                                id={_id}
                                className="remove-btn"
                                color="danger"
                                size="sm"
                                onClick={this.handleRemove}
                            >
                                &times;
                            </Button>
                        ) : null}
                        {name}
                    </ListGroupItem>
                </CSSTransition>
            );
        });

        return (
            <div>
                <Container>
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

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
