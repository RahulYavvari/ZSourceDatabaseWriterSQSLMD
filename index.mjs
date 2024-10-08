import loadDatabase from "./utils/databaseController.mjs";

export const handler = async (event) => {
    const records = event.Records;
    let response = null;
    for(let i = 0; i < records.length; i++) {
        const message = records[i];
        try {
            console.log("[WATCH LOG 1]:", JSON.parse(message.body).Records[0]);
            const databaseResponse = await loadDatabase(JSON.parse(message.body).Records[0]);
            console.log("[WATCH LOG 2]:", databaseResponse);
            if(databaseResponse != null || databaseResponse != undefined) {
                console.log("[LOG] Successfully uploaded into database!");
            }
            response = {
                statusCode: 200,
                body: `Successfully uploaded into database! \n [RESPONSE] \n ${databaseResponse}`
            }
        } catch(err) {
            console.error("[LOG] Failed to upload into database", err);
            response = {
                statusCode: 500,
                body: `Failed to upload into database! \n [RESPONSE] \n ${err}`
            }
        }
    }

    return response;
};

// [THE BELOW CODE IS FOR TESTING DURING DEVELOPMENT]
const event = {
    "Records": [
      {
        "tag": "",
        "edited": false,
        "value": "",
        "dateAndTime": "",
        "userid": ""
      }
    ]
};  

const main = async () => {
    await handler(event);  
};

main();