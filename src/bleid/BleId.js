import StubInterface from './StubInterface'

class BleId {

    simpleAuth(userToken, stateListener) {
        getInterface()
            .simpleAuth(userToken,
                saveAsGlobal(stateListener));
    }

    discover(failureCb, successCb) {
        getInterface()
            .discover(
                saveAsGlobal(successCb),
                saveAsGlobal(failureCb));
    }


    connect(deviceName, failureCb, successCb) {
        getInterface()
            .connect(deviceName,
                saveAsGlobal(successCb),
                saveAsGlobal(failureCb));
    }

    sendToken(userToken, failureCb, successCb) {
        getInterface()
            .sendToken(userToken,
                saveAsGlobal(successCb),
                saveAsGlobal(failureCb));
    }

    disconnect(failureCb, successCb) {
        getInterface()
            .disconnect(
                saveAsGlobal(successCb),
                saveAsGlobal(failureCb));
    }
}

export default BleId;


function getInterface() {
    const query = getQueryParams(document.location.search);
    if (query.source) {
        if (query.source.toLowerCase() === 'android') {
            console.log('using android interface');
            // eslint-disable-next-line no-undef
            return bleid_android;
        } else if (query.source.toLowerCase() === 'ios') {
            console.log('using ios interface');
            // eslint-disable-next-line no-undef
            return bleid_ios;
        }
    }

    console.log('using stub interface, it is for test porpoises only!');
    return new StubInterface();

}

function saveAsGlobal(fun) {
    let i = Math.floor(Math.random() * 100000) + 1;
    let name = "fun_" + i;
    window[name] = fun;
    return name;
}

function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    let params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while ((tokens = re.exec(qs))) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}
