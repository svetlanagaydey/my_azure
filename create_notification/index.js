const CosmosClient = require("@azure/cosmos").CosmosClient;
require('dotenv').config();

const endpoint = 'https://hbinnovation.documents.azure.com:443/';
const key = process.env.COSMOS_KEY;

const client = new CosmosClient({ endpoint, key});

const databaseId = 'events';
const containerId = 'events';

const database = client.database(databaseId);
const container = database.container(containerId);

module.exports = async function (context, req) {
    
    let event = {
        "name": req.query.name,
        "eventCode": 1
    }

    const { resource: createdItem } = await container.items.create(event);

    const responseMessage = event
        ? "Event " + event.name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a event type in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}