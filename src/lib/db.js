import { MongoClient, ServerApiVersion, ObjectId } from "mongodb"

const uri = process.env.MONGODB_URI
if (!uri) {
  console.warn("[LaieslyBird] MONGODB_URI not set — database features will be disabled until configured.")
}

let _client
let _promise

export async function db() {
  if (!uri) {
    throw new Error("MONGODB_URI not set")
  }

  if (!_client) {
    _client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    })
  }
  if (!_promise) {
    _promise = _client.connect()
  }

  const conn = await _promise
  return conn.db("laieslybird")
}

export { ObjectId }
