const threshold = 2;

var cabObjData = {
    cabNumber: '',
    name: '',
    xCo: '',
    yCo: '',
    availability: true,
    booked: false
}

var riderObjData = {
    name: '',
    xCo: '',
    yCo: '',
}

exports.hello = function (req, res) {
    console.log("HELLO");

    res.set('alert', 'hello.success')
        .status(200)
        .send({
            message: 'Hello'
        });
}

exports.register = async (req, res) => {
    let userType = req.body.userType;
    console.log(req.body);
    console.g
    if (!userType || !userType.trim()) {
        res.set('error', 'userTypeBlank')
            .status(400)
            .send({
                message: 'User type not provided.'
            })
    }

    userType = userType.toUpperCase();
    if (!['RIDER', 'DRIVER'].includes(userType)) {
        res.set('error', 'invalidUserType')
            .status(400)
            .send({
                message: 'Invalid User type.'
            })
    }

    if (userType === 'DRIVER') {
        try {
            let name = req.body.name,
                cabNumber = req.body.cabNumber,
                xCo = req.body.xCo,
                yCo = req.body.yCo,
                availability = true
            booked = false;

            validateRequiredString('name', name);
            name = name.trim();

            validateRequiredString('cabNumber', cabNumber);
            cabNumber = cabNumber.trim();

            cabObjData = {
                name: name,
                cabNumber: cabNumber,
                xCo: Number.parseFloat(xCo),
                yCo: Number.parseFloat(yCo),
                availability: availability,
                booked: booked
            }


            console.log('userRegistered', cabObjData);
            res.set('alert', 'registerSuccess')
                .status(200)
                .send({
                    message: 'Driver registered',
                    Data: cabObjData
                })
            return;
        } catch (ex) {
            console.log("Error", ex);
            res.set('err', 'driverRegisterError')
                .status(500)
                .send({
                    message: 'Internal server error'
                })
            return;
        }
    }

    if (userType === 'RIDER') {
        try {
            let name = req.body.name,
                xCo = req.body.xCo,
                yCo = req.body.yCo;

            validateRequiredString('name', name);
            name = name.trim();

            riderObjData = {
                name: name,
                xCo: Number.parseFloat(xCo),
                yCo: Number.parseFloat(yCo)
            }

            console.log('userRegistered', riderObjData);
            res.set('alert', 'registerSuccess')
                .status(200)
                .send({
                    message: 'Driver registered',
                    Data: riderObjData
                })
            return;
        } catch (ex) {
            console.log("Error", ex);
            res.set('err', 'driverRegisterError')
                .status(500)
                .send({
                    message: 'Internal server error'
                })
            return;
        }
    }

}

exports.findCab = async (req, res) => {

    let x1 = Number.parseFloat(cabObjData.xCo),
        y1 = Number.parseFloat(cabObjData.yCo),
        x2 = Number.parseFloat(riderObjData.xCo),
        y2 = Number.parseFloat(riderObjData.yCo);
    try {

        if (calculateDistance(x1, y1, x2, y2) && !cabObjData.booked) {
            res.set('alert', 'findCabSuccess')
                .status(200)
                .send({
                    message: 'cab found',
                    Data: cabObjData
                })
            return;
        } else {
            res.set('alert', 'findCabSuccess')
                .status(200)
                .send({
                    message: 'no cab found',
                })
            return;
        }


    } catch (ex) {
        console.log("Error", ex);
        res.set('err', 'driverRegisterError')
            .status(500)
            .send({
                message: 'Internal server error'
            })
        return;
    }
}

exports.bookCab = async (req, res) => {

    let x1 = Number.parseFloat(cabObjData.xCo),
        y1 = Number.parseFloat(cabObjData.yCo),
        x2 = Number.parseFloat(riderObjData.xCo),
        y2 = Number.parseFloat(riderObjData.yCo);

    try {

        if (cabObjData.booked == true) {
            res.set('alert', 'bookCabFail')
                .status(400)
                .send({
                    message: 'Cab is already booked by some one.',
                })
            return;
        }
        cabObjData.booked = true;

        if (calculateDistance(x1, y1, x2, y2) && cabObjData.booked) {
            res.set('alert', 'bookCabSuccess')
                .status(200)
                .send({
                    message: 'cab booked',
                    Data: cabObjData
                })
            return;
        } else {
            res.set('alert', 'bookCabFail')
                .status(500)
                .send({
                    message: 'booking failed',
                })
            return;
        }


    } catch (ex) {
        console.log("Error", ex);
        res.set('err', 'bookCabError')
            .status(500)
            .send({
                message: 'Internal server error'
            })
        return;
    }
}



function validateRequiredString(fieldName, value) {
    if (!value || !value.trim()) {
        throw fieldName + '.empty';
    }
}

function calculateDistance(x1, y1, x2, y2) {
    let c1 = x2 - x1,
        c2 = y2 - y1,
        s1 = Math.pow(c1, 2),
        s2 = Math.pow(c2, 2),
        d = s1 + s2,
        distance = Math.sqrt(d);
    console.log(distance);

    if (distance <= threshold) {
        return true;
    } else {
        return false;
    }

}