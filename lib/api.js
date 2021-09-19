const API_URL = 'http://localhost:8080/graphql';

async function fetchAPI(query, { variables } = {}) {
  // Set up some headers to tell the fetch call
  // that this is an application/json type
  const headers = { 'Content-Type': 'application/json' };

  // build out the fetch() call using the API_URL
  // environment variable pulled in at the start
  // Note the merging of the query and variables
  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables })
  });

  // error handling work
  const json = await res.json();
  if (json.errors) {
    console.log(json.errors);
    console.log('error details', query, variables);
    throw new Error('Failed to fetch API');
  }
  // console.log((json.data.posts.edges));
  return json.data;
}

export async function getAllPosts() {
    const data = await fetchAPI(
      `
      {
        posts(first: 10000) {
          edges {
            node {
              id
              title
              extraProjectsInfo {
                status
                employer
                position
                floors
                employer
                foundation
                previewImage {
                  mediaItemUrl
                }
                thumbnailImage {
                  mediaItemUrl
                }
              }
              slug
              date
              authorId
            }
          }
        }
      }
    `);
    return data?.posts;
  }
  export async function getAllPostsWithSlug() {
    const data = await fetchAPI(
      `
      {
        posts(first: 10000) {
          edges {
            node {
              slug
            }
          }
        }
      }
    `
    );
    return data?.posts;
  }
  export async function getPost(slug) {
    const data = await fetchAPI(
      `
      fragment PostFields on Post {
        title
        excerpt
        slug
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
      query PostBySlug($id: ID!, $idType: PostIdType!) {
        post(id: $id, idType: $idType) {
          ...PostFields
          content
        }
      }
    `,
      {
        variables: {
          id: slug,
          idType: 'SLUG'
        }
      }
    );
  
    return data;
}
export async function getAllProjects() {
  const data = await fetchAPI(
    `
    {
      posts(first: 10000, where: {categoryName: "projects"}) {
        edges {
          node {
            id
            title
            extraProjectsInfo {
              status
              employer
              scale
              floors
              employer
              foundation
              previewImage {
                mediaItemUrl
              }
              thumbnailImage {
                mediaItemUrl
              }
            }
            slug
            date
            authorId
          }
        }
      }
    }
  `);
  return data?.posts;
}
