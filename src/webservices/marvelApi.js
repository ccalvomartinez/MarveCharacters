import marvelApi from 'marvel-comics-api'
import * as constants from './constans'

export function fetch(url, searchText) {
    return new Promise(function(resolve, reject) {
        let data = {
            publicKey: constants.PUBLIC_KEY,
            timeoou: 4000,
            query: {
                limit: 30
            },
            headers: {
                Referer: constants.REFERER
            }
        }
        if ( searchText ) {
            data.query.nameStartsWith = searchText
        }
        marvelApi(url, data, function(err, body){
            if (err) {
                reject(err)
            } else {
                resolve(body.data)
            }
        })
    })
}