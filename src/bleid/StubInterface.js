class StubInterface {

    async discover(successCbName, failureCbName) {
        console.log('StubInterface: discover called');
        await sleep(2000);
        getGlobal(successCbName)('JAALE_1');
    }

    async connect(successCbName, failureCbName) {
        console.log('StubInterface: connect called');
        await sleep(1000);
        getGlobal(successCbName)('JAALE_1');
    }

    async sendToken(successCbName, failureCbName) {
        console.log('StubInterface: sendToken called');
        await sleep(3000);
        getGlobal(successCbName)('JAALE_1');
    }

    async disconnect(successCbName, failureCbName) {
        console.log('StubInterface: disconnect called');
        await sleep(1000);
        getGlobal(successCbName)('JAALE_1');
    }
}

export default StubInterface;



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getGlobal(fctNam) {
    return window[fctNam];
}