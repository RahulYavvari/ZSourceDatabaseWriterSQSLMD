import dynamoose from "dynamoose";
import dotenv from "dotenv";
dotenv.config();

const ddb = new dynamoose.aws.ddb.DynamoDB({
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    },
    region: "eu-north-1"
});
dynamoose.aws.ddb.set(ddb);

const postSchema = new dynamoose.Schema({
    tag: {
        type: String,  
        hashKey: true 
    },
    value: String,      
    dateAndTime: String, 
    userid: String,   
    edited: Boolean    
});

const Post = dynamoose.model("PostInfoDB", postSchema);

const loadDatabase = async (postObject) => {
    try {
        const myPost = await Post.create(postObject);
        return myPost;
    } catch (error) {
        console.error("Error uploading the post:", error);
    }
};

export default loadDatabase;