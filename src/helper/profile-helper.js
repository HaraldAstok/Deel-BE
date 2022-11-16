async function getProfile(req, id){
	const { Profile } = req.app.get('models');
    return await Profile.findOne({ where: {id}})
}

async function updateProfile(req, balance, id) {
	const { Profile } = req.app.get('models');

	await Profile.update({ balance }, { where: { id } });
}

module.exports = { updateProfile, getProfile };
