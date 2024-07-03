import express from 'express';
import session from 'express-session';
import SequelizeStore from 'connect-session-sequelize';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import sequelize from './config/database.js';
import User from './models/User.js';
import Opinion from './models/opinion.js';
import dotenv from 'dotenv';
import argon2 from 'argon2';

dotenv.config();
// Log environment variables to verify they're set
console.log('Admin email:', process.env.ADMIN_EMAIL);
console.log('Cookie secret:', process.env.COOKIE_SECRET);
console.log('Session secret:', process.env.SESSION_SECRET);

AdminJS.registerAdapter(AdminJSSequelize);

const adminOptions = {
  databases: [sequelize],
  rootPath: '/admin',
  loginPath: '/admin/login',
  logoutPath: '/admin/logout',
  resources: [
    {
      resource: User,
      options: {
        properties: {
          password: {
            isVisible: { list: false, filter: false, show: true, edit: true },
          },
          encryptedPassword: {
            type: 'string',
            isVisible: { list: false, edit: true, filter: false, show: true },
          },
          points: {
            type: 'number',
            isVisible: { list: true, filter: true, show: true, edit: true },
          },
        },
        actions: {
          new: {
            isVisible: true,
            before: async (request) => {
              console.log('Creating new user:', request.payload);
              if (request.payload.password) {
                const hashedPassword = await argon2.hash(request.payload.password);
                request.payload.encryptedPassword = hashedPassword;
                request.payload.password = undefined;
              }
              console.log('Processed new user:', request.payload);
              return request;
            },
          },
          edit: {
            before: async (request) => {
              console.log('Editing user:', request.payload);
              if (request.payload.password) {
                const hashedPassword = await argon2.hash(request.payload.password);
                request.payload.encryptedPassword = hashedPassword;
                request.payload.password = undefined;
              }
              console.log('Processed edit user:', request.payload);
              return request;
            },
          },
        },
      },
    },
    {
      resource: Opinion,
      options: {
        properties: {
          message: {
            type: 'richtext',
          },
        },
      },
    },
  ],
};

const adminJs = new AdminJS(adminOptions);

// const SequelizeSessionStore = SequelizeStore(session.Store);
// const sessionStore = new SequelizeSessionStore({
//   db: sequelize,
// });

// const sessionOptions = {
//   store: sessionStore,
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: true }, // Ensure cookies are sent over HTTPS
// };

// const authenticate = async (email, password) => {
//   console.log('Attempting login with email:', email);
//   if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
//     console.log('Correct credentials');
//     return { email: process.env.ADMIN_EMAIL };
//   }
//   console.log('Incorrect credentials');
//   return null;
// };

const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
  authenticate: async (email, password) => {
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        return { email: process.env.ADMIN_EMAIL };
      }
      return null;
    },
    cookiePassword:process.env.COOKIE_SECRET,
});

// const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
//   authenticate,
//   cookiePassword: process.env.COOKIE_SECRET,
// }, null, sessionOptions);

// sessionStore.sync()
//   .then(() => console.log('Session store synced successfully'))
//   .catch((error) => console.error('Failed to sync session store:', error));

export { adminJs, router };
