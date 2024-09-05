const blogPost = require("../models/blogPost");
const BlogPost = require("../models/blogPost");
const mongoose = require("mongoose");

const blogcreate = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res
      .status(400)
      .send({ message: "Please fill the required fields." });
  }
  try {
    const blog = await BlogPost.findOne({ title });
    if (blog) {
      return res.status(400).send({ message: "Blog already exists." });
    }
    const newBlog = new BlogPost({ title, content });
    await newBlog.save();
    res.status(201).send({
      message: "Blog created successfully",
      title: newBlog.title,
      content: newBlog.content,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Server error", error: error.message });
  }
};

const bloglist = async (req, res) => {
  try {
    const blogs = await BlogPost.find();
    return res.status(200).json(blogs);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid blog ID" });
  }

  try {
    const update = await BlogPost.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    if (!update) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res
      .status(200)
      .json({ message: "Blog updated successfully", update });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteB = await BlogPost.findByIdAndDelete(id);
    if (!deleteB) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res
      .status(200)
      .json({ message: "Blog deleted successfully", deleteB });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
const addComment = async (req, res) => {
    const { id } = req.params;
    const { author, content } = req.body;

    console.log(`Received request to add comment to blog post with ID: ${id}`);
    console.log(`Author: ${author}, Content: ${content}`);

    try {
        const blogPost = await BlogPost.findById(id);
        if (!blogPost) {
            console.log("Blog post not found.");
            return res.status(404).json({ message: "Blog post not found." });
        }

        console.log("Blog post found. Adding comment...");
        blogPost.comments.push({ author, content });

        await blogPost.save();
        console.log("Comment added successfully.");

        res.status(201).json({ message: "Comment added successfully!", comments: blogPost.comments });
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



const getComments=async(req,res)=>{
    const{id}=req.params;
    try {
        const blogPost=await BlogPost.findById(id);
        if(!blogPost){
            res.status(404).json({ message: "blog post not found." });
        }
            res.status(200).json(blogPost.comments)
    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message });

    }
}

const deleteComment = async (req, res) => {
    const { id, commentId } = req.params;

    try {
        const blogPost = await BlogPost.findById(id);
        if (!blogPost) {
            return res.status(404).json({ message: "Blog post not found." });
        }

        const comment = blogPost.comments.id(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found." });
        }

        blogPost.comments.pull(commentId);;
        await blogPost.save();

        res.status(200).json({ message: "Comment deleted successfully!" });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { blogcreate, bloglist, updateBlog, deleteBlog,addComment, getComments,deleteComment };
