const fetch = require("./fetch");
// https://api.teztok.com/v1/graphql

module.exports = async (address) => {
  console.log(`⚡ updating list of all objkts`);
  // console.log(`getting creations and collection for ${address}`);
  const result = await fetch("https://api.teztok.com/v1/graphql", {
    json: true,
    method: "POST",
    body: {
      query: `
query allObjkts {
  holdings(where: {holder_address: {_eq: "tz1UecmgMghaWovhh9EYfqTrK9gTtaiMtbzs"}}) {
    token {
      artifact_uri
      creators
      display_uri
      metadata
      mime_type
      thumbnail_uri
    }
  }
}
`,
      variables: {
        address,
      },
      operationName: "allObjkts",
    },
  });

  if (!result || !result.data || !result.data.objkt_token) {
    console.error(result);
    return;
  }

  // console.log(result.data.objkt_token_holder);
  console.log(
    `✅ found ${result.data.objkt_token.length.toLocaleString()} unburned objkts`
  );
  return result.data.objkt_token;
};
