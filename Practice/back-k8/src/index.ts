import pg from 'pg'
import { createServer } from 'node:http'

const hostname = process.env.SERVER_HOST ?? 'localhost'
const port = process.env.SERVER_PORT ?? 3000

const { Client } = pg
const client = new Client({
  user: process.env.PG_USER ?? 'docker',
  password: process.env.PG_PASS ?? 'docker',
  host: process.env.PG_HOST ?? 'localhost',
  port: Number(process.env.PG_PORT) ?? 5432,
  database: process.env.PG_DB_NAME ?? 'docker',
})
await client.connect()

const createTable = await client.query(
  'create table if not exists counter (count int default 0 unique)'
)

if (createTable.rowCount === 0) {
  await client.query('insert into counter (count) values (0)')
}

async function getCounter() {
  const res = await client.query('select count from counter')
  return res.rows[0].count
}

async function increaseCount() {
  await client.query('update counter set count = count + 1')
}

const server = createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Request-Method', '*')
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET')
  res.setHeader('Access-Control-Allow-Headers', '*')

  const url = req.url

  if (url === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' })

    try {
      await increaseCount()
      const result = await getCounter()
      res.write(JSON.stringify(result))
    } catch (error) {
      console.error(error)
      res.write('Error')
    }

    res.end()
  }
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
