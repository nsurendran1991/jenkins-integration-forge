import * as deployment from "../deployment"

const response = {
    body:{},
    statusCode: 200
}


const __requestAtlassian = jest.fn().mockReturnValue(response);
const fetch = jest.fn();
// Global API mock()
(global as any).api = {
  fetch,
  asApp() {
    return {
      __requestAtlassian
    };
  }
};



jest.mock('@forge/api', () => ({
    storage: {
      get: () => {
        return 'test-secret';
      }
    }
  }));

   
describe('Process send Deployment information to jira', () => {
      beforeEach(() => {
        // @ts-ignore
        deployment.extractCloudId = jest.fn().mockReturnValueOnce('fc10a037-0294-4439-8cf4-673c6de246e7');          
    });

    it('should process deployment with valid secret key', async () => {   
          
        const result = await deployment.processDeployment({headers:{'x-security-token': 'test-secret'}}, {});
        expect(result.statusCode).toEqual(200);
    }); 

    it('should process deployment with invalid secret key', async () => {
        const result = await deployment.processDeployment({headers:{'x-security-token': 'test-secret-invalid'}}, {});
        expect(result.statusCode).toEqual(401);
    }); 
});
