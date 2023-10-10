import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { addOne } from "../../core/utils/crudUtils";
import { Song } from "../types/song";

const addSong = async (song: Song): Promise<Song> => {
  const { data } = await axios.post("/api/songs", song);
  return data;
};

export function useAddSongs() {
  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useMutation(addSong, {
    onSuccess: (song: Song) => {
      queryClient.setQueryData<Song[]>(["songs"], (oldSongs) =>
        addOne(oldSongs, song)
      );
    },
  });

  return { isAdding: isLoading, addSong: mutateAsync };
}
