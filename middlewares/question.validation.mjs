export function questionValidation(req, res, next) {
    if(!req.body.title || !req.body.description || !req.body.category){
        return res.status(400).json({message: "Invalid request data."});
    }
    
    next();
}