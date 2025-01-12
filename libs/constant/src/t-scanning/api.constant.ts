
const IsDevelopment=false;
const DEV_BACKEND_URL='http://localhost:3000'
const PROD_BACKEND_URL='https://principal-maybelle-unfetchai-6b091143.koyeb.app'
const DEV_SCANNING_FRONTEND_URL='http://localhost:4300'
const PROD_SCANNING_FRONTEND_URL='https://restro.tapntaste.unfetch.tech'
const DEV_ADMIN_FRONTEND_URL='http://localhost:4200'
const PROD_ADMIN_FRONTEND_URL='https://admin.tapntaste.unfetch.tech'
export const BACKEND_URL = IsDevelopment? (DEV_BACKEND_URL|| 'http://localhost:3000'):  PROD_BACKEND_URL;
export const SCANNING_FRONTEND_URL = IsDevelopment? (DEV_SCANNING_FRONTEND_URL|| 'http://localhost:4300'):PROD_SCANNING_FRONTEND_URL;
export const ADMIN_FRONTEND_URL = IsDevelopment? (DEV_ADMIN_FRONTEND_URL|| 'http://localhost:4200'):PROD_ADMIN_FRONTEND_URL;
