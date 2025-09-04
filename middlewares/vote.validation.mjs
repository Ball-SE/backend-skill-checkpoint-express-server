export function voteValidation(req, res, next) {
    if(!req.body.vote){
        return res.status(400).json({message: "Invalid vote value."});
    }

    next();
}