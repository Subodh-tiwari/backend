'use strict';

import * as jwt from 'jsonwebtoken'

import {
    Model
} from 'typings';

import {
    Token
} from './constants'

export const getJwt = (data: Model.Jwt): string => {
    return jwt.sing(data, Token)

}

export const isVerified = (token: string): string => {
    try {    
        const data  = jwt.verify(token, Token);
        if(data.expire_at > new Date()){
            return data.phone
        }
    } catch(err) {
        console.log("Error while verifying string")
        return ''
    }
}