 import {Router} from "express";
 import connectionPool from "../utils/db.mjs";
 import {questionValidation} from "../middlewares/question.validation.mjs";

 const questionsRouter = Router();
 
  questionsRouter.post("/", [questionValidation], async (req, res) => {
    try{
      const newQuestion = req.body;
      await connectionPool.query(
        `insert into questions (title, description, category) 
        VALUES ($1, $2, $3)`, 
        [ newQuestion.title, 
          newQuestion.description, 
          newQuestion.category]);
      
      return res.status(201).json({message: "Question created successfully"});
    }catch(error){
      return res.status(500).json({message: "Unable to create question."});
    }
    
  });
  
  questionsRouter.get("/", async (req, res) => {
    try{
      const questions = await connectionPool.query(
        `select * from questions`);
      return res.status(200).json(questions.rows);
    }catch(error){
      return res.status(500).json({message: "Unable to get questions."});
    }
  });

  questionsRouter.get("/search", async (req, res) => {
    let results;

    const title = req.query.title;
    const category = req.query.category;

    try{
      results = await connectionPool.query(
        `select * from questions 
        where 
        (title ILIKE '%' || $1 || '%' or $1 is null or $1 = '')
        and
        (category ILIKE '%' || $2 || '%' or $2 is null or $2 = '')
        `,
        [ title, 
          category]);

        if(results.rows.length === 0){
          return res.status(404).json({message: "No questions found."});
        }
          
    return res.status(200).json({
        data: results.rows,
    });

    }catch{
      return res.status(500).json({message: "Unable to fetch a question."
      });
    }
  });
  
  questionsRouter.get("/:questionId", async (req, res) => {
    try{
      const questions = await connectionPool.query(
        `select * from questions where id = $1`,
        [req.params.questionId]);
      if(questions.rows.length === 0){
        return res.status(404).json({message: "Question not found."});
      }
      return res.status(200).json(questions.rows);
    }catch(error){
      return res.status(500).json({message: "Unable to fetch questions."});
    }
  });
  
  questionsRouter.put("/:questionId", [questionValidation], async (req, res) => {
    try{
      // console.log("PUT request received:", req.params, req.body);
      const {questionId} = req.params;
      const { title, description } = req.body;
      const updatedQuestion = await connectionPool.query(
        `update questions 
        set 
        title = $1, 
        description = $2, 
        created_at = NOW()
        where id = $3
        RETURNING *;`,
        [ title, 
          description, 
          questionId]);
      // console.log("Updated question:", updatedQuestion.rows[0]);
      if(updatedQuestion.rowCount === 0){
        return res.status(404).json({message: "Question not found."});
      }
      return res.status(200).json({message: "Question updated successfully.",
        data: updatedQuestion.rows[0]
      });
    }catch(error){
      // console.error("Error updating question:", error);
      return res.status(500).json({message: "Unable to fetch questions."});
    }
  });
  
  questionsRouter.delete("/:questionId/", async (req, res) => {
    try{
      const questionId = req.params.questionId;
      const question = await connectionPool.query(
        `delete from questions where id = $1`,
        [questionId]);

      if(question.rowCount === 0){
        return res.status(404).json({message: "Question not found."});
      }
      return res.status(200).json({
        message: "Question post has been deleted successfully.",
      });
    }catch(error){
      return res.status(500).json({
        message: "Unable to delete answer.",
      });
    }
  });
  
 

  export default questionsRouter;