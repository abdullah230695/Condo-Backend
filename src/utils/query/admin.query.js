module.exports = ADMIN_QUERY = {
  INSERT_UNIT: "INSERT INTO units SET ?",
  UPDATE_UNIT: `UPDATE units SET ? WHERE id = ?`,
  DELETE_UNIT: `DELETE units WHERE id = ?`,
};
