import React, {Component} from 'react';
import './App.css';
import BleId from './bleid/BleId';

const bleId = new BleId();

class BleIdForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: false,
            bleState: 'none'
        };

        // This binding is necessary to make `this` work in the callback

    }

    handleClick() {
        console.log('Handle click');
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));

        let bleState = this.state.bleState;
        if (bleState === 'none') {
            bleId.discover(
                (deviceName) => {
                    console.log(`Found device: ${deviceName}`);
                    this.setState(state => ({
                        deviceName: deviceName,
                        bleState: 'discovered'
                    }));
                },
                (erMes) => {
                    console.error(`Error on discover: ${erMes}`)
                });

        } else if (bleState === 'discovered') {
            let deviceName = this.state.deviceName;
            bleId.connect(deviceName,
                (deviceName) => {
                    console.log(`Connected to device: ${deviceName}`);
                    this.setState(state => ({
                        deviceName: deviceName,
                        bleState: 'connected'
                    }));
                },
                (erMes) => {
                    console.error(`Error on connect: ${erMes}`)
                });

        } else if (bleState === 'connected') {
            let userToken = '1234';
            bleId.sendToken(userToken,
                (deviceName) => {
                    console.log(`Sent token to device: ${deviceName}`);
                    this.setState(state => ({
                        deviceName: deviceName,
                        bleState: 'sent'
                    }));
                },
                (erMes) => {
                    console.error(`Error on send: ${erMes}`)
                });


        } else if (bleState === 'sent') {
            bleId.disconnect(
                (deviceName) => {
                    console.log(`Disconnected from device: ${deviceName}`);
                    this.setState(state => ({
                        deviceName: deviceName,
                        bleState: 'none'
                    }));
                },
                (erMes) => {
                    console.error(`Error on disconnect: ${erMes}`)
                });
        }
    };

    getButtonName() {
        let bleState = this.state.bleState;
        if (bleState === 'none') {
            return 'Discover';
        } else if (bleState === 'discovered') {
            return 'Connect';
        } else if (bleState === 'connected') {
            return 'Send user token';
        } else if (bleState === 'sent') {
            return 'Disconnect';
        }
    }


    render() {
        return (
            <div className="App">
                <div>
                    <button onClick={() => this.handleClick()}>
                        {this.getButtonName()}
                    </button>
                </div>
                <div>
                    {this.state.deviceName}
                </div>
            </div>


        );
    }
}

export default BleIdForm;
