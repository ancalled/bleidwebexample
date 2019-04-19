import StubInterface from './StubInterface'

class BleId {

    discover(successCb, failureCb) {
        getInterface()
            .discover(
                saveAsGlobal(successCb),
                saveAsGlobal(failureCb));
    }


    connect(deviceName, successCb, failureCb) {
        getInterface()
            .connect(deviceName,
                saveAsGlobal(successCb),
                saveAsGlobal(failureCb));
    }

    sendToken(userToken, successCb, failureCb) {
        getInterface()
            .sendToken(userToken,
                saveAsGlobal(successCb),
                saveAsGlobal(failureCb));
    }

    disconnect(successCb, failureCb) {
        getInterface()
            .disconnect(
                saveAsGlobal(successCb),
                saveAsGlobal(failureCb));
    }
}

export default BleId;


function getInterface() {
    // return bleid_Android;
    return new StubInterface();
}

function saveAsGlobal(fun) {
    let i = Math.floor(Math.random() * 100000) + 1;
    let name = "fun_" + i;
    window[name] = fun;
    // console.log(`Function stored as global: ${name}`);
    return name;
}