import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import fetcher from "@/lib/fetcher";
import Author from "./_child/author";
import Spinner from "./_child/spinner";
import Error from "./_child/error";

export default function section3() {
  const { data, isLoading, isError } = fetcher("/api/popular");
  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  return (
    <section className="container mx-auto md:px-20 py-10">
      <h1 className="text-4xl font-bold py-10 text-center">Most Popular</h1>
      <Swiper
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
        }}
      >
        {data.map((value, index) => (
          <SwiperSlide key={index}>
            <Post data={value} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

function Post({ data }) {
  const { id, title, category, img, published, subtitle, author } = data;

  return (
    <div className="grid mx-5">
      <div className="images">
        <Link href={`/posts/${id}`}>
          <span>
            <Image src={img || "/"} alt="image" width={600} height={400} />
          </span>
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
            <span className="text-xl md:text-2xl font-bold text-gray-800 hover:text-gray-600">
              {title || "title"}
            </span>
          </Link>
        </div>
        <p className="text-gray-500 py-3">{subtitle || "subtitle"}</p>
        <Author {...author}/>
      </div>
    </div>
  );
}
