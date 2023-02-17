import bcrypt from 'bcrypt'

export const encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

export const isValidPassword = (password, target) => {
    return bcrypt.compareSync(password, target)
}