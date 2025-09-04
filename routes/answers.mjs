  import {Router} from "express";
  import connectionPool from "../utils/db.mjs";
  import {answersValidation} from "../middlewares/answers.validation.mjs";

  const answersRouter = Router();
  
  answersRouter.post("/questions/:questionId/answers", [answersValidation], async (req, res) => {
    try{
      const questionId = req.params.questionId;
      const content = req.body.content;
      
      await connectionPool.query(
        `insert into answers (question_id, content) VALUES ($1, $2)`,
        [ questionId, 
          content
        ]);

      if(answers.rows.length === 0){
        return res.status(404).json({message: "Question not found."});
      }
  
      return res.status(201).json({
        message: "Answer created successfully.",
      });
    }catch(error){
      return res.status(500).json({
        message: "Unable to create answer.",
      });
    }
  });
  
  answersRouter.get("/questions/:questionId/answers", async (req, res) => {
    try{
      const questionId = req.params.questionId;
      const answers = await connectionPool.query(
        `select * from answers where question_id = $1`,
        [questionId]);

      if(answers.rows.length === 0){
        return res.status(404).json({message: "Question not found."});
      }
      return res.status(200).json({
        data: answers.rows,
      });
    }catch(error){
      return res.status(500).json({
        message: "Unable to fetch answers.",
      });
    }
  });
  
  answersRouter.delete("/questions/:questionId/answers", async (req, res) => {
    try{
      const questionId = req.params.questionId;
      const answers = await connectionPool.query(
        `delete from answers where question_id = $1`,
        [questionId]);

      if(answers.rows.length === 0){
        return res.status(404).json({message: "Question not found."});
      }
      return res.status(200).json({
        message: "All answers for the question have been deleted successfully.",
      });
    }catch(error){
      return res.status(500).json({
        message: "Unable to delete answer.",
      });
    }
  });

  export default answersRouter;