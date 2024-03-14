const Pool =require("pg").Pool;

const pool=new Pool({
    user:"yifanhe",
    password:"1234",
    host:"localhost",
    port:5432,
    database:"perntissues"
});

module.exports=pool;