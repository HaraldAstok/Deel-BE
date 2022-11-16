async function checkMissingParams(req, res, next) {
	const { start, end } = req.query;

	if (start === undefined || end === undefined) {
		return res.status(404).send({ message: 'start or end missing from params', status: 404 }).end();
	}
	next();
}

module.exports = { checkMissingParams };
