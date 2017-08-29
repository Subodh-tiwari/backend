'use strict';

import controller from './controller'

import {
    Request,
    ReplyNoContinue
} from 'hapi'

import {
    Model
} from 'typings';

import {
    getJwt,
    isVerified
} from './utils'

const twilio = require('twilio');

const handler = {
    createOtp(request: Request, reply: ReplyNoContinue) {

        const phone = request.payload.number;

        reply()

        const otp = Math.floor(Math.random() * 89999 + 10000);

        const accountSid = 'AC16cbe0fcf1a9a16f394ef7a930c9e2f4';
        const authToken = 'a9ec1df32c56415279a02dee062ce1c2';

        const client = new twilio(accountSid, authToken);

        client.messages.create({
            body: `Dear user, this is your OTP ${otp}.`,
            to: phone,  // Text this number
            from: '+16193691964' // From a valid Twilio number
        })
            .then((message) => console.log(message.sid));

        const value: Model.Otp = {
            phone,
            otp,
            created_at: new Date(),
        }

        controller.createOtp(value)
            .then((data) => console.log(`Result data : ${data}`))
            .catch((err) => {
                throw err
            })
    },

    async getVerify(request: Request, reply: ReplyNoContinue) {
        const otp = request.payload.otp;
        const phone = request.payload.number;
        let token: string

        const dateTime = new Date();
        dateTime.setMinutes(dateTime.getMinutes() - 5)

        const data: Model.Otp = {
            phone,
            otp
        }

        console.log(`${otp}, ${phone}`);

        const user = await controller.getUser(phone);

        const expire_at = new Date();
        expire_at.setHours(expire_at.getHours() + 1)

        token = getJwt({
            phone,
            gender: user ? user.gender : '' ,
            name: user ? `${user.firstName} '${user.lastName}` : '',
            expire_at
        })


        controller.getVerify(data)
            .then(data => {
                if (data && data.created_at > dateTime) {
                    reply(token)
                } else {
                    reply().code(401)
                }
            })
    },

    registerUser(request: Request, reply: ReplyNoContinue) {

        const firstName = request.payload.firstName;
        const lastName = request.payload.lastName;
        const gender = request.payload.gender;
        const email = request.payload.email;
        const token = request.payload.token;
        const phone = isVerified(token)

        if (!phone) {
            reply().code(401)
            return
        }

        const data = {
            firstName,
            lastName,
            gender,
            email,
            phone
        }

        console.log(`${email}, ${firstName}, ${lastName}`);
        controller.registerUser(data)
            .then((data) => console.log(`Result data : ${data}`))
            .catch((err) => {
                throw err;
            })
    }

}

export default handler
