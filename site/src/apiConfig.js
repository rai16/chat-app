export default function getApiConfig(){
    const config = {
        dev: {
            users: 'http://localhost:1234/api/users/',
            messages: 'http://localhost:1234/api/messages/'
        },
        prod: {

        }
    };
    return config;
}