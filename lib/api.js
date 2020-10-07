import client from "./sanity";

const blogFields = `
    title,
    subtitle,
    'slug': slug.current,
    date,
    'coverImage': coverImage.asset->url
`;

export async function getAllBlogs() {
  const res = await client.fetch(`*[_type == "blog"]{${blogFields}}`);
  return res;
}
