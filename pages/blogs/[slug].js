import { useEffect, useState } from "react";
import ErrorPage from "next/error";
import { Row, Col } from "react-bootstrap";
import moment from "moment";
import { useRouter } from "next/router";

import { getBlogBySlug, getAllBlogs, onBlogUpdate, urlFor } from "lib/api";

import BlogContent from "components/BlogContent";
import PreviewAlert from "components/PreviewAlert";
import PageLayout from "components/PageLayout";
import BlogHeader from "components/BlogHeader";

const BlogDetail = ({ blog: initialBlog, preview }) => {
  const router = useRouter();
  const [blog, setBlog] = useState(initialBlog);

  if (!initialBlog) {
    return <ErrorPage statusCode="404" />;
  }

  useEffect(() => {
    let sub;
    if (preview) {
      sub = onBlogUpdate(blog.slug).subscribe((update) => {
        setBlog(update.result);
      });
    }

    return () => sub && sub.unsubscribe();
  }, []);

  // if (!router.isFallback && !blog?.slug) {
  //   return <ErrorPage statusCode="404" />;
  // }

  if (router.isFallback) {
    return <PageLayout className="blog-detail-page">Loading...</PageLayout>;
  }

  return (
    <PageLayout className="blog-detail-page">
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          {preview && <PreviewAlert />}
          <BlogHeader
            title={blog.title}
            subtitle={blog.subtitle}
            coverImage={urlFor(blog.coverImage).height(600).url()}
            author={blog.author}
            date={moment(blog.date).format("LL")}
          />
          <hr />
          {blog.content && <BlogContent content={blog.content} />}
        </Col>
      </Row>
    </PageLayout>
  );
};

export async function getStaticProps({ params, preview = false, previewData }) {
  const blog = (await getBlogBySlug(params.slug, preview)) || null;
  return {
    props: { blog, preview },
    revalidate: 1,
  };
}

// TODO: Introduce fallback
export async function getStaticPaths() {
  const blogs = await getAllBlogs();
  const paths = blogs?.map((b) => ({ params: { slug: b.slug } }));
  return {
    paths,
    fallback: true,
  };
}

export default BlogDetail;
