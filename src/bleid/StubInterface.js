const deviceNameTemplate = 'TEST_';

class StubInterface {

    constructor() {
        this.deviceName = '';
    }

    simpleAuth(userToken, listenerName) {
        console.log('simpleAuth');
        sleep(randomTimeout(3000, 5000)).then(() => {

            if (!randomFailure(10)) {
                this.deviceName = deviceNameTemplate + randomId();
                getListener(listenerName)('DISCOVER', this.deviceName, null);

                sleep(randomTimeout(500, 1000)).then(() => {
                    if (!randomFailure(10)) {
                        this.deviceName = deviceNameTemplate + randomId();
                        getListener(listenerName)('CONNECT', this.deviceName, null);

                        sleep(randomTimeout(500, 100)).then(() => {
                            if (!randomFailure(10)) {
                                this.deviceName = deviceNameTemplate + randomId();
                                getListener(listenerName)('SEND_TOKEN', this.deviceName, null);

                                sleep(randomTimeout(500, 1000)).then(() => {
                                    if (!randomFailure(10)) {
                                        this.deviceName = deviceNameTemplate + randomId();
                                        getListener(listenerName)('DISCONNECT', this.deviceName, null);

                                        sleep(randomTimeout(500, 1000)).then(() => {
                                            if (!randomFailure(10)) {
                                                this.deviceName = deviceNameTemplate + randomId();
                                                getListener(listenerName)('SIMPLE_AUTH', this.deviceName, null);
                                            } else {
                                                getListener(listenerName)('SIMPLE_AUTH', null, 'Some error');
                                            }
                                        });
                                    } else {
                                        getListener(listenerName)('DISCONNECT', null, 'Some error');
                                    }
                                });

                            } else {
                                getListener(listenerName)('SEND_TOKEN', null, 'Some error');
                            }
                        });

                    } else {
                        getListener(listenerName)('CONNECT', null, 'Some error');
                    }
                });
            } else {
                getListener(listenerName)('DISCOVER', null, 'Some error');
            }
        });

    }


    discover(successCbName, failureCbName) {
        console.log('StubInterface: discover called');
        sleep(randomTimeout(2000, 3000)).then(() => {
            if (!randomFailure(10)) {
                this.deviceName = deviceNameTemplate + randomId();
                window[successCbName](this.deviceName);
            } else {
                window[failureCbName]('Some error');
            }
        });
    }

    connect(deviceName, successCbName, failureCbName) {
        console.log(`StubInterface: connect called, deviceName: ${deviceName}`);
        sleep(randomTimeout(1500, 2200)).then(() => {
            if (!randomFailure(10)) {
                window[successCbName](this.deviceName);
            } else {
                window[failureCbName]('Some error');
            }
        });
    }

    sendToken(userToken, successCbName, failureCbName) {
        console.log(`StubInterface: sendToken called, token: ${userToken}`);
        sleep(randomTimeout(2000, 3000)).then(() => {
            if (!randomFailure(10)) {
                window[successCbName](this.deviceName);
            } else {
                window[failureCbName]('Some error');
            }
        });
    }

    disconnect(successCbName, failureCbName) {
        console.log('StubInterface: disconnect called');
        sleep(randomTimeout(1400, 2900)).then(() => {
            if (!randomFailure(10)) {
                window[successCbName](this.deviceName);
            } else {
                window[failureCbName]('Some error');
            }
        });
        this.deviceName = ''
    }
}

export default StubInterface;

function getListener(name) {
    return window[name];
}

function randomTimeout(from, to) {
    return Math.floor(Math.random() * (to - from)) + from + 1;
}

function randomId() {
    return Math.floor(Math.random() * 10) + 1;
}

function randomFailure(n) {
    let i = Math.floor(Math.random() * n) + 1;
    return i === 1;
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

