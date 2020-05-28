const cloud = require('wx-server-sdk');

cloud.init({});

const db = cloud.database();
const _ = db.command;
const orderForm = db.collection('orderForm')

exports.main = async (event, context) => {
    const { orderId } = event 
    const wxContext = cloud.getWXContext(context);
    const { OPENID } = wxContext;

    await orderForm.where({ orderId: _.eq(orderId)}).update({
        data: {
            status: '已付款'
        }
    })

    return { success: true, orderId }
}