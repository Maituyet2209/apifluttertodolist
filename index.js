const app = require("./app");
const db = require("./config/db");
const UserModel = require("./model/user.model");
const TaskModel = require("./model/task.model");
const SubTaskModel = require("./model/sub_task.model");
const TeamModel = require("./model/team.model");
const UserTeamModel = require("./model/user_team.model");
const ColorModel = require("./model/color.model");

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello world!!!!");
});

app.listen(port, () => {
  console.log(`Server listening on Port http://localhost:${port}`);
});
