const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
const _ = db.command;
const user = db.collection('user');

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext(context);
  const { OPENID } = wxContext;
  
  if (OPENID) {
    const { data } = await user.where({ uid: _.eq(OPENID) }).get();

    if (Array.isArray(data) && data.length === 0) {
      const { errMsg } = await user.add({
        // data 字段表示需新增的 JSON 数据
        data: {
          uid: OPENID,
          interPoint: 0,
          joinDate: new Date()
        }
      });
      return (errMsg === 'collection.add:ok') ? { success: true, data: {uid: OPENID} } : { success: false, errMsg: '添加用户失败' };
    }
    return { success: true, data: {uid: OPENID} } 
  }
  return { success: false, errMsg: '获取uid失败' }
}
