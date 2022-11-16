const express = require('express');
const bodyParser = require('body-parser');
const {sequelize} = require('./model')
const {getProfile} = require('./middleware/getProfile')
const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)

/**
 *
 * @returns contract by id
 */
app.get('/contracts/:id',getProfile ,async (req, res) =>{
    const {Contract} = req.app.get('models')
    const {id} = req.params

    const { id: clientId } = req.profile.dataValues;

    const contract = await Contract.findOne({where: {id, clientId}})
    if (!contract) return res.status(404).send({ message: 'no contracts found', status: 404 }).end();

    res.json(contract)
})
module.exports = app;
