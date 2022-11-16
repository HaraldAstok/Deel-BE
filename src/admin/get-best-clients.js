const { searchBestClients } = require('../helper/profile-helper');

const getBestClients = async (req, res) => {
	let { start, end, limit } = req.query;
	limit = limit ? limit : 2;

	const clients = await searchBestClients(start, end, limit);
	if (!clients) return res.status(404).send({ message: 'no clients found', status: 404 }).end();

	const sortedResults = {};
	clients.forEach((line) => {
		const fullName = line.firstName + ' ' + line.lastName;
        
		if (!(fullName in sortedResults)) {
			sortedResults[fullName] = line.price;
		} else {
			sortedResults[fullName] = sortedResults[fullName] + line.price;
		}
	});

	const highestPaidCustomer = Object.keys(sortedResults).reduce((a, b) =>
		sortedResults[a] > sortedResults[b] ? a : b,
	);
	return res.json({ highestPaidCustomer });
};

module.exports = { getBestClients };
