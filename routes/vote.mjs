import {Router} from "express";
import connectionPool from "../utils/db.mjs";
import {voteValidation} from "../middlewares/vote.validation.mjs";

const voteRouter = Router();

  voteRouter.post("/questions/:questionId/vote", [voteValidation], async (req, res) => {
    try{
      const questionId = req.params.questionId;
      const vote = req.body.vote
  
      const updatedQuestion = await connectionPool.query(
        `insert into question_votes (question_id, vote) VALUES ($1, $2)`,
        [questionId, vote]);

      if(updatedQuestion.rows.length === 0){
        return res.status(404).json({message: "Question not found."});
      }
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
  
      const updatedAnswer = await connectionPool.query(
        `insert into answer_votes (answer_id, vote) VALUES ($1, $2)`,
        [answerId, vote]);

      if(updatedAnswer.rows.length === 0){
        return res.status(404).json({message: "Answer not found."});
      }
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