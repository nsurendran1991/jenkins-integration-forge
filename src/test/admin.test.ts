//const admin = require('../admin');
import * as admin from "../admin"


jest.mock('@forge/api', () => ({
    storage: {
      get: () => {
        return 'test-secret';
      },
      set: () => {

      }
    },
    webTrigger:{
        getUrl: () =>{
            return 'https://4672e004-ff75-4851-b73f-37e35ccce067.hello.atlassian-dev.net/x1/n3Od2bfO0q6hcrb0J2AldN3_n3U'
        }
    }
  }));

describe('Test suites for admin page', () => {
    it('should process admin page', () =>{
        admin.run;
    })
});