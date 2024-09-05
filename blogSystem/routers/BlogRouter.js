const {blogcreate,bloglist,updateBlog,deleteBlog,addComment, getComments,deleteComment}=  require('../controllers/blogController')
const express=require('express')
const router=express.Router();

router.post('/creat',blogcreate)
router.get('/',bloglist)
router.put('/:id',updateBlog)
router.delete('/:id',deleteBlog)
router.post('/:id/comments',addComment);
router.get('/:id/comments',getComments);
router.delete('/:id/comments/:commentId',deleteComment);

module.exports=router