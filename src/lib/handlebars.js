const moment = require("moment")
moment.locale("es")

const helpers ={}


helpers.moment= (timestamp)=>{ 
  
   let fecha= moment(timestamp).format("LL");
    return fecha
}

module.exports=helpers