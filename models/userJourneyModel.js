const db = require("../config/database");

const UserJourney = {
    getUserJourneyOneMonth: (idUser, cb) => {
        const date = new Date();
        const previousMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
        const currentMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        const sqlText = `
            SELECT * FROM user_journey
            WHERE id_user = ?
            AND created_at BETWEEN ? AND ?
            ORDER BY created_at ASC`

        db.execute({
            sqlText,
            binds: [idUser, previousMonth, currentMonth],
            complete: (err, stmt, rows) => {
                console.log(stmt.getSqlText())
                cb(err, rows)
            }
        })
    },
    createUserJourney: (idUser, data, cb) => {
        const date = new Date();


        let totalData = 0;

        const res = db.execute({
            sqlText: "SELECT * FROM user_journey WHERE id_user = ? AND created_at = CURRENT_DATE LIMIT 1",
            binds: [idUser],
            complete: (err, stmt, rows) => {
                if (rows.length > 0) {
                    console.log('sudah ada journey', rows.length)
                    totalData = rows.length;
                    cb(new Error('User telah mengisi journey hari ini'))
                } else {
                    const sqlText = `
                    INSERT INTO user_journey 
                    (id_user, sugar, drink_consumption, activities, hours_sleep, sleep_quality, is_smoking, stress_level, risk_profile, created_at, updated_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_DATE, CURRENT_DATE)`

                    db.execute({
                        sqlText,
                        binds: [idUser, ...Object.values(data)],
                        complete: (err, stmt) => {
                            console.log(stmt.getSqlText())
                            cb(err)
                        }
                    })
                }
            }
        })


    }
}

module.exports = UserJourney