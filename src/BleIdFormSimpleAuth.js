import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import BleId from './bleid/BleId';
import './BleIdForm.css'
import {ReactComponent as Waves} from './waves.svg';

const bleId = new BleId();

class BleIdFormSimpleAuth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buttonDisabled: false,
            bleState: 'NONE',
            deviceName: null
        };
    }

    handleClick() {
        console.log('Handle click');
        const {bleState} = this.state;
        if (bleState === 'NONE') {
            this.setState({
                buttonDisabled: true,
                bleState: 'DISCOVERING'
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
        const {bleState, buttonDisabled, deviceName} = this.state;
        const wavesShown = bleState === 'DISCOVERING';
        return (
            <div className="container">
                <div className="card-header">
                    Authentication Example
                </div>
                <div className="card">
                    <div className="card-body state-container">
                        <div className="waves-wrapper">
                            <Waves className="waves" hidden={!wavesShown}/>
                        </div>
                        <div className="state-text">
                            {bleState}
                            <br/>
                            <span className="device-name">
                                {deviceName}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <button className="round-btn"
                            onClick={() => this.handleClick()}
                            disabled={buttonDisabled}><i className="fa fa-wifi"></i></button>
                </div>
            </div>
        );
    }
}

export default BleIdFormSimpleAuth;
