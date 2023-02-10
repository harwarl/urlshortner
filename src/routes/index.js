import { urlRoutes } from "../routes/url.js"
function bootStrap(app) {
    app.use('/.netlify/functions/api', urlRoutes);




    
}

export { bootStrap }