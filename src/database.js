const mysql =require("mysql")
const {promisify} =require("util")




const pool = mysql.createPool({
  host:"us-cdbr-east-04.cleardb.com",
  user:"bf83f9772a3bf5",
  password:"4f828b7d",
  database:"heroku_6f6c273df2e61b8"
})

pool.getConnection((err, connection) => {
    if (err) {
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        console.error("Database connection was closed.");
      }
      if (err.code === "ER_CON_COUNT_ERROR") {
        console.error("Database has to many connections");
      }
      if (err.code === "ECONNREFUSED") {
        console.error("Database connection was refused");
      }
    } else{
      console.log("DB is Connected");
  
    }
  
  
    return;
  });
pool.query=promisify(pool.query)

module.exports= pool