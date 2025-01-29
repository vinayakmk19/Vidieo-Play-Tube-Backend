import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { deleteVideo, getVideoById, publishAVideo, togglePublishStatus, updateVideo } from "../controllers/video.controller.js";

const router = Router();

router.route("/publish-video").post(
  verifyJWT,
  upload.fields([
    { name: "videoFile", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  publishAVideo
);

router.route("/getvideo/:videoId").get(getVideoById);
router.route("/updatevideo/:videoId").patch(verifyJWT, upload.single('thumbnail'), updateVideo);
router.route("/deletevideo/:videoId").delete(verifyJWT, deleteVideo);
router.route("/change-publish-status/:videoId").patch(verifyJWT, togglePublishStatus);




export default router;