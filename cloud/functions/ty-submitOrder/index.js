
const cloud = require('wx-server-sdk');
const createHash = require('./service')

cloud.init({});

const db = cloud.database();
const _ = db.command;
const dish = db.collection('dish')
const orderForm = db.collection('orderForm');

exports.main = async (event, context) => {
  const { menuIdList, note } = event
  const wxContext = cloud.getWXContext(context);
  const { OPENID } = wxContext;
  let sumPrice = 0
  let menuList = [];
  for(let i = 0; i < menuIdList.length; i++) {
    let dist = {}
    const { dishId, count } = menuIdList[i]
    const { data } = await dish.where({ dish_id: _.eq(dishId) }).get()

    const { price, name } = data[0]
    dist = { price, name, dishId, count }
    sumPrice = count * price + sumPrice
    menuList.push(dist)
  }

  let order = {
    uid: OPENID,
    menuList,
    note,
    sumPrice,
    orderId: createHash
  }

  const { errMsg } = await orderForm.add({ data: { ...order} })

  return { success: true, errMsg };
};
