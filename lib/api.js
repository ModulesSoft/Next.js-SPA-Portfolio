const API_URL = process.env.API_URL;
export default async function fetchAPI(query, { variables } = {}, token = null) {
  // Set up some headers to tell the fetch call
  // that this is an application/json type
  let headers = null;
  if (token) {
    headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  } else {
    headers = {
      'Content-Type': 'application/json'
    }
  }
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
        databaseId
        title
        excerpt
        slug
        date
        databaseId
        extraProjectsInfo {
          status
          employer
          location
          floors
          employer
          employerLink
          foundation
          scale
          previewImage {
            mediaItemUrl
          }
          thumbnailImage {
            mediaItemUrl
          }
        }
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

  return data?.post;
}

export async function getImagesByParentPost(postId) {
  const data = await fetchAPI(
    `
    query MediaItems ($parentPostId:ID){
      mediaItems(where: {parent: $parentPostId}) {
        nodes {
          altText
          caption
          sourceUrl
          mediaDetails {
            file
            height
            width
            sizes {
              file
              fileSize
              height
              mimeType
              name
              sourceUrl
              width
            }
          }
        }
      }
    }    
  `,
    {
      variables: {
        parentPostId: postId
      }
    });
  return data?.mediaItems.nodes;
}
export async function getAllHomePosts() {
  const data = await fetchAPI(
    `
    {
      posts(first: 10000, where: {categoryName: "home"}) {
        edges {
          node {
            id
            title
            content
            postsInfo {
              farsiKeywords
              englishTitle
              englishKeywords
              englishDescription
            }
            extraHomePostsInfo {
              row
              column
              icon {
                mediaItemUrl
                slug
              }
            }
          }
        }
      }
    }    
  `);
  return data?.posts;
}
export async function getAllFooterPosts() {
  const data = await fetchAPI(
    `
    {
      posts(first: 10000, where: {categoryName: "footer"}) {
        edges {
          node {
            id
            title
            content
            postsInfo {
              farsiKeywords
              englishTitle
              englishKeywords
              englishDescription
            }
            extraFooterPostsInfo {
              row
              column
              icon {
                mediaItemUrl
                slug
              }
            }
          }
        }
      }
    }    
  `);
  return data?.posts;
}
export async function getAllBrands() {
  const data = await fetchAPI(
    `
    {
      posts(first: 10000, where: {categoryName: "brands"}) {
        edges {
          node {
            id
            title
            postsInfo {
              farsiKeywords
              englishTitle
              englishKeywords
              englishDescription
            }
            extraBrandsInfo {
              url
              image {
                mediaItemUrl
              }
            }
          }
        }
      }
    }
    
  `);
  return data?.posts;
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
            postsInfo {
              farsiKeywords
              englishTitle
              englishKeywords
              englishDescription
            }
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

export async function sendContactEmail(from, subject, clientMutationId, body) {
  const data = await fetchAPI(
    `
    mutation sendFormEmail($input : SendEmailInput!){
      sendEmail(input : $input){
        origin
        sent
        message
      }
    }
  `,
    {
      variables: {
        input: {
          body: body,
          from: from,
          replyTo: from,
          subject: subject,
          clientMutationId: clientMutationId
        }
      }
    });
  return data?.sendEmail;
}

export async function loginUser(username, password) {
  const data = await fetchAPI(
    `
    mutation LoginUser($input : LoginInput!) {
      login(input: $input ) {
        authToken,
        refreshToken,
        user {
          id
          name
        }
      }
    }
  `,
    {
      variables: {
        input: {
          username: username,
          password: password
        }
      }
    });
  return data?.login;
}
export const login = (username, password) => {
  const query = `
    mutation LoginUser($input : LoginInput!) {
        login(input: $input ) {
          authToken,
          refreshToken,
          user {
            id
            name
          }
        }
      }
      `
  const variables = {
    input: {
      username,
      password
    }
  }
  return JSON.stringify({ query, variables })
}
export async function refreshAuthToken(token) {
  const data = await fetchAPI(
    `
    mutation refreshJwtAuthToken($input: RefreshJwtAuthTokenInput!) {
      refreshJwtAuthToken(input: $input) {
        authToken
      }
    }
  `,
    {
      variables: {
        input: {
          "jwtRefreshToken": token
        }
      }
    });
  return data?.refreshJwtAuthToken.authToken;
}

export async function createPost() {
  const data = await fetchAPI(
    `
    mutation createPost($input :CreatePostInput!){
      createPost(input:$input){
        post{
          content

        }
      }
    }
  `,
    {
      variables: {
        input: {
          content: "asdasdasd"
        }
      }
    });
  return data?.createPost;
}

export const addPost = (title, content) => {
  const query =
    `
    mutation createPost($input :CreatePostInput!){
      createPost(input:$input){
        post{
          content
        }
      }
    }
  `
  const variables = {
    input: {
      title,
      content
    }
  }
  return JSON.stringify({ query, variables });
}
