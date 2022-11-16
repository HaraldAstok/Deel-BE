const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./model');
const { getProfile } = require('./middleware/getProfile');
const { getContract, getActiveContracts } = require('./contracts/get-contracts');
const { getUnpaidJobs } = require('./jobs/get-unpaid-jobs');
const { updateJobPayment } = require('./jobs/post-update-job-payment');
const { postDeposit } = require('./balance/post-deposit');
const { getBestProfession } = require('./admin/get-best-profession');

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

/**
 * @returns {status: 'success'} when payment succeeds
 */
 app.post('/jobs/:job_id/pay', [getProfile, updateJobPayment]);

/**
 * @returns {status: 'success'} when deposit succeeds
 */
 app.post('/balances/deposit/:userId', [getProfile, postDeposit]);

/**
 * @returns {highestPaidProfession: 'profession'} when profession found
 */
 app.get('/admin/best-profession', getBestProfession);


module.exports = app;
