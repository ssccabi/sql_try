import "dotenv/config"
import express from "express"
import pg from "pg"
import { checkAndCreateDB } from "./db/create"

const app = express()
const port = Number(process.env.DB_PORT) || 3000
const { Pool } = pg

// console.log(pg)
const connectionDetails = {
  user: process.env.DB_USER!,
  host: process.env.DB_HOST!,
  // database: process.env.DB_NAME!,
  password: process.env.DB_PASSWORD!,
  port: port,
}

app.get("/", async (req, res) => {
  try {
    const client = await checkAndCreateDB(connectionDetails)
    console.log(client)
    const result = await client.query("CREATE DATABASE try_sql;")
    console.log(result)
  } catch (e) {
    console.log(e)
  }
  res.send("Hello World!")
})

app.listen(3000, () => {
  console.log(`Example app listening on port ${port}`)
})
