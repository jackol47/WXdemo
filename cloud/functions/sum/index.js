const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

const user = db.collection('user')

exports.main = async(event, context) => {
  
  return { user }
}