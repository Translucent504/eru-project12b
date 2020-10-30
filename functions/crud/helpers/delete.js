const { Client, query: q } = require('faunadb')

module.exports = function deleteContact(userinfo) {
    const client = new Client({
        secret: process.env.FAUNA_SECRET
    })
    client.query(
        q.Delete(
            q.Match(q.Index("contacts_by_name"), { name: userinfo.name })
        )
    )
}