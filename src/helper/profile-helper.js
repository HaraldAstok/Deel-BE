const { sequelize } = require('../model');

async function searchBestClients(start, end, limit) {
	const [results] = await sequelize.query(
		'SELECT firstName, lastName, price ' +
			'FROM Profiles AS Profile ' +
			'JOIN Contracts AS Contract ON ClientId = Profile.id ' +
			'JOIN Jobs AS Job ON ContractId = Contract.id ' +
			"WHERE type = 'client' " +
			"AND Job.paymentDate BETWEEN '" +
			start +
			"' AND '" +
			end +
			"' " +
			'LIMIT ' +
			limit,
	);
	return results;
}

async function searchBestProfession(start, end) {
	const [results] = await sequelize.query(
		'SELECT price AS job_price, profession ' +
			'FROM Jobs AS Job ' +
			'JOIN Contracts AS Contract ON ContractId = Contract.id ' +
			'JOIN Profiles AS Profile ON Contract.id = Profile.id ' +
			"WHERE Job.paymentDate BETWEEN '" +
			start +
			"' AND '" +
			end +
			"' ",
	);
	return results;
}

async function getProfile(req, id) {
	const { Profile } = req.app.get('models');
	return await Profile.findOne({ where: { id } });
}

async function updateProfile(req, balance, id) {
	const { Profile } = req.app.get('models');

	await Profile.update({ balance }, { where: { id } });
}

module.exports = { updateProfile, getProfile, searchBestProfession, searchBestClients };
