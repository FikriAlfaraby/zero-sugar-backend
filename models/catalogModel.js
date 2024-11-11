const db = require('../config/database')


const Catalog = {
    createCatalog: (data, cb) => {
        const { id_user, name, age, specialization, title, nidn, exp_years, whatsapp, is_verified, notes } = data;
        const query = `INSERT INTO catalog (id_user, name, age, specialization, title, nidn, exp_years, whatsapp, is_verified, notes, created_at, updated_at)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_DATE, CURRENT_DATE)`;

        db.execute({
            sqlText: query,
            binds: [id_user, name, age, specialization, title, nidn, exp_years, whatsapp, is_verified, notes],
            complete: (err, stmt, rows) => {
                cb(err)
            }
        })
    },
    getAllCatalog: (cb) => {
        const sql = `
        SELECT 
    c.id_catalog,
    c.id_user,
    c.name,
    c.age,
    c.specialization,
    c.title,
    c.nidn,
    c.exp_years,
    c.whatsapp,
    c.is_verified,
    c.notes,
    c.created_at,
    c.updated_at,
    AVG(fc.rating) AS rating
FROM catalog c
LEFT JOIN feedback_catalog fc ON fc.id_catalog = c.id_catalog
GROUP BY 
    c.id_catalog,
    c.id_user,
    c.name,
    c.age,
    c.specialization,
    c.title,
    c.nidn,
    c.exp_years,
    c.whatsapp,
    c.is_verified,
    c.notes,
    c.created_at,
    c.updated_at
ORDER BY rating DESC;
`
        db.execute({
            sqlText: sql,
            complete: (err, stmt, rows) => {
                cb(err, rows)
            }
        })
    }
}

module.exports = Catalog;