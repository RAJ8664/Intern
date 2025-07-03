// app/api/razorpay/route.js
import Razorpay from "razorpay";

export async function POST(req) {
	console.log("raj");
	const razorpay = new Razorpay({
		key_id: process.env.RAZORPAY_KEY_ID,
		key_secret: process.env.RAZORPAY_KEY_SECRET,
	});

	const body = await req.json();

	const options = {
		amount: 50000,
		currency: "INR",
		receipt: "order_rcptid_11",
	};

	try {
		const order = await razorpay.orders.create(options);
		return new Response(JSON.stringify(order), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (err) {
		return new Response(JSON.stringify({ error: err.message }), {
			status: 500,
		});
	}
}
