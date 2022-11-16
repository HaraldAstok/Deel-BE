async function getContractorByContractId(req, contractId) {
	const { Contract } = req.app.get('models');
	const { Profile } = req.app.get('models');

	const contract = await Contract.findOne({ where: { id: contractId } });
	return await Profile.findOne({ where: { id: contract.ContractorId } });
}

module.exports = { getContractorByContractId };
