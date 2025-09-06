import {Router} from "express";
import connectionPool from "../utils/db.mjs";
import {voteValidation} from "../middlewares/vote.validation.mjs";

const voteRouter = Router();

  voteRouter.post("/questions/:questionId/vote", [voteValidation], async (req, res) => {
    try{
      const questionId = req.params.questionId;
      const vote = req.body.vote

      const question = await connectionPool.query(
        `select * from questions where id = $1`,
        [questionId]
      );

      if (question.rows.length === 0) {
        return res.status(404).json({ message: "Question not found." });
      }
  
      const updatedQuestion = await connectionPool.query(
        `insert into question_votes (question_id, vote) VALUES ($1, $2)`,
        [questionId, vote]);

      return res.status(200).json({
        message: "Vote on the question has been recorded successfully.",
      });
    }catch(error){
      return res.status(500).json({
        message: "Unable to vote question.",
      });
    }
  });
  
  voteRouter.post("/answers/:answerId/vote", [voteValidation], async (req, res) => {
    try{
      const answerId = req.params.answerId;
      const vote = req.body.vote
      
      const answer = await connectionPool.query(
        `select * from answers where id = $1`,
        [answerId]
      );
      if(answer.rows.length === 0){
        return res.status(404).json({message: "Answer not found."});
      }

      const updatedAnswer = await connectionPool.query(
        `insert into answer_votes (answer_id, vote) VALUES ($1, $2)`,
        [answerId, vote]);

      return res.status(200).json({
        message: "Vote on the answer has been recorded successfully.",
      });
    }catch(error){
      return res.status(500).json({
        message: "Unable to vote answer.",
      });
    }
  });

  export default voteRouter;