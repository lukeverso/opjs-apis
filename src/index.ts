import path from 'node:path';
import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';

mongoose.connect('mongodb+srv://lukebase:Z3r0tr3z3@lukebase.bo164c5.mongodb.net/?retryWrites=true&w=majority')
     .then(() => {
          console.log('Conectado ao MongoDB Atlas.');

          const app = express();

          app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

          app.use(express.json());

          app.use(router);

          app.listen(7000, () => {
               console.log('Servidor rodando na porta http://localhost:7000.')
          });
     })
     .catch((err) => {
          console.log('Ocorreu um erro.');
          console.log(err);
     });