if(process.env.NODE_ENV === "production"){
    module.exports = {
        host		: 'smtp.gmail.com',
        user 		: 'smart.read.inc@gmail.com',
        password 	: process.env.EMAIL_PASSWORD,
        sender		: '悦读 <smart.read.inc@gmail.com>'

    };
}else{
    module.exports = {
        host		: 'smtp.gmail.com',
        user 		: 'smart.read.inc@gmail.com',
        password 	: process.env.EMAIL_PASSWORD,
        sender		: '悦读 <smart.read.inc@gmail.com>'

    };
}
