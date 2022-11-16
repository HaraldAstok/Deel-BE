const { findAllUnpaidContracts } = require('../helper/job-helper');
const { getNonTerminatedContracts } = require('../helper/contract-helper')

const getUnpaidJobs = async (req, res) => {
	const { id: clientId } = req.profile.dataValues;
	const contracts = await getNonTerminatedContracts(req, clientId);

	if (!contracts) return res.status(404).send({ message: 'no contracts found', status: 404 }).end();
    const contractIds = contracts.map((contract) => contract.id);
	const jobs = await findAllUnpaidContracts(req, contractIds);

	res.json(jobs);
};


module.exports = { getUnpaidJobs };
