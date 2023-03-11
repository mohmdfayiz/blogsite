import Format from "../../layout/format";
import Author from '../../components/_child/author'
import Image from "next/image";
import Related from '../../components/_child/related'
import getPosts from "../../lib/helper";
import fetcher from "../../lib/fetcher";
import Error from "../../components/_child/error";
import Spinner from "../../components/_child/error";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";

export default function Page({fallback}){
    const router = useRouter();
    const {postId} = router.query;
    const {data, isLoading, isError} = fetcher(`/api/posts/${postId}`)
    if(isLoading) return <Spinner />
    if(isError) return <Error />

    return( <SWRConfig value={{fallback}}><Article {...data}/></SWRConfig>)
}

export function Article({ id, title, category,description, img, published, subtitle, author }) {
  return (
    <Format>
        <section className="container mx-auto md:px-2 py-16 w-1/2">
            <div className="flex justify-center">
                <Author {...author}/>
            </div>
            <div className="post py-10">
                    <h1 className='font-bold text-4xl text-center pb-5'>{title || "title"}</h1>

                    <p className='text-gray-500 text-xl text-center'>{subtitle || "Subtitle"}</p>

                    <div className="py-10">
                        <Image src={img || "/"} alt="Image" width={900} height={600}></Image>
                    </div>

                    <div className="content text-gray-600 text-lg flex flex-col gap-4">
                        {description || "..."}
                    </div>

                </div>  
                <Related />
        </section>
    </Format>
  );
}

export async function getStaticProps({params}){
    const post = await getPosts(params.postId)
    return{
        props: {
            fallback:{
                '/api/posts' : post
            }
        }
    }
}

export async function getStaticPaths(){
    const posts = await(getPosts())
    const paths = posts.map(value=>{
        return{
            params:{
                postId: value.id.toString()
            }
        }
    })

    return {
        paths,
        fallback:false
    }
}