const fetch = require("./fetch");

// test: {"address": "tz1iyFi4WjSttoja7Vi1EJYMEKKSebQyMkF9"}
// https://api.teztok.com/v1/graphql

module.exports = async (address) => {
  console.log(`⚡ fetching content for address ${address}`);
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
    artist_address
  }
}
`,
      variables: {
        address,
      },
      operationName: "addressObjkts",
    },
  });

  console.log("OUTPUT: "+result.data);

  if (!result || !result.data) {
    console.log("DATA-ERROR")
    console.error(result.data);
    return;
  }

  

  return result.data.tokens;
};
