import mongoose from 'mongoose';
import uri from '../config/db.config.js';
import Resource from './resource.model.js';
import User from './user.model.js';
import Review from './review.model.js'

const db = {
  mongoose,
  uri,
  Resource,
  User,
  Review,
};

export default db;
