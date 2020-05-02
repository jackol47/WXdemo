const cloud = require('wx-server-sdk');

cloud.init({});

const db = cloud.database();
const _ = db.command;
const orderForm = db.collection('orderForm');

exports.main = async (event, context) => {
  const wxContent = cloud.getWXContext(context)
  const { OPENID } = wxContent;
  const { data } = await orderForm.where({ uid: _.eq(OPENID) }).get();
  let orderList = [];
  if (!Array.isArray(data))
    return { success: false, errMsg: '获取订单列表失败' };
  if (data.length === 0)
    return { success: true, data: { orderList: [] }, errMsg: '订单列表为空' };
  data.forEach((item) => {
    let order = {};
    order['menuList'] = item.menuList;
    order['orderId'] = item.orderId;
    order['note'] = item.note;

    orderList.push(order);
  });

  return { success: true, data: { orderList }, errMsg: 'ok' };
};
