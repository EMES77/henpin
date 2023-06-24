// const getBlockedObj = require("./get.blocked.obj");
const getBlockedTz = require("./get.blocked.tz");
const pin = require("./ipfs.pin");
const assets = ["artifact_uri", "display_uri", "thumbnail_uri"];
const config = require("../config");

module.exports = async (objkts, afterEach) => {
  // const [oblock, wblock] = await Promise.all([getBlockedObj(), getBlockedTz()]);
  const wblock = await getBlockedTz();
  const good_items = objkts.filter((o) => !wblock.includes(o.artist_address));
  const bad_items = objkts.filter((o) => wblock.includes(o.artist_address));
  

  for (let i = 0; i < good_items.length; i++) {
    let item = good_items[i].token;
    let failure = false;
    for (let a = 0; a < assets.length; a++) {
      let key = assets[a];
      console.log("debug key: "+key);
      let hash = item[key];
      if (!hash) {
        console.error(`🚨 objkt has no value for ${key}`, item);
        continue;
      }
      if (config.ignore.includes(hash)) {
        console.log(`✅ ignored ${hash}`);
        continue;
      }
      let result = await pin(hash, "add", `${item.id}-${key}`);
      if (!result) failure = true;
    }
    if (!failure && afterEach) await afterEach(item.id, "add");
  }
  for (let i = 0; i < bad_items.length; i++) {
    let item = bad_items[i];
    let failure = false;
    for (let a = 0; a < assets.length; a++) {
      let key = assets[a];
      let hash = item[key];
      if (!hash) {
        console.error(`🚨 objkt has no value for ${key}`, item);
        continue;
      }
      if (config.ignore.includes(hash)) {
        console.log(`✅ ignored ${hash}`);
        continue;
      }
      let result = await pin(item[key], "rm", `${item.id}-${key}`);
      if (!result) failure = true;
    }
    if (!failure && afterEach) await afterEach(item.id, "rm");
  }
};
