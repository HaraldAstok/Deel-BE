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

module.exports = { getNonTerminatedContracts };
