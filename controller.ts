"use strict";

import {
    User,
    Users,
    Otp,
    Otps
} from './models'

import * as Bluebird from 'bluebird'

import {
    Model
} from 'typings';

const controller = {
    createOtp(data: Model.Otp): Bluebird<boolean> {
        return new Otp (data)
        .save()
        .then(data => true)
        .catch(err => {
            console.log("Error while inserting :", err)
            return false
        })
    },

    getVerify(data: Model.Otp): Bluebird<Model.Otp> {
        return Otps
        .query(qb => qb.where('number', '=', data.number).andWhere('otp', '=', data.otp).orderBy('created_at', 'desc'))
        .fetch()
        .then(data => data.toJSON())
        .then(data => data[0])
        .catch(err => {
            console.log("Err while fetching user : ", err)
            return {}
        })
    },

    getUser(phone: string): Bluebird<Model.User> {
        return Users
        .query(qb => qb.where('phone', '=', phone))
        .fetch()
        .then(data => data.toJSON())
        .then(data => data[0])
        .catch(err => {
            console.log("Error while fetching user info : ", err)
            return {}
        })
    },

    registerUser(data: Model.User): Bluebird<boolean> {
        return new User (data)
        .save()
        .then(data => true)
        .catch(err => {
            console.log("Error while inserting :", err)
            return false
        })
    }
}

export default controller
