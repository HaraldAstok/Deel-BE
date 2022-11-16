const { Op } = require("sequelize");

const {getNonTerminatedContracts} = require('../helper/contract-helper')

const getContract = async (req, res) => {
	const { Contract } = req.app.get('models');
	const { id } = req.params;

	const { id: clientId } = req.profile.dataValues;
	const contract = await Contract.findOne({ where: { id, clientId } });
	if (!contract) return res.status(404).send({ message: 'no contracts found', status: 404 }).end();
	res.json(contract);
};

const getActiveContracts = async (req, res) => {
	const { id: clientId } = req.profile.dataValues;

	const contracts = await getNonTerminatedContracts(req, clientId)
	if (!contracts) return res.status(404).send({ message: 'no contracts found', status: 404 }).end();
	res.json(contracts);
};

module.exports = {
	getContract,
	getActiveContracts,
};
