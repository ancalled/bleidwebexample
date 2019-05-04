import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import BleId from './bleid/BleId';

const bleId = new BleId();

class BleIdForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buttonDisabled: false,
            bleState: 'none'
        };
    }

    handleClick() {
        console.log('Handle click');
        this.disableButton();
        const {bleState} = this.state;

        if (bleState === 'none') {
            bleId.discover(
                (erMes) => {
                    console.error(`Error on discover: ${erMes}`);
                    this.enableButton()
                },
                (deviceName) => {
                    console.log(`Found device: ${deviceName}`);
                    this.setState(state => ({
                        deviceName: deviceName,
                        bleState: 'discovered',
                        buttonDisabled: false
                    }));
                }
            );

        } else if (bleState === 'discovered') {
            let deviceName = this.state.deviceName;
            bleId.connect(deviceName,
                (erMes) => {
                    console.error(`Error on connect: ${erMes}`);
                    this.enableButton()
                },
                (deviceName) => {
                    console.log(`Connected to device: ${deviceName}`);
                    this.setState(state => ({
                        deviceName: deviceName,
                        bleState: 'connected',
                        buttonDisabled: false
                    }));
                });

        } else if (bleState === 'connected') {
            let userToken = '1234';
            bleId.sendToken(userToken,
                (erMes) => {
                    console.error(`Error on send: ${erMes}`);
                    this.enableButton()
                },
                (deviceName) => {
                    console.log(`Sent token to device: ${deviceName}`);
                    this.setState(state => ({
                        deviceName: deviceName,
                        bleState: 'sent',
                        buttonDisabled: false
                    }));
                }
            );


        } else if (bleState === 'sent') {
            bleId.disconnect(
                (erMes) => {
                    console.error(`Error on disconnect: ${erMes}`);
                    this.enableButton()
                },
                (deviceName) => {
                    console.log(`Disconnected from device: ${deviceName}`);
                    this.setState(state => ({
                        deviceName: deviceName,
                        bleState: 'none',
                        buttonDisabled: false
                    }));
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

    disableButton() {
        this.setState({
            buttonDisabled: true
        })
    }

    enableButton() {
        this.setState({
            buttonDisabled: false
        })
    }


    render() {
        const {buttonDisabled} = this.state;
        console.log("Button disabled: " + buttonDisabled);
        return (
            <div className="container">
                <div className="card-header">
                    {this.state.deviceName}
                </div>
                <div className="card">
                    <div className="card-body buttonContainer">
                        <button className="btn btn-info btn-lg "
                                onClick={() => this.handleClick()}
                                disabled={buttonDisabled}>
                            {this.getButtonName()}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default BleIdForm;
