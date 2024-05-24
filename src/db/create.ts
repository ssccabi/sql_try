import pg from "pg"

type ConnectionDetails = {
  user: string
  host: string
  port: number
  database?: string
  password: string
}

export async function checkAndCreateDB(connectionDetails: ConnectionDetails) {
  const { Pool } = pg
  const pool = new Pool({ ...connectionDetails })

  try {
    const checkDb = await pool.query(
      "SELECT datname FROM pg_catalog.pg_database WHERE datname = $1",
      [connectionDetails.database]
    )

    console.log("vandb: ", checkDb)

    if (checkDb.rowCount === 0) {
      const createDb = await pool.query("CREATE DATABASE $1", [
        connectionDetails.database,
      ])
      console.log(createDb)
    } else {
      console.log("Database already exists")
    }
  } catch (e) {
    const createDb = await pool.query("CREATE DATABASE $1", [
      connectionDetails.database,
    ])
    console.log("szívás va: ", e)
  } finally {
    return pool.connect()
  }
}
