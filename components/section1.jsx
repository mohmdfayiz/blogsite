import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SwiperCore, { Autoplay } from "swiper";
import fetcher from "@/lib/fetcher";
import Author from "./_child/author";
import Spinner from "./_child/spinner";
import Error from "./_child/error";

export default function section1() {
  const { data, isLoading, isError } = fetcher("/api/trending");
  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  const bg = {
    background: "url('/images/banner.png') no-repeat",
    backgroundPosition: "right",
  };

  SwiperCore.use([Autoplay]);

  return (
    <section className="py-16" style={bg}>
      <div className="container mx-auto md:px-20">
        <h1 className="font-bold text-4xl pb-12 text-center">Trending</h1>
        <Swiper
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 2000,
          }}
        >
          {data.map((value, index) => (
            <SwiperSlide key={index}><Slide data={value} /></SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

function Slide({data}) {
  const { id, title, category, img, published, description , author } = data;
  return (
    <div className="grid md:grid-cols-2">
      <div className="image">
        <Link href={`/posts/${id}`}>
          <Image src={img || '/'} alt="image" width={600} height={600} />
        </Link>
      </div>
      <div className="info p-5 flex justify-center flex-col">
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
            <span className="text-3xl md:text-5xl font-bold text-gray-800 hover:text-gray-600">
              {title || "title"}
            </span>
          </Link>
        </div>
        <p className="text-gray-500 py-3">
          {description}
        </p>
        <Author {...author}/>
      </div>
    </div>
  );
}
