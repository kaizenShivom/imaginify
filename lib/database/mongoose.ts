import mongoose,{Mongoose} from "mongoose";
const MONGODB_URL=process.env.MONGODB_URL

interface MongooseConnection{
    conn:Mongoose|null
    promise:Promise<Mongoose>|null
}
declare global{
    // eslint-disable-next-line no-var
    var mongoose:{
        conn:Mongoose|null
        promise:Promise<Mongoose>|null
    }
}

let cached:MongooseConnection=global.mongoose

if(!cached){
    cached=global.mongoose={conn:null,promise:null}
}

export const connectToDatabase=async()=>{
    if(cached.conn){
        return cached.conn
    }
    if(!MONGODB_URL)
        throw new Error('Missing MONGODB_URL')

    cached.promise=cached.promise||mongoose.connect(MONGODB_URL,{
        dbName:'imaginify',
        bufferCommands: false
    })
    cached.conn=await cached.promise;
    return cached.conn
}