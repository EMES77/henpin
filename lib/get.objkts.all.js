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
query allObjkts($address: String!) {
  holdings(where: {holder_address: {_eq: $address}}) {
    token {
      artifact_uri
      artist_address
      display_uri
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

  if (!result || !result.data || !result.data.holdings.token) {
    console.error(result);
    return;
  }

  // console.log(result.data.objkt_token_holder);
  console.log(
    `✅ found ${result.data.holdings.token.length.toLocaleString()} unburned objkts`
  );
  return result.data.holdings.token;
};
