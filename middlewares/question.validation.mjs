export function questionValidation(req, res, next) {
    const {title, description, category} = req.body;
    // สำหรับ PUT request อนุญาตให้ส่ง title หรือ description อย่างน้อย 1 ตัว
    if(req.method === 'PUT') {
        if(!title && !description) {
            return res.status(400).json({message: "At least title or description must be provided."});
        }
    } else {
        // สำหรับ POST request ต้องการ title เสมอ
        if(!title){
            return res.status(400).json({message: "Title is required."});
        }
    }
    
    next();
}