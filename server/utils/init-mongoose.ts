import * as mongoose from 'mongoose';
import * as logger from 'winston';

export function initMongoose(connectionString: string) {
    // Build the connection string 
    var dbURI = connectionString; 
    (<any>mongoose).Promise = global.Promise;

    // Create the database connection 
    mongoose.connect(dbURI,{server:{socketOptions:{keepAlive:30000, connectTimeoutMS:30000}},replset:{socketOptions:{keepAlive:30000, connectTimeoutMS:30000}}}); 

    // CONNECTION EVENTS
    // When successfully connected
    mongoose.connection.on('connected', function() {        
        logger.info('Mongoose default connection open to ' + dbURI);
    }); 

    // If the connection throws an error
    mongoose.connection.on('error', function(err) {
        logger.info('Mongoose default connection error: ' + err);
    }); 

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function() {
        logger.info('Mongoose default connection disconnected');
    });

    // If the Node process ends, close the Mongoose connection 
    process.on('SIGINT', function() {
        mongoose.connection.close().then(()=>{
        logger.info('Mongoose default connection disconnected through app termination');
        process.exit(0);
        })
    });   
}
