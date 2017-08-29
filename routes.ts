'use strict'

import {
    RouteConfiguration
} from 'hapi'

import * as Joi from 'joi'
import handler from './handler';

const routes: RouteConfiguration[] = [
    {
        method: 'POST',
        path: '/otp',
        handler: handler.createOtp,
        config: {
            validate: {
                payload: {
                    number: Joi.string().required(),
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/verify',
        handler: handler.getVerify,
        config: {
            validate: {
                payload: {
                    phone: Joi.string().required(),
                    opt: Joi.number().required(),
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/register',
        handler: handler.registerUser,
        config: {
            validate: {
                payload: {
                    firstName: Joi.string().required(),
                    lastName: Joi.string().required(),
                    gender: Joi.string().required().default('other'),
                    email: Joi.string().required(),
                    token: Joi.string().required()
                }
            }
        }
    }
]

export default routes
