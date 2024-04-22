import { config } from 'dotenv'
import db from '../src/infra/db'

(async () => {
    config()
    const mongoURI = ["mongodb:/", process.env.MONGODB, process.env.DATABASE].join("/")
    await db.connect(mongoURI)
})()

import './auth.test'
import './user.test'

