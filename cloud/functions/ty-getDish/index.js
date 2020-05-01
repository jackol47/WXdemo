const cloud = require('wx-server-sdk');

cloud.init({});

const db = cloud.database();
const _ = db.command;
const dish = db.collection('dish');

exports.main = async (event, context) => {
  const { data } = await dish.get();
  let dishList = []
  data.forEach(item => {
    let dish = {}
    Object.keys(item).forEach(element => {
      if(element !== '_id') {
        dish[`${element}`] = item[`${element}`]
      }
    })
    dishList.push(dish)
  })
  return { success: true, data: { dishList }, errMsg: 'ok' };
};
