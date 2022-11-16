const { Op } = require('sequelize');

async function getJob(req, jobId) {
	const { Job } = req.app.get('models');

	return await Job.findOne({ where: { id: jobId } });
}

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

module.exports = { getJob, findAllUnpaidContracts };
