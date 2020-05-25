const cloud = require('wx-server-sdk');

cloud.init({});

const db = cloud.database();
const _ = db.command;
const exchangeRecord = db.collection('exchangeRecord');

exports.main = async (event, context) => {
    const { data } = await exchangeRecord.get();
    let recordList = []
    data.forEach(item => {
        let commodity = {}
        Object.keys(item).forEach(element => {
            if (element !== '_id') {
                commodity[`${element}`] = item[`${element}`]
            }
        })
        recordList.push(commodity)
    })
    return { success: true, data: { recordList }, errMsg: 'ok' };
};