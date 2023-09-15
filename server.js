const express = require("express");
const { sequelize } = require("./model/model");
const router = require("./routes/routes");
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    console.log("Hello MEVN Soldier");
    res.status(201).json({ message: "working" });
});

app.use("/api", router)

app.listen(PORT, async () => {
    await sequelize.sync()
    console.log(`App is running on ${PORT}`);
});