import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';
import { loadUser } from './actions/authActions';

class App extends React.Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <AppNavbar />
                    <Container>
                        <ItemModal />
                        <ShoppingList />
                    </Container>
                </div>
            </Provider>
        );
    }
}
export default App;
