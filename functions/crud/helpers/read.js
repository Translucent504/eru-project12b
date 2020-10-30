const { Client, query: q } = require('faunadb')

module.exports = async function readAllContacts() {
    const client = new Client({
        secret: process.env.FAUNA_SECRET
    })
    const result = await client.query(
        q.Map(
            q.Paginate(
                q.Match(
                    q.Index("all_contacts")
                )
            ),
            q.Lambda("X", q.Get(q.Var("X")))
        )
    )
    return result.data
}