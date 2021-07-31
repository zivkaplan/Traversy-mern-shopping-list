import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import store from './store';
import { Provider } from 'react-redux';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';
function App() {
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

export default App;
