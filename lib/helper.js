const baseUrl = 'https://blogsite-wheat.vercel.app/'

export default async function getPosts(id){
    const res = await fetch(baseUrl)
    const posts = await res.json()

    if(id){
        return posts.find(post => post.id == id)
    }

    return posts;
}
