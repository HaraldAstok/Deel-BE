const { getAllClientContractorJobs } = require('../helper/job-helper');
const { getProfile, updateProfile } = require('../helper/profile-helper');

const postDeposit = async (req, res) => {
	const { userId: contractorId } = req.params;
	const { id: clientId } = req.profile.dataValues;

	const clientJobs = await getAllClientContractorJobs(req, clientId, contractorId);
	const jobSum = clientJobs
		.map((job) => job.price)
		.reduce((previousValue, currentValue) => previousValue + currentValue, 0);

	const { balance: clientBalance } = await getProfile(req, clientId);
	const { balance: contractorBalance } = await getProfile(req, contractorId);

	const depositSum = jobSum * 0.25;

	if (depositSum > clientBalance) {
		return res
			.status(400)
			.send({ status: 'FAILURE', message: 'not enough balance to pay 25% deposit', status: 400 })
			.end();
	}
    
	await updateProfile(req, clientBalance - depositSum, clientId);
	await updateProfile(req, contractorBalance + depositSum, contractorId);

	return res.json({ status: 'money deposited' });
};

module.exports = { postDeposit };
