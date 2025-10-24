import 'dotenv/config';
import express from "express";
import questionsRouter from "./routes/questions.mjs";
import answersRouter from "./routes/answers.mjs";
import voteRouter from "./routes/vote.mjs";

const app = express();
const port = process.env.PORT || 4001;

app.use(express.json());
app.use("/questions", questionsRouter);
app.use(answersRouter);
app.use(voteRouter);

app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});