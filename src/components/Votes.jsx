// src/api/votes.js
import {axiosInstance} from "../api/axiosInstance";


// Function to fetch votes
export const getVotes = async () => {
  try {
    const response = await axiosInstance.get("/votes");
    return response.data || []; // return the data from the response
  } catch (error) {
    console.error("Error fetching votes:", error);
    throw error; // rethrow the error to be handled by the caller
  }
};

// Function to post a vote
export const postVote = async (voteData) => {
  try {
    const response = await axiosInstance.post("/votes", voteData);
    return response.data; // return the data from the response
  } catch (error) {
    console.error("Error posting vote:", error);
    throw error; // rethrow the error to be handled by the caller
  }
};
