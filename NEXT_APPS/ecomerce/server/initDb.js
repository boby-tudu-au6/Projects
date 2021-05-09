import mongoose from 'mongoose';

const initDb = () => {
    if (mongoose.connections[0].readyState) {
        console.log('db alreay connected');
        return ;
    }
    mongoose.connect(process.env.MONGO_URI,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true, 
        useCreateIndex: true
    });
    mongoose.connection.on('connected', () => {
        console.log("db connected")
    });
    mongoose.connection.on('error', (error) => {
        console.log(error)
    })
};
export default initDb;