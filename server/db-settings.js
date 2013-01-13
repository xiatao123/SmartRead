if(process.env.NODE_ENV === "production"){
    console.log("use production db settings");
    module.exports = {
        host: 'linus.mongohq.com',
        port: 10064,
        db: process.env.DB,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    };
}else{
    console.log("use dev db settings");
    module.exports = {
        host: 'localhost',
        port: 27017,
        db: 'smartreaddb',
        username: '',
        password: ''
    };
}
