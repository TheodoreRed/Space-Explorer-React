import axios from "axios";
import SpaceArticle from "../models/SpaceArticle";

const getAllSpaceBlogs = async (
  searchTerm: string
): Promise<SpaceArticle[]> => {
  return (
    await axios.get(`https://api.spaceflightnewsapi.net/v4/blogs/`, {
      params: {
        limit: 20,
        search: searchTerm,
      },
    })
  ).data.results;
};
const getAllSpaceArticles = async (
  searchTerm: string
): Promise<SpaceArticle[]> => {
  return (
    await axios.get(`https://api.spaceflightnewsapi.net/v4/articles/`, {
      params: {
        limit: 20,
        search: searchTerm,
      },
    })
  ).data.results;
};

export const getAllArticles = async (searchTerm: string) => {
  const blogs = await getAllSpaceBlogs(searchTerm);
  const articles = await getAllSpaceArticles(searchTerm);
  return [...blogs, ...articles];
};
// https://api.spaceflightnewsapi.net/v4/articles/
