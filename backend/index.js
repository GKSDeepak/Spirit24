import express from 'express';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import session from 'express-session';
import MySQLStore from 'express-mysql-session';
import sequelize from './config/database.js';
import { adminJs, router as adminRouter } from './admin.js';
import profileRoute from './routes/profileRoute.js';
import signRoute from './routes/signUpRoute.js';
import userRoutes from './routes/userRoutes.js';
import loginRoute from './routes/loginRoute.js';
import opinionRoute from './routes/opinionRoute.js'


dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(express.json());
const corsOptions = {
  origin: ['https://spiritiitg.in'
  ],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Configure the MySQL session store
// console.log('Initializing session store...');
// const sessionStore = new MySQLStore({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// // Log success or failure of session store creation
// sessionStore.on('connection', () => {
//   console.log('Session store connected successfully.');
// }).on('error', (error) => {
//   console.error('Failed to connect to session store:', error);
// });

// Log session store sync result


// app.use(session({
//   secret: process.env.SESSION_SECRET, 
//   resave: false, 
//   saveUninitialized: false, 
//   store: sessionStore, 
//   cookie: {
//     secure: true, 
//     httpOnly: true,
//     maxAge: 3600000, 
//   },
// }));

app.use('/api', userRoutes);
app.use('/signup', signRoute);
app.use('/login', loginRoute);
app.use("/opinion",opinionRoute);
app.use(adminJs.options.rootPath, adminRouter);

app.get('/', (req, res) => {
  res.send('Backend is running');
});

server.listen(process.env.PORT, async () => {
  console.log(`Server running on port ${process.env.PORT}`);
  console.log(`AdminJS running on http://localhost:${process.env.PORT}${adminJs.options.rootPath}`);
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
