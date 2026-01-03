import bcrypt from "bcryptjs";

const password = "shivam"; // or super@123
const hash = await bcrypt.hash(password, 10);
console.log(hash);
