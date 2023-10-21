module.exports = QUERY = {
  UNIT: {
    INSERT: "INSERT INTO units SET ?",
    UPDATE: `UPDATE units SET ? WHERE id = ?`,
    DELETE: `DELETE FROM units WHERE id = ?`,
    SELECT_ONE: `SELECT * FROM units WHERE id = ?`,
  },
  ADMIN: {
    INSERT: "INSERT INTO admins SET ?",
    UPDATE: `UPDATE admins SET ? WHERE id = ?`,
    DELETE: `DELETE FROM admins WHERE id = ?`,
    SELECT_ONE: `SELECT * FROM admins WHERE username = ?`,
    SELECT_ALL: `SELECT * FROM admins`,
  },
};
