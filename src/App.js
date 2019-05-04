import React, {Component} from 'react';
import './App.css';
import BleIdForm from './BleIdForm';
import BleIdForm2 from './BleIdForm2';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <BleIdForm2/>
                </header>
            </div>
        );
    }
}

export default App;
