import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { removeMany } from "../../core/utils/crudUtils";
import { Song } from "../types/song";

const deleteSongs = async (songIds: string[]): Promise<string[]> => {
  console.log(songIds)
  const { data } = await axios.delete("/api/songs", { data: songIds });
  return data;
};

export function useDeleteSongs() {
  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useMutation(deleteSongs, {
    onSuccess: (songIds: string[]) => {
      queryClient.setQueryData<Song[]>(["songs"], (oldSongs) =>
        removeMany(oldSongs, songIds)
      );
    },
  });

  return { isDeleting: isLoading, deleteSongs: mutateAsync };
}
