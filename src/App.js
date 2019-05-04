import React, {Component} from 'react';
import './App.css';
import BleIdForm from './BleIdForm';
import BleIdFormSimpleAuth from './BleIdFormSimpleAuth';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <BleIdFormSimpleAuth/>
                </header>
            </div>
        );
    }
}

export default App;
