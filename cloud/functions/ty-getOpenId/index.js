const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

const user = db.collection('user')

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext(context);
  const { name } = event
  const { OPENID } = wxContext;
  if (OPENID) {
    return { data: { OPENID }, success: true };
  }
  return { success: false, name };
};
