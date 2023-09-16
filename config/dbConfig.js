import mongoose from 'mongoose'
const connectDb = async () => {
    try {
        // Make sure to specify the URI as a string here
        const uri = process.env.CONNECTION_STRING;

        if (!uri) {
            console.error('MongoDB URI is missing. Please set the CONNECTION_STRING environment variable.');
            process.exit(1);
        }

        const connect = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Database connected:', connect.connection.name);
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }
};

export default connectDb;