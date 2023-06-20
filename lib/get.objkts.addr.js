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
 objkt_token(where: {_or: {token_holders: {holder_id: {_eq: $address}}, supply: {_gt: 0}, creator: {address: {_eq: $address}}}}, distinct_on: id) {
    artifact_uri
    creator_id
    display_uri
    id
    metadata
    mime
    thumbnail_uri
  }
}`,
      variables: {
        address,
      },
      operationName: "addressObjkts",
    },
  });

  if (!result || !result.data || !result.objkt_token) {
    console.error(result);
    return;
  }

  // console.log(result.data.objkt_token_holder);

  return result.data.objkt_token;
};
