import { promisify } from 'util'
import jwt from 'jsonwebtoken'

const verifyAsync = promisify(jwt.verify)

export default async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]

  if (!token) return res.status(403).json({ status: false, message: 'Login to get token' })

  try {
    await verifyAsync(token, process.env.JWT_SECRET)
    return next()
  } catch (err) {
    return res.status(403).json({ status: false, err: err.message })
  }
}
