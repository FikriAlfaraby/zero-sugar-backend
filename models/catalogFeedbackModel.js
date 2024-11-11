const db = require('../config/database');

const CatalogFeedback = {
    createCatalogFeedback: (data, cb) => {
        const { id_user, catalog_id, rating, message } = data;
        const sql = "INSERT INTO feedback_catalog (id_user, id_catalog, rating, message, created_at, updated_at) VALUES (?,?,?,?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)"
        db.execute({
            sqlText: sql,
            binds: [id_user, catalog_id, rating, message],
            complete: (err, stmt) => {
                cb(err)
            }
        })
    }
}


module.exports = CatalogFeedback