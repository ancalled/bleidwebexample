const deviceNameTemplate = 'TEST_';

class StubInterface {

    constructor() {
        this.deviceName = '';
    }

    discover(successCbName, failureCbName) {
        console.log('StubInterface: discover called');
        sleep(randomTimeout(1000, 2000)).then(() => {
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
        sleep(randomTimeout(500, 1200)).then(() => {
            if (!randomFailure(10)) {
                window[successCbName](this.deviceName);
            } else {
                window[failureCbName]('Some error');
            }
        });
    }

    sendToken(userToken, successCbName, failureCbName) {
        console.log(`StubInterface: sendToken called, token: ${userToken}`);
        sleep(randomTimeout(1000, 2000)).then(() => {
            if (!randomFailure(10)) {
                window[successCbName](this.deviceName);
            } else {
                window[failureCbName]('Some error');
            }
        });
    }

    disconnect(successCbName, failureCbName) {
        console.log('StubInterface: disconnect called');
        sleep(randomTimeout(400, 900)).then(() => {
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

