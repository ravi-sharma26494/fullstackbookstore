const jwt = require('jsonwebtoken')
const Login = require('../models/login')
const keysecret = 'fadfadfadfadafad'

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization

    const verifytoken = jwt.verify(token, keysecret)

    const rootUser = await Login.findOne({ _id: verifytoken._id })

    if (!rootUser) {
      throw new Error('user not found')
    }

    req.token = token
    req.rootUser = rootUser
    req.userId = rootUser._id

    next()
  } catch (error) {
    res
      .status(401)
      .json({ status: 401, message: 'Unauthorized no token provide' })
  }
}

module.exports = authenticate
