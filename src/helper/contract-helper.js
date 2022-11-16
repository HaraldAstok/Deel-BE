const { Op } = require('sequelize');

async function getNonTerminatedContracts(req, clientId) {
	const { Contract } = req.app.get('models');

	return await Contract.findAll({
		where: {
			[Op.or]: [{ clientId }, { contractorId: clientId }],
			status: {
				[Op.not]: 'terminated',
			},
		},
	});
}

async function getClientContractorContracts(req, clientId, contractorId) {
	const { Contract } = req.app.get('models');
	const contracts = await Contract.findAll({
		where: {
			clientId,
            contractorId,
			status: {
				[Op.not]: 'terminated',
			},
		},
	});
	if (!contracts) return res.status(404).send({ message: 'no contracts found', status: 404 }).end();
	return contracts;
}

module.exports = { getNonTerminatedContracts, getClientContractorContracts };
