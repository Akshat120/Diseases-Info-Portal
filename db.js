const dotenv = require('dotenv')
dotenv.config()
const { MongoClient } = require('mongodb');
const PORT = 3000
const client = new MongoClient(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  module.exports = client
  const app = require('./app')
  app.listen(PORT,()=>{
      console.log('server started @ 3000')
  })
});