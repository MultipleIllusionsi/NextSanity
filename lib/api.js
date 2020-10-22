import client from "./sanity";
import imageUrlBuilder from "@sanity/image-url";

const blogFields = `
    title,
    subtitle,
    'slug': slug.current,
    date,
    'author': author->{name, 'avatar': avatar.asset->url},
    coverImage
`;

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

export async function getAllBlogs({ offset } = { offset: 0 }) {
  const res = await client.fetch(
    `*[_type == "blog"] | order(_createdAt desc) {${blogFields}}[${offset}...${offset + 3}]`
  );
  return res;
}

export async function getBlogBySlug(slug) {
  const res = await client
    .fetch(
      `*[_type == "blog" && slug.current == $slug]{${blogFields}, content[]{..., "asset": asset->}}`,
      {
        slug,
      }
    )
    .then((res) => res?.[0]);

  return res;
}
