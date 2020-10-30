const { Client, query: q } = require('faunadb')

module.exports = function deleteContact(id) {
    const client = new Client({
        secret: process.env.FAUNA_SECRET
    })
    return client.query(q.Delete(q.Ref(q.Collection('contacts'), id)))
}