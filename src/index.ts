import config from "./config";
import app from "./server";
import dotenv from "dotenv";

dotenv.config();

const PORT = config.port;

app.listen(PORT, () => {
  console.log("Server is running : http://localhost:"+PORT);
});
