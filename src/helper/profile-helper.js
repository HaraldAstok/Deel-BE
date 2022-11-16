async function updateProfile(req, balance, id) {
	const { Profile } = req.app.get('models');

	await Profile.update({ balance }, { where: { id } });
}

module.exports = { updateProfile };
