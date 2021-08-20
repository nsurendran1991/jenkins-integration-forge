import * as deployment from "../deployment"
//import nock from "nock"

describe('Process send Deployment information to jira', () => {
    beforeEach(() => {
        // @ts-ignore
        deployment.extractCloudId = jest.fn().mockReturnValueOnce('fc10a037-0294-4439-8cf4-673c6de246e7');
        //filterTestFn.mockReturnValueOnce('fc10a037-0294-4439-8cf4-673c6de246e7');
    });

    test('processDeployment', async () => {
        deployment.processDeployment({headers:{}}, {});
    }); 
});
