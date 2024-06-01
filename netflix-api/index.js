const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const { connectToDB } = require("./mongoDB.js");
const routes = require("./Routes/userRoutes.js");
const stripe = require("stripe")(
  "sk_test_51OynzPSAgwRpikwc86IctcatnOL2gHP6IgPsjc7Ocpp2EPpjI7yYCX2RAwUQYMA2x7tnpWXEwmjl2H77NPpSvQuC00wBMKCdaL"
);


const app = express();
const port = 5000;

//Middlewares
app.use(cors({
  origin: ["https://netflix-fronted.vercel.app"],
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api", routes);

// Connect to MongoDB database
connectToDB();

app.post("/api/create-checkout", async (req, res) => {
  const { name, price, totalBill } = req.body;
  const lineItem = {
    price_data: {
      currency: "usd",
      product_data: {
        name: name,
      },
      unit_amount: price * 100,
    },
    quantity: 1, 
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
