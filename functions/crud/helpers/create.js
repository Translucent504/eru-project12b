const { Client, query: q } = require('faunadb')

module.exports = function createContact(userinfo) {
    console.log('creating', userinfo)
    const client = new Client({
        secret: process.env.FAUNA_SECRET
    })
    return client.query(q.Create(
        q.Collection('contacts'),
        { data: userinfo })
    )
}