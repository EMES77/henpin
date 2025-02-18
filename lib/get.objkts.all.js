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
query addressObjkts($address: String!) {
  tokens(where: {holdings: {holder_address: {_eq: $address}}}) {
    artifact_uri
    display_uri
    thumbnail_uri
    minter_address
  }
}
`,
      variables: {
        address,
      },
      operationName: "allObjkts",
    },
  });

  if (!result || !result.data) {
    console.error(result);
    return;
  }

  // console.log(result.data.objkt_token_holder);
  console.log(
    `✅ found ${result.data.tokens.length.toLocaleString()} unburned objkts`
  );
  return result.data.tokens;
};
