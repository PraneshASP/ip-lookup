const express = require("express");

const geo = require("geoip-lite");

const PORT = process.env.PORT || 5000;

const app = express();

app.set("trust proxy", true);

app.get("/lookup", function (req, res) {
  const ip = req.ip;

  if (!ip)
    return res.status(500).json({
      error: true,
      message: "Sorry, we couldn't extract your IP address at the moment.",
    });

  let details = geo.lookup(ip);

  return res.send({
    country: details.country,
    state: details.region,
    city: details.city,
  });
});

app.listen(PORT, () => {
  console.log("IP Lookup service started!");
});
