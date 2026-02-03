import bcrypt from 'bcrypt';

const hashPassword=async(password:string)=>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
}
const validPassword=(userPassword:string,password:string)=>{
    const valid=bcrypt.compare(password,userPassword);
    return valid;
}
export {hashPassword,validPassword};