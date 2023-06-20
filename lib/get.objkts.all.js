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
  objkt_token(where: {supply: {_gt: 0}}) {
    artifact_uri
    creator_id
    display_uri
    id
    metadata
    mime
    thumbnail_uri
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
