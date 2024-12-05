import Datas from "../Models/data.model.js";
import { errorHandler } from "../Utils/error.js";

export const get = async (req, res, next) => {
  const data = await Datas.find()
  return res.status(200).json({ data });
};

export const post = async (req, res, next) => {
  try {
    const data = await req.body;

    const newData = new Datas( data );
    await newData.save();
    return res.status(200).json({ success: true, data:newData });
  } catch (error) {
    next(errorHandler(401, "Bad request"));
  }
};

export const dispatch = async (req, res, next) => {
  try {
    const {id} = await req.body;
   const deletedData= await Datas.findByIdAndDelete(id)

  console.log(id,deletedData);

    
    return res.status(200).json({ success: true, message: 'Delete Successful'});
  } catch (error) {
    next(errorHandler(401, "Bad request"));
  }
};
