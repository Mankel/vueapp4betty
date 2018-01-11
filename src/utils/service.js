import axios from 'axios';

// ========================================
// define vars

const CancelToken = axios.CancelToken;

const SERVICE = axios.create({
    baseURL: '/',
    timeout: 10000
});

SERVICE.interceptors.request.use(config => {

    return config;
}, error => {
    //
    return Promise.reject(error);
});

SERVICE.interceptors.response.use(response => {

    return response;
}, error => {

    console.log(error, error.response);

    if (axios.isCancel(error)) {
        console.log('Request has been cancelled by user!');

    } else {
        let message = '未知';
        if (error.response && error.response.data) {
            message = error.response.data.message;
        } else {
            message = error.message;
        }
        alert(message);

    }

    return Promise.reject(error);
});



// ========================================
// export objects

export const service = SERVICE;

export function getApi(classMapping) {
    const API = {
        cancelTokens: {},
        newToken: (method, url, cancel) => {
            let key = `${method}:${url}`;
            let cancelToken = API.cancelTokens[key];
            if (isFunction(cancelToken)) {
                cancelToken();
            }
            API.cancelTokens[key] = cancel;
        },
        rest: ({method, methodMapping, params, data}) => {
            let url = `${classMapping}${methodMapping || ''}`;
            return SERVICE({
                method,
                url,
                params,
                data,
                cancelToken: new CancelToken(cancel => {
                    API.newToken(method, url, cancel);
                })
            })
        }
    };
    return {
        get (methodMapping, params) {
            return API.rest({
                method: $CNST.RestMethods.GET,
                methodMapping,
                params
            });
        },
        post (methodMapping, data) {
            return API.rest({
                method: $CNST.RestMethods.POST,
                methodMapping,
                data
            });
        },
        put (methodMapping, data) {
            return API.rest({
                method: $CNST.RestMethods.PUT,
                methodMapping,
                data
            });
        },
        del (methodMapping, data) {
            return API.rest({
                method: $CNST.RestMethods.DEL,
                methodMapping,
                data
            });
        }
    };
};
