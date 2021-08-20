import { storage} from "@forge/api";



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
 export const extractCloudId = (installContext) => (
    installContext.replace("ari:cloud:jira::site/","")
  );

  export const processDeployment = async (request, context) => {
    const cloudId = extractCloudId(context.installContext);
    console.log(cloudId);
    // const path = route`/jira/builds/0.1/cloud/${cloudId}/bulk`;
    var secretText = request.headers['x-security-token'];
    console.log('secretText '+secretText);
    var secret = await storage.get('secret');
    console.log('secret '+secret);
    if(secretText == secret){
  
    const result = await global.api
        .asApp()
        .__requestAtlassian(`/jira/deployments/0.1/cloud/${cloudId}/bulk`,{
              method: 'POST',
              headers: {
                 'content-type': 'application/json'
              },
              body: request.body,
            }
    );
  
    console.log(`response: ${JSON.stringify(result)}`);
          }else{
            console.log('Authorization failed--------');
          }
  
    return buildResponse(200);
  };