const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const { addMovies } = require("./controllers/user");
const stripe = require("stripe")(
  "sk_test_51OynzPSAgwRpikwc86IctcatnOL2gHP6IgPsjc7Ocpp2EPpjI7yYCX2RAwUQYMA2x7tnpWXEwmjl2H77NPpSvQuC00wBMKCdaL"
);
const app = express();
const port = 5000;
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

main().catch((err) => console.log(err));
async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017/NETFLIX");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

app.post("/add", addMovies);

app.post("/api/create-checkout", async (req, res) => {
  const { name,price, totalBill } = req.body;

  // Convert movieData to a single line item for checkout session
  const lineItem = {
    price_data: {
      currency: "usd",
      product_data: {
        name: name
      },
      unit_amount: price * 100 // Convert price to cents
    },
    quantity: 1, // Assuming quantity is always 1 for a single movie in this example
  };

  try {
    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [lineItem], // Convert lineItem to an array
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });
  
    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
