const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
	apiKey: process.env.MAILCHIMP_API_KEY,
	server: process.env.MAILCHIMP_DOMAIN_REGION
});

export default async function handle(req, res) {
	let { email } = req.query;

	try {
		const res = await mailchimp.lists.addListMember("5114f468a5", {
			email_address: email,
			status: "subscribed"
		});

		res.json(res);
	} catch (error) {
		console.log(error);

		res.json({ status: false });
	}
}
