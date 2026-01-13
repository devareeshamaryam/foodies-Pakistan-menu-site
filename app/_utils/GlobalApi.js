const { gql, default: request } = require("graphql-request");

const MASTER_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

/**
 * Used to make get category API
 * @returns
 */

const GetCategory = async () => {
  const query = gql`
    {
      categories(first: 1000) {
        id
        name
        slug
        icon {
          url
        }
      }
    }
  `;
  
  const result = await request(MASTER_URL, query);
  return result;
};

export default {
  GetCategory
};