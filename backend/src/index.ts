import express from "express";
import cors from "cors";
import { routes } from "./api/routes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
routes(app);

const PORT = 3080;
app.listen(PORT, () => {
  console.log(`>>>>> Server has started on port: ${PORT}`);
});
