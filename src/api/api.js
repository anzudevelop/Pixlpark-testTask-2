import * as axios from "axios";
import SHA1 from 'crypto-js/sha1';

const instance = axios.create({
    //withCredentials: true,
    baseURL: 'http://api.pixlpark.com/',
})

export const dataAPI = {
    getRequestToken() {
        return instance.get('oauth/requesttoken').then(response => {
                if (response.data.Success) {
                    return response.data.RequestToken
                }
                else {
                    return false
                }
        })
    },
    getAccessToken(requestToken, login, pass) {
        return instance.get(`oauth/accesstoken?oauth_token=${requestToken}&grant_type=api&username=${login}&password=${SHA1(requestToken + pass)}`).then(response => {
            if(response.data.Success) {
               return response.data.AccessToken
            } else {
                return false
            }
        })
    },
    getOrders(filterValues, accessToken) {
        let queryString = ''
        if(filterValues.take) queryString += `take=${filterValues.take}`
        if(filterValues.skip) queryString += `skip=${filterValues.skip}`
        if(filterValues.userId) queryString += `userId=${filterValues.userId}`
        if(filterValues.shippingId) queryString += `shippingId=${filterValues.shippingId}`
        if(filterValues.status) queryString += `status=${filterValues.status}`
        return instance.get(`orders?oauth_token=${accessToken}&${queryString}`).then(response => {
            return response.data.Result
        })
    },
}
