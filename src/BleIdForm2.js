import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import BleId from './bleid/BleId';

const bleId = new BleId();

class BleIdForm2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buttonDisabled: false,
            bleState: 'NONE'
        };
    }

    handleClick() {
        console.log('Handle click');
        const {bleState} = this.state;
        if (bleState === 'NONE') {
            this.setState({
                buttonDisabled: true
            });
            
            bleId.simpleAuth('12367',
                (operation, deviceName, erMes) => {
                    if (!erMes) {
                        if (operation === 'DISCOVER') {
                            console.log(`Found device: ${deviceName}`);
                            this.setState(({
                                deviceName: deviceName,
                                bleState: operation
                            }));

                        } else if (operation === 'CONNECT') {
                            console.log(`Connected to device: ${deviceName}`);
                            this.setState(({
                                bleState: operation
                            }));

                        } else if (operation === 'SEND_TOKEN') {
                            console.log(`Sent token to device: ${deviceName}`);
                            this.setState(({
                                bleState: operation
                            }));
                        } else if (operation === 'DISCONNECT') {
                            console.log(`Disconnected from device: ${deviceName}`);
                            this.setState(({
                                deviceName: null,
                                bleState: operation
                            }));
                        } else if (operation === 'SIMPLE_AUTH') {
                            console.log(`Disconnected from device: ${deviceName}`);
                            this.setState(({
                                bleState: 'NONE',
                                buttonDisabled: false
                            }));
                        }

                    } else {

                        console.log('Got error: ' + erMes);
                        this.setState(({
                            buttonDisabled: false,
                            deviceName: null,
                            bleState: 'NONE'
                        }));
                    }

                }
            );
        }
    };





    render() {
        const {bleState, buttonDisabled} = this.state;
        return (
            <div className="container">
                <div className="card-header">
                    {bleState}
                </div>
                <div className="card">
                    <div className="card-body buttonContainer">
                        <button className="btn btn-info btn-lg "
                                onClick={() => this.handleClick()}
                                disabled={buttonDisabled}>
                            Authenticate
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default BleIdForm2;
