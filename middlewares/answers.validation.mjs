export function answersValidation(req, res, next) {
    if(!req.body.content){
        return res.status(400).json({message: "Invalid request data."});
    }

    if(req.body.content.length > 300){
        return res.status(400).json({message: "กรุณาส่งข้อมูล Content ของโพสต์ตามที่กำหนดไม่เกิน 300 ตัวอักษร"});
    }

    next();
}