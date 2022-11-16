const { Op } = require("sequelize");

const getContract = async (req, res) => {
	const { Contract } = req.app.get('models');
	const { id } = req.params;

	const { id: clientId } = req.profile.dataValues;
	const contract = await Contract.findOne({ where: { id, clientId } });
	if (!contract) return res.status(404).send({ message: 'no contracts found', status: 404 }).end();
	res.json(contract);
};

const getNonTerminatedContracts = async (req, res) => {
	const { Contract } = req.app.get('models');

	const { id: clientId } = req.profile.dataValues;
	const contracts = await Contract.findAll({
		where: {
            [Op.or]: [
                { clientId },
                { contractorId: clientId }
            ],
			status: {
				[Op.not]: 'terminated',
			},
		},
	});
	if (!contracts) return res.status(404).send({ message: 'no contracts found', status: 404 }).end();
	res.json(contracts);
};

module.exports = {
	getContract,
	getNonTerminatedContracts,
};
