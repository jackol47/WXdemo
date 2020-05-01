const cloud = require('wx-server-sdk')

cloud.init({
})

const db = cloud.database()

const user = db.collection('user')

const dish = db.collection('dish')

const history = db.collection('history')

const orderForm = db.collection('orderForm')

exports.main = async(event, context) => {
    
    return {}
}