import React, {Component} from 'react';
import './App.css';
import BleIdForm from './BleIdForm';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <BleIdForm/>
                </header>
            </div>
        );
    }
}

export default App;
