import express from "express";
import cors from "cors";
import morgan from "morgan";
import "./loadEnvironment.mjs";
import routes from "./api_routes/routes.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

// For logging/debugging
app.use(morgan('tiny'));

app.use(cors());
app.use(express.json());
app.use("/routes", routes);
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
 