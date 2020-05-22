const cloud = require('wx-server-sdk');

cloud.init({});

const db = cloud.database();
const _ = db.command;
const user = db.collection('user')

exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext(context);
    const { OPENID } = wxContext;

    const { data } = await user.where({ uid: _.eq(OPENID) }).get()
    const { interPoint } = data[0]
    return { success: true, data: {integral: interPoint} }
}