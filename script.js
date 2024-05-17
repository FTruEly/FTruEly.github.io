/*************************************

项目名称：iTunes-系列解锁合集
更新日期：2024-05-17
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！
使用说明：如果脚本无效，请先排除是否脚本冲突
特别说明：此脚本可能会导致App Store无法登录ID
解决方法：关[MITM][脚本][代理工具]方法选一即可
已解锁App传送门：https://too.st/iTunes

**************************************

[rewrite_local]
^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/iTunes.js

[mitm]
hostname = buy.itunes.apple.com

*************************************/


var chxm1023 = JSON.parse($response.body);
const ua = $request.headers['User-Agent'] || $request.headers['user-agent'];
const bundle_id = chxm1023.receipt["bundle_id"] || chxm1023.receipt["Bundle_Id"];

const list = {
  'com.zerone.hidesktop': { cm: 'sjblb', hx: 'hxpda', version: "4", id: "com.zerone.hidesktop.forever", latest: "chxm1023" },  //iScreen-桌面小组件主题美化
};

//核心内容处理
for (const i in list) {
  if (new RegExp(`^${i}`, `i`).test(ua) || new RegExp(`^${i}`, `i`).test(bundle_id)) {
  //内购数据
  var receiptdata = {  "quantity":"1", "purchase_date_ms":"1694250549000", "transaction_id":"490001314520000", "is_trial_period":"false", "original_transaction_id":"490001314520000", "purchase_date":"2023-09-09 09:09:09 Etc/GMT", "product_id":(list[i].id), "original_purchase_date_pst":"2023-09-09 02:09:10 America/Los_Angeles", "in_app_ownership_type":"PURCHASED", "original_purchase_date_ms":"1694250550000", "purchase_date_pst":"2023-09-09 02:09:09 America/Los_Angeles", "original_purchase_date":"2023-09-09 09:09:10 Etc/GMT"  };
  //识别数据，处理到期时间或永久，多重购买
  if (list[i].cm.indexOf('sjbla') != -1) {  sjbl = [Object.assign({}, receiptdata, {  "expires_date":"2099-09-09 09:09:09 Etc/GMT", "expires_date_pst":"2099-09-09 06:06:06 America/Los_Angeles", "is_in_intro_offer_period":"false", "web_order_line_item_id":"490000123456789", "expires_date_ms":"4092599349000",  })];} else if (list[i].cm.indexOf('sjblb') != -1) {  sjbl = [(receiptdata)];} else if (list[i].cm.indexOf('sjblc') != -1) {  sjbl = [];  } else if (list[i].cm.indexOf('sjbld') != -1) {  sjbl = [Object.assign({}, receiptdata, {  "product_id":(list[i].ids)}), Object.assign({}, receiptdata, {  "expires_date":"2099-09-09 09:09:09 Etc/GMT", "expires_date_pst":"2099-09-09 06:06:06 America/Los_Angeles", "is_in_intro_offer_period":"false", "web_order_line_item_id":"490000123456789", "expires_date_ms":"4092599349000", "product_id":(list[i].id)  })];}
  //常用数据核心(有到期时间)
  if (list[i].hx.indexOf('hxpda') != -1) {  chxm1023["receipt"]["in_app"] = (sjbl); chxm1023["latest_receipt_info"] = (sjbl); chxm1023["pending_renewal_info"] = [{  "product_id" : (list[i].id), "original_transaction_id" : "490001314520000", "auto_renew_product_id" : (list[i].id), "auto_renew_status" : "1"  }]; chxm1023["latest_receipt"] = (list[i].latest);  }
  //永久数据核心(无到期时间)
  if (list[i].hx.indexOf('hxpdb') != -1) {  chxm1023["receipt"]["in_app"] = (sjbl);  }
  //新核心-类似解压小橙子
  if (list[i].hx.indexOf('hxpdc') != -1) {  chxm1023["receipt"]["in_app"] = (sjbl);  }
  //通用数据(可有可无)
  var commondata = {  "request_date": "2023-09-09 16:06:27 Etc/GMT", "request_date_pst": "2023-09-09 06:06:27 America/Los_Angeles", "request_date_ms": "1694273635000", "original_purchase_date": "2023-09-09 16:00:00 Etc/GMT", "original_purchase_date_pst": "2023-09-09 06:00:00 America/Los_Angeles", "original_purchase_date_ms": "1694273430000", "receipt_creation_date": "2023-09-09 16:06:26 Etc/GMT", "receipt_creation_date_pst": "2023-09-09 06:06:26 America/Los_Angeles", "receipt_creation_date_ms": "1694273634000", "original_application_version": list[i].version}; chxm1023["receipt"] = Object.assign({}, chxm1023["receipt"], commondata );
  //判断是否需要加入版本号(可有可无)
  if(list[i] && list[i].version && list[i].version.trim() !== '') {  chxm1023["receipt"]["original_application_version"] = list[i].version;  }
  chxm1023["Telegram"] = "https://t.me/chxm1023";
  chxm1023["warning"] = "仅供学习，禁止转载或售卖";
  break;
  }
}

console.log('已操作成功🎉🎉🎉\n叮当猫の分享频道: https://t.me/chxm1023');

$done({body: JSON.stringify(chxm1023)});
