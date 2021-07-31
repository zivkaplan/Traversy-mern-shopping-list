import React from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';

export default class ShoppingList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                {
                    id: uuidv4(),
                    name: 'Eggs',
                },
                {
                    id: uuidv4(),
                    name: 'Milk',
                },
                {
                    id: uuidv4(),
                    name: 'Soda',
                },
                {
                    id: uuidv4(),
                    name: 'Butter',
                },
            ],
        };
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
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
        const items = this.state.items.map(({ id, name }) => {
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
