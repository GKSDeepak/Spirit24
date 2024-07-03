import Opinion from '../models/opinion.js';
export const opinion=async(req,res)=>{
    try {
        const { name , email, message } = req.body;
        const newOpinion = await Opinion.create({ name ,email , message });
        res.status(201).send(newOpinion);
      } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
      }
}