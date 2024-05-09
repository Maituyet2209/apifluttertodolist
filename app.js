const express = require("express");
const cors = require("cors");
const body_parser = require("body-parser");
const userRouter = require("./routers/user.router");
const taskRouter = require("./routers/task.router");
const colorRouter = require("./routers/color.router");
const teamRouter = require("./routers/team.router");
const user_teamRouter = require("./routers/user_team.router");
const app = express();

app.use(body_parser.json());
app.use(cors());

app.use("/", userRouter);
app.use("/", taskRouter);
app.use("/", colorRouter);
app.use("/", teamRouter);
app.use("/", user_teamRouter);

module.exports = app;
