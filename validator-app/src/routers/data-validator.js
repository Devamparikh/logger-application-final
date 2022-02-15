const amqp = require('amqplib');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user');
const Message = require('../models/message');
const {fetchFromQueue} = require('../services/bussiness-logic')


fetchFromQueue()
