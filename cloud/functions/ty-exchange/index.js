const cloud = require('wx-server-sdk');
const createHash = require('./service')

cloud.init({});

const db = cloud.database();
const _ = db.command;
const dish = db.collection('dish')
const exchangeRecord = db.collection('exchangeRecord')

exports.main = async (event, context) => {
    const { commodityId } = event
    const wxContext = cloud.getWXContext(context);
    const { OPENID } = wxContext;
    
    const { data } = await dish.where({ dish_id: _.eq(commodityId) }).get()

    const { price, name, img } = data[0]
    let integral = price * 10
    
    let record = {
        uid: OPENID,
        name,
        dishId: commodityId,
        img,
        integral,
        buildDate: new Date(),
        recordId: createHash
    }

    const { errMsg } = await exchangeRecord.add({ data: { ...record} })
    return { success: true, data, errMsg }
}