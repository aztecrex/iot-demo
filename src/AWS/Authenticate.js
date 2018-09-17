import Auth from '@aws-amplify/auth';


const awsCredentials = () => {
    return Auth.currentCredentials()
        .then(acred => {
            const {expireTime} = acred;
            const ecred = Auth.essentialCredentials(acred);
            return Promise.resolve({...ecred, expireTime});
        })
        ;
};

Auth.configure({
    region: 'us-east-1',
    userPoolId: 'us-east-1_RxOfyTzuV',
    userPoolWebClientId: '1vd3m7n0u5l4m0ks9k73cjgntv',
    identityPoolRegion: 'us-east-1',
    identityPoolId: 'us-east-1:f993c382-7447-4a93-838f-1676cd78c485',
});


const currentUser = () => {
    return Auth
        .currentAuthenticatedUser()
};


const ChangePass = (user, pass) => {
    return Auth.completeNewPassword(user, pass);
};

const Logout = () => {
    return Auth.signOut();
};

const Login = (user, pass) => {

    return Auth
        .signIn(user,pass);
};

export {Login, currentUser, Logout, ChangePass, awsCredentials};

