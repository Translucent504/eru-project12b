require('dotenv').config()
const createContact = require('./helpers/create')
const deleteContact = require('./helpers/delete')
const readAllContacts = require('./helpers/read')
// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
// event = {
//   "path": "Path parameter",
//   "httpMethod": "Incoming request's method name"
//   "headers": {Incoming request headers}
//   "queryStringParameters": {query string parameters }
//   "body": "A JSON string of the request payload."
//   "isBase64Encoded": "A boolean flag to indicate if the applicable request payload is Base64-encode"
// }
exports.handler = async event => {
  const path = event.path.split('/')
  try {
    switch (event.httpMethod) {
      case "GET":
        console.log(event.path, process.env.FAUNA_SECRET)
        if (path.length === 4) {
          const result = await readAllContacts()
          return { statusCode: 200, body: JSON.stringify(result) }
        }
        return { statusCode: 400, body: 'Bad request, should be of the form /.netlify/functions/crud' }
      case "POST":
        if (path.length === 4) {
          createContact(JSON.parse(event.body))
          return { statusCode: 200, body: "created" }
        }
        return { statusCode: 400, body: 'Bad request, should be of the form /.netlify/functions/crud' }
      case "DELETE":
        if (path.length === 4) {
          deleteContact(JSON.parse(event.body))
          return { statusCode: 200, body: 'Deleted' }
        }
        break;
      default:
        break;
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}
