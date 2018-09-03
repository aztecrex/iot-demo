import Auth from '@aws-amplify/auth';
// import S3 from 'aws-sdk/clients/s3';
import CF from 'aws-sdk/clients/cloudformation';

const canUseAWS = () => {
    return Auth.currentCredentials()
        .then(credentials => {
            const cf = new CF({
                credentials: Auth.essentialCredentials(credentials),
                region: 'us-east-1'
            });
            return new Promise((resolve, reject) => {
                cf.describeStacks({}, (err,data) => {
                    if (err) reject(err);
                    else resolve(data);
                });
            });
            // const s3 = new S3({
            //     credentials: Auth.essentialCredentials(credentials),
            // });
            // return new Promise ((resolve, reject) => {
            //     s3.listBuckets((err, data) => {
            //         if (err) reject (err);
            //         else resolve(data);
            //     });
            // });
        })
        .then(buckets => console.log("i can aws! ", buckets))
        .catch(error => console.log("i cannot aws"));
};


// import Route53 from 'aws-sdk/clients/route53';

// Auth.currentCredentials()
//   .then(credentials => {
//     const route53 = new Route53({
//       apiVersion: '2013-04-01',
//       credentials: Auth.essentialCredentials(credentials)
//     });

//     // more code working with route53 object
//     // route53.changeResourceRecordSets();
//   })

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



export {Login, currentUser, Logout, ChangePass, canUseAWS};

