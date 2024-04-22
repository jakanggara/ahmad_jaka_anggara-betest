import {connect as connectMongo} from 'mongoose'

const connect = async (mongoURI: string) => {
    try {
        // const mongoURI: string = config.get("mongoURI");
        const db = await connectMongo(mongoURI);
        console.info("Info: MongoDB Connected");
        return db
      } catch (err) {
        console.error((err as Error).message);
        process.exit(1);
      }
}

export default { connect }