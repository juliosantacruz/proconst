import { CognitoUser, CognitoUserPool, ICognitoUserData, ICognitoUserPoolData, NodeCallback } from "amazon-cognito-identity-js";

const poolData:ICognitoUserPoolData={
    UserPoolId:'us-west-1_zJ0IZCO9G',
    ClientId:'3pgirv3ncadlc5orevg3fmiu9n',
    
}
const UserPoolCognito =new CognitoUserPool(poolData)

export default UserPoolCognito




export const verifyUser = (username:string, verifyCode:string, callback: NodeCallback<any, any>)=>{
    
    const userData:ICognitoUserData={
        Username: username,
        Pool:UserPoolCognito
    }

    
    const cognitoUser = new CognitoUser(userData)
    cognitoUser.confirmRegistration(verifyCode, true, callback)
}
