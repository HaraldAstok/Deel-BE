const { Op } = require('sequelize');
const { getClientContractorContracts } = require('./contract-helper');

async function getJob(req, jobId) {
	const { Job } = req.app.get('models');

	return await Job.findOne({ where: { id: jobId } });
}

async function findAllUnpaidJobs(req, contractIds) {
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

async function getAllClientContractorJobs(req, clientId, contractorId) {
	const contracts = await getClientContractorContracts(req, clientId, contractorId);
	const contractIds = contracts.map((contract) => contract.id);

	return await findAllUnpaidJobs(req, contractIds);
}

module.exports = { getJob, findAllUnpaidJobs, getAllClientContractorJobs };
