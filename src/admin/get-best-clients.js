const { searchBestClients } = require('../helper/profile-helper');

const getBestClients = async (req, res) => {
	let { start, end, limit } = req.query;
	limit = limit ? limit : 2;

	const clients = await searchBestClients(start, end, limit);
	if (!clients) return res.status(404).send({ message: 'no clients found', status: 404 }).end();

	const sortedResults = {};
	clients.forEach((line) => {
		const fullName = line.fullName;

		if (!(fullName in sortedResults)) {
			sortedResults[fullName] = line.price;
		} else {
			sortedResults[fullName] = sortedResults[fullName] + line.price;
		}
	});

	let highestPaidclients = Object.keys(sortedResults).slice(0, limit);

	let result = clients.filter((client) => {
		return highestPaidclients.includes(client.fullName);
	});

	const filteredResults = result.reduce((acc, current) => {
		const x = acc.find((item) => item.id === current.id);
		if (!x) {
			return acc.concat([current]);
		} else {
			return acc;
		}
	}, []);
	return res.json(filteredResults);
};

module.exports = { getBestClients };
