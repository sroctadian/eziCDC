import store from '../store'

var requestHeader = new Headers();
requestHeader.append("Accept", "*/*")
requestHeader.append("Content-Type", "application/json")
requestHeader.append("Sec-Fetch-Mode", "cors")
requestHeader.append("Sec-Fetch-Dest", "")
requestHeader.append("Sec-Fetch-Site", "same-site")

export const api = {
    getConnectorPlugins: () => {
        let url = store.getters.buildUrlBase + store.state.apiPath.getConnectorPlugins
        const request = new Request(url,
            {
                method: "GET",
                mode: "cors",
                cache: "default"
            }
        );
        fetch(request)
            .then(async response => {
                const data = await response.json();
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                store.commit('storeConnectorPlugins', data)
            })
            .catch(error => {
                store.commit('ui/storeError', { show: true, message: error })
                return Promise.reject(error);
            }
        );
    },
    getConnectors: () => {
        let url = store.getters.buildUrlBase + store.state.apiPath.getConnectors
        const request = new Request(url,
            {
                method: "GET",
                mode: "cors",
                cache: "default"
            }
        );
        fetch(request)
            .then(async response => {
                const data = await response.json();
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                let parsedData = new Array()
                data.forEach(element => {
                    parsedData.push({ name: element})
                });
                store.commit('storeConnectors', parsedData)
            })
            .catch(error => {
                store.commit('ui/storeError', { show: true, message: error })
                return Promise.reject(error);
            }
        );
    },
    getConnector: (payload) => {
        let url = store.getters.buildUrlBase + store.state.apiPath.getConnectors + "/" + payload
        const request = new Request(url,
            {
                method: "GET",
                mode: "cors",
                cache: "default"
            }
        );
        fetch(request)
            .then(async response => {
                const data = await response.json();
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                store.commit('storeConnector', data)
            })
            .catch(error => {
                store.commit('ui/storeError', { show: true, message: error })
                return Promise.reject(error);
            }
        );
    },
    createConnector: () => {
        let url = store.getters.buildUrlBase + store.state.apiPath.getConnectors
        let params = JSON.stringify(store.getters.availableConnector)
        const request = new Request(url,
            {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                body: params,
                headers: requestHeader,
                redirect: 'follow'
            }
        );
        return fetch(request)
            .then(async response => {
                const data = await response.json();
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                // store.commit('ui/storeNotification', {
                //     type: "success"
                //     , show: true
                //     , message: "Connector '" + store.getters.availableConnector + "' has been created." })
                store.commit('resetConnector')
                return Promise.resolve(true)
            })
            .catch(error => {
                store.commit('ui/storeError', { show: true, message: error })
                return Promise.reject(error);
            }
        );
    },
    updateConnector: () => {
        let url = store.getters.buildUrlBase + store.state.apiPath.getConnectors + "/" + store.getters.availableConnector.name + "/config"
        let params = JSON.stringify(store.getters.availableConnector.config)
        const request = new Request(url,
            {
                method: "PUT",
                mode: "cors",
                cache: "no-cache",
                body: params,
                headers: requestHeader,
                redirect: 'follow'
            }
        );
        return fetch(request)
            .then(async response => {
                const data = await response.json();
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                store.commit('resetConnector')
                return Promise.resolve("OK")
            })
            .catch(error => {
                store.commit('ui/storeError', { show: true, message: error })
                return Promise.reject(error);
            }
        );
    },
    deleteConnector: () => {
        let url = store.getters.buildUrlBase + store.state.apiPath.getConnectors + "/" + store.getters.availableConnector.name
        const request = new Request(url,
            {
                method: "DELETE",
                mode: "cors",
                cache: "no-cache",
                headers: requestHeader,
                redirect: 'follow'
            }
        );
        return fetch(request)
            .then(async () => {
                store.commit('resetConnector')
                return Promise.resolve("OK")
            })
            .catch(error => {
                store.commit('ui/storeError', { show: true, message: error })
                return Promise.reject(error);
            }
            );
    },
}