import mongoose from 'mongoose';
import url from '../config/db.config.js';
import Resource from './resource.model.js';
import User from './user.model.js';

const db = {
  mongoose,
  url,
  Resource,
  User,
};

export default db;
