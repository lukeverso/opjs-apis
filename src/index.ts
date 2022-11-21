import path from 'node:path';
import http from 'node:http';
import express from 'express';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { router } from './router';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const server = http.createServer(app);
export const io = new Server(server);

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@lukebase.bo164c5.mongodb.net/?retryWrites=true&w=majority`)
     .then(() => {
          console.log('Conectado ao MongoDB Atlas.');
          app.use((req, res, next) => {
               res.header("Access-Control-Allow-Origin", "*");
               res.header("Access-Control-Allow-Methods", "*");
               res.header("Access-Control-Allow-Headers", "*");
               next();
          });
          app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
          app.use(express.json());
          app.use(router);
          server.listen(7000, () => {
               console.log('Servidor rodando na porta http://localhost:7000.');
          });
     })
     .catch((err) => {
          console.log('Ocorreu um erro.');
          console.log(err);
     });