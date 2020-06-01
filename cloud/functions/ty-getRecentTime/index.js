const cloud = require('wx-server-sdk');

cloud.init({});

const db = cloud.database();
const _ = db.command;
const orderForm = db.collection('orderForm')

exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext(context)
    const { OPENID } = wxContext;
    const { data } = await orderForm.where({ uid: _.eq(OPENID) }).get();
    const recentOrder = data[data.length - 1]

    return { success: true, data: { recentOrder } }
}