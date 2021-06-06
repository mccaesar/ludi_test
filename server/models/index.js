/* eslint-disable import/extensions */
import mongoose from 'mongoose';
import url from '../config/db.config.js';
import Resource from './resource.model.js';

const db = {};
db.mongoose = mongoose;
db.url = url;
db.resources = Resource;

export default db;
