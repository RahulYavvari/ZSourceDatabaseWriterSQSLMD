export const handler = async (event) => {
    const records = event.Records;
    console.log(event);
    for(let i = 0; i < records.length; i++) {
        const message = records[i].body;

        // load message into the database using dynamoose
    }
};