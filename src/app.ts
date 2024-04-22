import express from "express";
import router from "./routes";
import MiddlewareAuth from "./middleware/auth";

const app = express()

// app.use()
app.use(express.json())

app.use(router)

export default app
