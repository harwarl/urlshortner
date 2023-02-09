import { urlRoutes } from "../routes/url.js"
function bootStrap(app) {
    app.use(urlRoutes);




    
}

export { bootStrap }