const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./model');
const { getProfile } = require('./middleware/getProfile');
const { getContract, getActiveContracts } = require('./contracts/get-contracts');
const { getUnpaidJobs } = require('./jobs/get-unpaid-jobs');

const app = express();

app.use(bodyParser.json());
app.set('sequelize', sequelize);
app.set('models', sequelize.models);

/**
 * @returns contract by id
 */
 app.get('/contracts/:id', [getProfile, getContract]);

/**
 * @returns all non terminated contracts
 */
 app.get('/contracts', [getProfile, getActiveContracts]);

 /**
 * @returns all unpaid contracts
 */
app.get('/jobs/unpaid', [getProfile, getUnpaidJobs]);

module.exports = app;
