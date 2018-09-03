import Auth from '@aws-amplify/auth';


const awsCredentials = () => {
    return Auth.currentCredentials()
        .then(x => {console.log("raw cred", x); return x;})
        .then(acred => Promise.resolve(Auth.essentialCredentials(acred)))
        .then(x => {console.log("ess cred", x); return x;})
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
        .signIn(user,pass)
        .then(user => {console.log(user); return user;})

};

export {Login, currentUser, Logout, ChangePass, awsCredentials};

