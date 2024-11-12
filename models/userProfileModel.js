
const db = require('../config/database')
const { callback } = require('../helpers/callback')

const UserProfile = {
    getUserProfile: (id, cb) => {
        db.execute({
            sqlText: "SELECT * FROM user_profile WHERE id_user = ? LIMIT 1",
            binds: [id],
            complete: (err, stmt, rows) => {
                callback(err, stmt)
                cb(err, rows[0])
            }
        })
    },
    createUserProfile: (id, data, cb) => {

        const { name, age, gender, phone_number, weight, height, is_diabetes, is_obesity, bmi, is_onboarding } = data;

        db.execute({
            sqlText: "INSERT INTO user_profile (id_user, name, age, gender, phone_number, weight, height, is_diabetes, is_obesity, bmi, is_onboarding, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
            binds: [id, name, age, gender, phone_number, weight, height, is_diabetes, is_obesity, bmi, is_onboarding, (new Date).toISOString(),  (new Date).toISOString()],
            complete: (err, stmt) => {
                callback(err, stmt)
                cb(err, stmt)
            },

        })
    }
}

module.exports = UserProfile