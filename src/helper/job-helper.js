const { Op } = require('sequelize');

async function findAllUnpaidContracts(req, contractIds) {
	const { Job } = req.app.get('models');

	return await Job.findAll({
		where: {
			ContractId: { [Op.or]: [contractIds] },
			paid: {
				[Op.not]: true,
			},
		},
	});
}

module.exports = { findAllUnpaidContracts };
