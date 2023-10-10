import axios from "axios";
import { useQuery } from "react-query";
import { Song } from "../types/song";
import queryClient from "../../query.client";

const fetchSongs = async (): Promise<Song[]> => {
  const { data } = await axios.get("/api/songs");
  return data;
};

export function useSongs() {
  return useQuery("songs", () => fetchSongs());
}
