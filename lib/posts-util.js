import fs from "fs";
import path from "path";

import metter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export function getPostFiles() {
  return fs.readdirSync(postsDirectory);
}

export function getPostData(postIdentifier) {
  const postSlug = postIdentifier.replace(/\.md$/, "");
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = metter(fileContent);

  const postData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
}

export function getAllPosts() {
  const postsFiles = getPostFiles();

  // for (const postFile of postsFiles) {
  //   getPostData(postFile);
  // }

  const allPosts = postsFiles.map((file) => getPostData(file));

  const sortedPost = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );

  return sortedPost;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();

  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  return featuredPosts;
}
