import jwt from "jsonwebtoken";
import { hrtime } from "node:process";

const tokenCreation =(id:string)=>{
    const jwtSecret=jwt.sign({id},
        process.env.JWT_SECRET!
        ,{expiresIn:"1d"})
        return jwtSecret;
}

export default tokenCreation;