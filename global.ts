import * as fetch from "node-fetch"


global.window = {fetch};
declare global {
    
	namespace NodeJS {
		interface Global {
			api: any;
            window: any;
		}
	}
}