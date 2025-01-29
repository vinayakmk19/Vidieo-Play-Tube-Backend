import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  uploadOnCloudinary,
  destroyFromCloudinary,
} from "../utils/cloudinary.js";
import { ObjectId } from "mongodb";

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  //TODO: get all videos based on query, sort, pagination
});

// uploading video or creating video
const publishAVideo = asyncHandler(async (req, res) => {
  // TODO: get video, upload to cloudinary, create video

  const { title, description } = req.body;

  if (!title) {
    throw new ApiError(404, "Title for the video is required.");
  }

  if (!description) {
    throw new ApiError(404, "Description for the video is required.");
  }

  const videoFileLocalPath = req.files?.videoFile[0]?.path;
  const thumbnailLocalPath = req.files?.thumbnail[0]?.path;

  if (!videoFileLocalPath) {
    throw new ApiError(404, "Video File is required.");
  }

  if (!thumbnailLocalPath) {
    throw new ApiError(404, "thumbnail is required.");
  }

  const videofile = await uploadOnCloudinary(videoFileLocalPath);
  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

  if (!(videofile && thumbnail)) {
    throw new ApiError(400, "video and thumbnail is not uploaded on cdnry.");
  }

  const video = await Video.create({
    videoFile: videofile.url,
    thumbnail: thumbnail.url,
    title: title,
    description: description,
    duration: videofile.duration,
    owner: req.user?._id,
  });

  if (!video) {
    throw new ApiError(500, "Something went wrong while uploading a video");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video uploaded successfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
  //TODO: get video by id
  const { videoId } = req.params;

  if (!videoId) {
    throw new ApiError(400, "Please provide VideoID to get the video");
  }
  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(
      500,
      "No video is found with the given video id. check id properly."
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video fetched successfully"));
});

const updateVideo = asyncHandler(async (req, res) => {
  //TODO: update video details like title, description, thumbnail

  const { videoId } = req.params;
  const { title, description } = req.body;
  const thumbnailLocalPath = req.file.path;

  const videoObjectId = new ObjectId(videoId);

  const getVideoByid = await Video.findById(videoObjectId);
  if (!getVideoByid) {
    throw new ApiError(500, `No video found by id ${videoObjectId}`);
  }

  const parts = getVideoByid?.thumbnail.split("/");
  const cloudinary_public_id = parts[parts.length - 1].split(".")[0];

  await destroyFromCloudinary(cloudinary_public_id);

  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

  if (!thumbnail.url) {
    throw new ApiError(400, "Error while uploading on Thumbnail");
  }

  const video = await Video.findByIdAndUpdate(
    videoObjectId,
    {
      $set: {
        title: title,
        description: description,
        thumbnail: thumbnail.url,
      },
    },
    { new: true }
  ).select("title description thumbnail");

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video updated successfully"));
});

const deleteVideo = asyncHandler(async (req, res) => {
  //TODO: delete video
  const { videoId } = req.params;

  if(!videoId){
    throw new ApiError(400, "Please provide videoid to delete.")
  }

  const videoObjectId = new ObjectId(videoId);
  
  const videoFromDB = await Video.findById(videoObjectId);
  
  if (!videoFromDB) {
    throw new ApiError(500, `No video found by id ${videoObjectId}`);
  }

  const videoFileparts = videoFromDB?.videoFile.split("/");
  const thumbnailparts = videoFromDB?.thumbnail.split("/");

  const videoFile_cloudinary_public_id = videoFileparts[videoFileparts.length - 1];
  await destroyFromCloudinary(videoFile_cloudinary_public_id);

  const thumbnail_cloudinary_public_id = thumbnailparts[thumbnailparts.length - 1];
  await destroyFromCloudinary(thumbnail_cloudinary_public_id);
  
  const result = await Video.findByIdAndDelete(videoId).select("_id videoFile thumbnail");

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Video deleted successfully"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  
  const videoObjectId = new ObjectId(videoId);

  const getVideoByid = await Video.findById(videoObjectId);
  if (!getVideoByid) {
    throw new ApiError(500, `No video found by id ${videoObjectId}`);
  }
    
  let publishable = getVideoByid.isPublishable;  

  const video = await Video.findByIdAndUpdate(
    videoObjectId,
    {
      $set: {
        isPublishable: !publishable
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, {isPublishable:video.isPublishable}, `Video Publish status updated to ${video.isPublishable}`));

});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
