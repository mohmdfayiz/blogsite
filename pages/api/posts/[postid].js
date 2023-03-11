import data from "../data";

export default function handler(req, res) {
    const { postid } = req.query;
    const { Posts } = data;

    if (postid) {
        const post = Posts.find(value => value.id == postid)
        res.status(200).json(post)
    }

    return res.status(404).json({ error: 'Post could not found!' })
}