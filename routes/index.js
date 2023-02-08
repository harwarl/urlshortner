import { urlRoutes } from "../routes/url.js"
function bootStrap(app) {
    app.use('/api', urlRoutes);
}

export { bootStrap }