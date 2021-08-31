import { storage} from "@forge/api";

const buildResponse = (statusCode, response) => (  
  {
  body: response.body,
  headers: {
    'Content-Type': ['application/json'],
  },
  statusCode: statusCode,
});

/**
 * Extracts the cloud ID from the "installContext" string
 * (which is a Jira site ARI like "ari:cloud:jira::site/fc10a037-0294-4439-8cf4-673c6de246e7").
 */
 export const extractCloudId = (installContext) => (
  installContext.replace("ari:cloud:jira::site/","")
);



export const processWebhook = async (request, context) => {
   const cloudId = extractCloudId(context.installContext);
  console.log(cloudId);
  var secret = await storage.get('secret');
  var secretText = request.headers['x-security-token'];
  if(secretText == secret){
    const result = await (global as any).api
      .asApp()
      .__requestAtlassian(`/jira/builds/0.1/cloud/${cloudId}/bulk`,{
            method: 'POST',
            headers: {
               'content-type': 'application/json'
            },
            body: request.body
          }
        );
        return buildResponse(result.statusCode, result);
  }else{
        console.log('Authorization failed--------');
        return buildResponse(401, {body: {}});
  }
};

