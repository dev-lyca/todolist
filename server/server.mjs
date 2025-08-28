import cors from "cors";
import express from "express";

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 8080;

app.get("/api/home", (req, response) => {
  response.json({ msg: "Hello world" });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
