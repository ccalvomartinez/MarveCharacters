import marvelApi from 'marvel-comics-api'
import * as constants from './constans'

export function fetch(url) {
    return new Promise(function(resolve, reject) {

        marvelApi(url, {
            publicKey: constants.PUBLIC_KEY,
            timeoou: 4000,
            query: {
                limit: 30
            },
            headers: {
                Referer: constants.REFERER
            }
        }, function(err, body){
            if (err) {
                reject(err)
            } else {
                resolve(body.data)
            }
        })
    })
}