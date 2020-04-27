const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext(context);
  const { OPENID } = wxContext;
  if (OPENID) {
    return { data: { OPENID }, success: true };
  }
  return { success: false };
};
