const {createClient} =require('redis');




const redisClient = createClient({
    username: 'default',
    password:'g66ApFaG7lFh3utXvsrJV13TbomB1TnY',
    socket: {
        host: 'redis-13223.c257.us-east-1-3.ec2.redns.redis-cloud.com',
        port: 13223
    }
});
module.exports=redisClient;