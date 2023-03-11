import React from "react";
import Image from "next/image";
import Link from "next/link";
import fetcher from "../lib/fetcher";
import Author from "./_child/author";
import Spinner from "./_child/spinner";
import Error from "./_child/error";

export default function section2() {
  const { data, isLoading, isError } = fetcher("/api/posts");
  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  return (
    <section className="container mx-auto md:px-20 py-10">
      <h1 className="text-4xl font-bold py-12 text-center">Latest Posts</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {data.map((value, index) => (
          <Post data={value} key={index} />
        ))}
      </div>
    </section>
  );
}

function Post({ data }) {
  const { id, title, category, img, published, subtitle, author } = data;
  return (
    <div className="item">
      <div className="image">
        <Link href={`/posts/${id}`}>
          <Image src={img || "/"} alt='image' width={500} height={350} />
        </Link>
      </div>
      <div className="info flex justify-center flex-col py-4">
        <div className="cat">
          <Link href={`/posts/${id}`}>
            <span className="text-orange-600 hover:text-orange-800">
              {category || "Unknown"}
            </span>
          </Link>
          <Link href={`/posts/${id}`}>
            <span className="text-gray-800 hover:text-gray-600">
              - {published || "Unknown"}
            </span>
          </Link>
        </div>
        <div className="title">
          <Link href={`/posts/${id}`}>
            <span className="text-xl font-bold text-gray-800 hover:text-gray-600">
              {title}
            </span>
          </Link>
        </div>
        <p className="text-gray-500 py-3">{subtitle}</p>
        {author && <Author {...author} />}
      </div>
    </div>
  );
}
