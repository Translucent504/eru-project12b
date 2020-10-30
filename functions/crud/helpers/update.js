const { Client, query: q } = require('faunadb')

module.exports = function updateContact(contactInfo) {
    const client = new Client({
        secret: process.env.FAUNA_SECRET
    })
    console.log(contactInfo.data)
    return client.query(
        q.Update(
            q.Ref(q.Collection('contacts'), contactInfo.id),
            { data: contactInfo.data }
        )
    )
}