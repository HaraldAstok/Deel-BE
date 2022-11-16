const { getJob } = require('../helper/job-helper');
const { getContractorByContractId } = require('../helper/contractor-helper');
const { updateProfile } = require('../helper/profile-helper');



const updateJobPayment = async (req, res) => {
	const { id: clientId, balance: clientBalance } = req.profile.dataValues;
	const { job_id: jobId } = req.params;
	const { price: jobPrice, ContractId: contractId, paid: isPaid } = await getJob(req, jobId);

	if (isPaid) {
		return res.status(400).send({ status: 'FAILURE', message: 'job is already paid', status: 400 }).end();
	}
	if (clientBalance < jobPrice)
		return res
			.status(400)
			.send({ status: 'FAILURE', message: 'not enough funds in the balance', status: 400 })
			.end();

	const { id: contractorId, balance: contractorBalance } = await getContractorByContractId(req, contractId);

	await updateProfile(req, clientBalance - jobPrice, clientId);
	await updateProfile(req, contractorBalance + jobPrice, contractorId);

	return res.json({ status: 'success' });
};

module.exports = { updateJobPayment };
