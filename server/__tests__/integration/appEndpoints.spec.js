require('dotenv').config()

const request = require('supertest')
const app = require('../../app')
const { resetTestDB } = require('../../database/testConnect')  