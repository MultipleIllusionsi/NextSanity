import client from "./sanity";

const blogFields = `
    title,
    subtitle,
    'slug': slug.current,
    date,
    'author': author->{name, 'avatar': avatar.asset->url},
    'coverImage': coverImage.asset->url
`;

export async function getAllBlogs() {
  const res = await client.fetch(`*[_type == "blog"]{${blogFields}}`);
  return res;
}
