declare module 'typings' {
    namespace Model {
        interface Otp {
            phone: string
            otp: number
            created_at ?: Date
        }

        interface User {
            firstName: string
            lastName: string
            gender: string
            email: string
            phone: string
            created_at ?: Date
            updated_at ?: Date
        }

        interface Jwt {
            name?: string
            gender?: string
            phone: string
            expire_at: Date
        }
    }
}
