import ForgeUI, {AdminPage, useAction, useState, render, Text, TextField, Form} from '@forge/ui';
import { webTrigger, storage } from "@forge/api";


const getBuildInfoURL = async () => {
    return await webTrigger.getUrl("webhook-receiver");
  };
  
  const getDeploymentInfoURL = async () => {
    return await webTrigger.getUrl("webhook-deployment");
  };

  const getSecretText = async () => {
    return await storage.get('secret');
  };
  

const App =  () => {    
    
    const [buildUrl, setbuildUrl] = useAction(
        () => getBuildInfoURL(),
        () => getBuildInfoURL(),
    );

    const [deploymentURL, setDeploymentURL] = useAction(
        () => getDeploymentInfoURL(),
        () => getDeploymentInfoURL(),
    );
    const [secretText, setSecretText] = useAction(
        () => getSecretText(),
        () => getSecretText(),
    );    

    const onFormSubmit = async (data) => {
        console.log(data.secret);
       await setSecretText(data.secret);
        storage.set('secret', data.secret);
        
        console.log(storage.get('secret'));
    };
  
    return (       
        <AdminPage>
            <Form submitButtonText={"Submit"} onSubmit={onFormSubmit}>
                <Text>Build Info URL - {buildUrl}</Text>
                <Text>Deployment Info URL - {deploymentURL}</Text>

               <TextField label="Secret" name="secret" isRequired={true}/>
               <Text>Secret is -  {secretText}</Text>
            </Form>
        </AdminPage>
    );
};



export const run = render(
    <App/>
);