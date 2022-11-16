const { searchBestProfession } = require('../helper/profile-helper');

const getBestProfession = async (req, res) => {
	const { start, end } = req.query;
	if (start === undefined || end === undefined) {
		return res.status(404).send({ message: 'start or end missing from params', status: 404 }).end();
	}

	const results = await searchBestProfession(start, end);
	if (!results) return res.status(404).send({ message: 'no results found', status: 404 }).end();

	const sortedResults = {};
	results.forEach((line) => {
		if (!(line.profession in sortedResults)) {
			sortedResults[line.profession] = line.job_price;
		} else {
			sortedResults[line.profession] = sortedResults[line.profession] + line.job_price;
		}
	});

	const highestPaidProfession = Object.keys(sortedResults).reduce((a, b) =>
		sortedResults[a] > sortedResults[b] ? a : b,
	);
	return res.json({ highestPaidProfession });
};

module.exports = {getBestProfession}
