const schema = require('./schema/schema')
const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/terminalDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Se ha conectado correctamente"))
.catch(() => console.log("Database connection failed"))

// Create an express server and a GraphQL endpoint
const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));