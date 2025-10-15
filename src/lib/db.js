import { MongoClient, ServerApiVersion, ObjectId } from "mongodb"

const uri = process.env.MONGODB_URI
if (!uri) {
  console.warn("[LaieslyBird] MONGODB_URI not set")
}

let client
let clientPromise

if (!global._laieslybird_mongo) {
  client = new MongoClient(uri || "", {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  })
  global._laieslybird_mongo = client.connect()
}
clientPromise = global._laieslybird_mongo

export async function db() {
  const c = await clientPromise
  return c.db("laieslybird")
}

export { ObjectId }
