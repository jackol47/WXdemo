const cloud = require('wx-server-sdk');

cloud.init({});

const db = cloud.database();
const _ = db.command;
const user = db.collection('user')

exports.main = async (event, context) => {
    const { remainder } = event
    const wxContext = cloud.getWXContext(context);
    const { OPENID } = wxContext;

    const res = await user.where({ uid: _.eq(OPENID)}).update({
        data: {
            interPoint: remainder
        }
    })

    return { success: res, remainder };
}