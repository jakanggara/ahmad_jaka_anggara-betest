import { config } from "dotenv";
import app from "./app";
import database from "./infra/db";
import { connect } from "./infra/redis";

// process.on('exit', () => {
//     redisClient.quit();
//     console.log('Redis connection closed');
// });

// // Handle Ctrl+C signal to close Redis connection
// process.on('SIGINT', () => {
//     redis.quit();
//     console.log('Redis connection closed');
//     process.exit();
// });

(async () => {

    config()
    const port = process.env.PORT || 3000

    const mongoURI = ["mongodb:/", process.env.MONGODB, process.env.DATABASE].join("/")
    await database.connect(mongoURI)
    
    await connect()

    app.listen(port, () => {
        console.log(`== User Microservice: Running (PORT: ${port}) ==`)
    })
})();

