import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData={
    UserPoolId:'us-west-1_zJ0IZCO9G',
    ClientId:'3pgirv3ncadlc5orevg3fmiu9n',
    
}
const UserPoolCognito =new CognitoUserPool(poolData)

export default UserPoolCognito