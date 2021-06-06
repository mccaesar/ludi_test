import mongoose from 'mongoose';
import { url } from '../config/db.config';

const db = {};
db.mongoose = mongoose;
db.url = url;
db.resources = require('./resource.model').default.default(mongoose);

export default db;
