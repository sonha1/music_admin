import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { updateOne } from "../../core/utils/crudUtils";
import { Song } from "../types/song";

const updateSong = async (song: Song): Promise<Song> => {
  const { data } = await axios.put("/api/songs", song);
  return data;
};

export function useUpdateSongs() {
  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useMutation(updateSong, {
    onSuccess: (song: Song) => {
      queryClient.setQueryData<Song[]>(["songs"], (oldSongs) =>
        updateOne(oldSongs, song)
      );
    },
  });

  return { isUpdating: isLoading, updateSong: mutateAsync };
}
