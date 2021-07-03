import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/Comment";
import "./models/Video";
import "./models/User";
import app from "./server.js";

const PORT = process.env.PORT || 4000;
const handleListening = () => {
  console.log(`Listening on http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
