import {route} from '@forge/api';
import { webTrigger } from "@forge/api";

const buildResponse = (statusCode) => ({
  body: '{}',
  headers: {
    'Content-Type': ['application/json'],
  },
  statusCode: statusCode,
});

/**
 * Extracts the cloud ID from the "installContext" string
 * (which is a Jira site ARI like "ari:cloud:jira::site/fc10a037-0294-4439-8cf4-673c6de246e7").
 */
const extractCloudId = (installContext) => (
  installContext.replace("ari:cloud:jira::site/","")
);



exports.processWebhook = async (request, context) => {
   const cloudId = extractCloudId(context.installContext);
  console.log(cloudId);
   
 console.log(request.body);
  const result = await global.api
      .asApp()
      .__requestAtlassian(`/jira/builds/0.1/cloud/${cloudId}/bulk`,{
            method: 'POST',
            headers: {
               'content-type': 'application/json'
            },
            body: request.body
          }
  );

  console.log(result);
  console.log(`response: ${JSON.stringify(result)}`);

  return buildResponse(200);
};

