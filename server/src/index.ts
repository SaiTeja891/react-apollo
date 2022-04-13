import "dotenv/config";
// console.log("Hello world");
//typescript primitive values
// const one = 1;
// const two = 2;
// const three: boolean = false;
// const four: string = "string";
// const five: null = null;
// const six: undefined = undefined;
// const seven: any = 0;


// console.log(`1 + 2 = ${one + two}`);

// const express = require("express");


//es6 features
import express, {Application} from 'express';
// import bodyParser from 'body-parser';
import {ApolloServer} from 'apollo-server-express';
// import { listings } from './listings';
import {typeDefs,resolvers  } from './graphql';
import { connectDatabase } from './database';
// const app = express();
// const port = 9000;

// const startServer = async () => { await server.start(); server.applyMiddleware({ app, path: "/api" })}
// startServer();
// server.applyMiddleware({app,path: '/api'});

// app.use(bodyParser.json());

//restful apis
// app.get('/',(_req,res) => res.send("Hello World!"));
// app.get('/listings', (_req,res) => {
//     return res.send(listings);
// })

// app.post('/delete-listing', (req,res) => {
//     const id: string = req.body.id;

//     for(let i=0;i< listings.length;i++){
//         if(listings[i].id === id){
//             return res.send(listings.splice(i,1));
//         }
//     }

//     return res.send('failed to delete listing')

// })
const mount = async (app:Application) => {
    const db = await connectDatabase();
const server = new ApolloServer({typeDefs,resolvers, context: () => ({db})});
await server.start();
server.applyMiddleware({app,path: '/api'});
app.listen(process.env.PORT);
console.log(`[app]: http://localhost:${process.env.PORT}`)

const listings = await db.listings.find({}).toArray();
console.log(listings);


}

mount(express());


