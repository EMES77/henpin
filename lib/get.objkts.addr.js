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
      operationName: "addressObjkts",
    },
  });

  if (!result || !result.data || !result.holdings) {
    console.error("error: "+result);
    return;
  }

  // console.log(result.data.objkt_token_holder);

  return result.data.holdings.token;
};
