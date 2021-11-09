export class User {
    id: number
    username: string
    password: string
    gender: string
    birth: string
    phone: string

    constructor() {
        this.id = 0
        this.username = null
        this.password = null
        this.gender = null
        this.birth = null
        this.phone = null
    }

    setId(id: number) {
        this.id = id
    }

    setUsername(username: string) {
        this.username = username
    }

    setPassword(password: string) {
        this.password = password
    }

    setGender(gender: string) {
        this.gender = gender
    }

    setBirth(birth: string) {
        this.birth = birth
    }

    setPhone(phone: string) {
        this.phone = phone
    }

    getId(): number {
        return this.id
    }

    getUsername(): string {
        return this.username
    }

    getPassword(): string {
        return this.password
    }

    getGender(): string {
        return this.gender
    }

    getBirth(): string {
        return this.birth
    }

    getPhone(): string {
        return this.phone
    }
}
