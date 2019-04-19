import React, {Component} from 'react';
import './App.css';
import BleId from './bleid/BleId';

const bleId = new BleId();

class BleIdForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };

        // This binding is necessary to make `this` work in the callback

    }

    handleClick() {
        console.log('Handle click');
        // this.setState(state => ({
        //     isToggleOn: !state.isToggleOn
        // }));

        bleId.discover((deviceName) => {
            console.log(`Found device: ${deviceName}`);
            // this.setState(state => ({
            //     deviceName: deviceName
            // }));
        }, (erMes) => {
            console.error(`Error on discover: ${erMes}`)
        })
    };


    render() {
        return (
            <div className="App">
                <button onClick={() => this.handleClick()}>
                    Discover
                </button>
            </div>
        );
    }
}

export default BleIdForm;
