import Post from "../models/post.js";
import User from "../models/user.js";

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      likes: {},
      comments: [],
    });
    await newPos.save();
    const post = await Post.find();
    res.status(201).json(post);
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLinked = post.likes.get(userId);

    if (isLinked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatePost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true },
    );

    res.status(200).json();
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
