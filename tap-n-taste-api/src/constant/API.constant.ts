
const IsDevelopment=process.env.IsDevelopment==='false'?false:true;
export const BACKEND_URL = IsDevelopment? (process.env.DEV_BACKEND_URL|| 'http://localhost:3000'):  process.env.PROD_BACKEND_URL;
export const SCANNING_FRONTEND_URL = IsDevelopment? (process.env.DEV_SCANNING_FRONTEND_URL|| 'http://localhost:4300'):  process.env.PROD_SCANNING_FRONTEND_URL;
export const ADMIN_FRONTEND_URL = IsDevelopment? (process.env.DEV_ADMIN_FRONTEND_URL|| 'http://localhost:4200'):  process.env.PROD_ADMIN_FRONTEND_URL;

console.log(BACKEND_URL);
console.log(ADMIN_FRONTEND_URL);
console.log(SCANNING_FRONTEND_URL);
console.log(IsDevelopment);
