const db = require("../config/database");
const moment = require("moment-timezone");

const UserJourney = {
  getUserJourneyOneMonth: (idUser, cb) => {
    const sqlFirstDate = `
        SELECT created_at FROM user_journey
        WHERE id_user = ?
        ORDER BY created_at ASC
        LIMIT 1
    `;

    db.execute({
      sqlText: sqlFirstDate,
      binds: [idUser],
      complete: (err, stmt, rows) => {
        if (err) {
          cb(err, null);
          return;
        }

        if (rows.length === 0) {
          cb(null, { data: [], isEnd: false });
          return;
        }

        const firstCreatedAt = new Date(rows[0].CREATED_AT);
        const endDate = new Date(firstCreatedAt);
        endDate.setDate(endDate.getDate() + 29);

        const sqlCheckEndDate = `
                SELECT 1 FROM user_journey
                WHERE id_user = ?
                AND created_at >= ?
                LIMIT 1
            `;

        db.execute({
          sqlText: sqlCheckEndDate,
          binds: [idUser, endDate],
          complete: (err, stmt, rows) => {
            if (err) {
              cb(err, null);
              return;
            }

            const isEnd = rows.length > 0;

            const sqlText = `
                        SELECT * FROM user_journey
                        WHERE id_user = ?
                        AND created_at BETWEEN ? AND ?
                        ORDER BY created_at ASC
                    `;

            db.execute({
              sqlText,
              binds: [idUser, firstCreatedAt, endDate],
              complete: (err, stmt, rows) => {
                console.log(stmt.getSqlText());
                cb(err, { data: rows, isEnd });
              },
            });
          },
        });
      },
    });
  },

  createUserJourney: (idUser, data, cb) => {
    // Ambil waktu sekarang dan konversi ke zona waktu Asia/Jakarta (GMT+7)
    const dateInGMT7 = moment
      .tz("2024-12-15 00:00:00", "Asia/Jakarta")
      .format("YYYY-MM-DD HH:mm:ss");

    // Cek apakah sudah ada journey dengan tanggal yang sama
    const res = db.execute({
      sqlText:
        "SELECT * FROM user_journey WHERE id_user = ? AND DATE(created_at) = ? LIMIT 1",
      binds: [idUser, moment(dateInGMT7).format("YYYY-MM-DD")], // Menggunakan format YYYY-MM-DD untuk mencocokkan dengan field created_at
      complete: (err, stmt, rows) => {
        if (rows.length > 0) {
          console.log("sudah ada journey", rows.length);
          totalData = rows.length;
          cb(new Error("User telah mengisi journey hari ini"));
        } else {
          // Jika belum ada journey, insert data baru
          const sqlText = `
          INSERT INTO user_journey 
          (id_user, sugar, drink_consumption, activities, hours_sleep, sleep_quality, is_smoking, stress_level, risk_profile, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

          // Menggunakan waktu yang telah disesuaikan dengan GMT+7 untuk created_at dan updated_at
          db.execute({
            sqlText,
            binds: [idUser, ...Object.values(data), dateInGMT7, dateInGMT7],
            complete: (err, stmt) => {
              console.log(stmt.getSqlText());
              cb(err);
            },
          });
        }
      },
    });
  },
};

module.exports = UserJourney;
