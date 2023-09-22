import { Inter } from "next/font/google";
import { getAllPosts } from "@/utils/api";
import PostCard from "@/components/PostCard";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ posts }) {
  const [postLimit, setPostLimit] = useState(8);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const bodyHeight = document.body.offsetHeight;

    if (scrollY + windowHeight >= bodyHeight - 200) {
      setPostLimit((limit) => {
        if (postLimit >= posts.length) {
          return limit;
        }
        return limit + 8;
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className={`${inter.className} flex flex-col items-center p-8`}>
      <h1 className="text-2xl font-semibold uppercase tracking-tighter mb-4">
        All posts
      </h1>
      <div className="flex flex-col gap-4">
        {posts.slice(0, postLimit).map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const posts = await getAllPosts();

  return {
    props: { posts },
  };
}
