import loadDatabase from "./utils/databaseController.mjs";

export const handler = async (event) => {
    const records = event.Records;

    for(let i = 0; i < records.length; i++) {
        const message = records[i].body;

        try {
            const databaseResponse = await loadDatabase(message);
            console.log("[LOG] Successfully uploaded into database!");
            const response = {
                statusCode: 200,
                body: `Successfully uploaded into database! \n [RESPONSE] \n ${databaseResponse}`
            }
        } catch(err) {
            console.error("[LOG] Failed to upload into database", err);
            const response = {
                statusCode: 500,
                body: `Failed to upload into database! \n [RESPONSE] \n ${databaseResponse}`
            }
        }
    }

    return response;
};