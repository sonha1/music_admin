import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import AdminAppBar from "../../admin/components/AdminAppBar";
import AdminToolbar from "../../admin/components/AdminToolbar";
import ConfirmDialog from "../../core/components/ConfirmDialog";
import SelectToolbar from "../../core/components/SelectToolbar";
import { useSnackbar } from "../../core/contexts/SnackbarProvider";
import SongDialog from "../components/SongDialog";
import SongTable from "../components/SongTable";
import { useAddSongs } from "../hooks/useAddSongs";
import { useDeleteSongs } from "../hooks/useDeleteSongs";
import { useUpdateSongs } from "../hooks/useUpdateSongs";
import { useSongs } from "../hooks/useSongs";
import { Song } from "../types/song";

const SongManagement = () => {
  const snackbar = useSnackbar();
  const { t } = useTranslation();

  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [openSongDialog, setOpenSongDialog] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [songDeleted, setSongDeleted] = useState<string[]>([]);
  const [songUpdated, setSongUpdated] = useState<Song | undefined>(undefined);

  const { addSong, isAdding } = useAddSongs();
  const { deleteSongs, isDeleting } = useDeleteSongs();
  const { isUpdating, updateSong } = useUpdateSongs();
  const { data } = useSongs();

  const processing = isAdding || isDeleting || isUpdating;

  const handleAddSong = async (song: Partial<Song>) => {
    addSong(song as Song)
      .then(() => {
        snackbar.success(
          t("songManagement.notifications.addSuccess", {
              song: song.name,
          })
        );
        setOpenSongDialog(false);
      })
      .catch(() => {
        snackbar.error(t("common.errors.unexpected.subTitle"));
      });
  };

  const handleDeleteSongs = async () => {
    deleteSongs(songDeleted)
      .then(() => {
        snackbar.success(t("songManagement.notifications.deleteSuccess"));
        setSelected([]);
        setSongDeleted([]);
        setOpenConfirmDeleteDialog(false);
      })
      .catch(() => {
        snackbar.error(t("common.errors.unexpected.subTitle"));
      });
  };

  const handleUpdateSong = async (song: Song) => {
    updateSong(song)
      .then(() => {
        snackbar.success(
          t("songManagement.notifications.updateSuccess", {
            song: song.name,
          })
        );
        setOpenSongDialog(false);
      })
      .catch(() => {
        snackbar.error(t("common.errors.unexpected.subTitle"));
      });
  };

  const handleCancelSelected = () => {
    setSelected([]);
  };

  const handleCloseConfirmDeleteDialog = () => {
    setOpenConfirmDeleteDialog(false);
  };

  const handleCloseSongDialog = () => {
    setSongUpdated(undefined);
    setOpenSongDialog(false);
  };

  const handleOpenConfirmDeleteDialog = (songIds: string[]) => {
    setSongDeleted(songIds);
    setOpenConfirmDeleteDialog(true);
  };

  const handleOpenSongDialog = (song?: Song) => {
    setSongUpdated(song);
    setOpenSongDialog(true);
  };

  const handleSelectedChange = (newSelected: string[]) => {
    setSelected(newSelected);
  };

  return (
    <React.Fragment>
      <AdminAppBar>
        {!selected.length ? (
          <AdminToolbar title={t("songManagement.toolbar.title")}>
            <Fab
              aria-label="logout"
              color="primary"
              disabled={processing}
              onClick={() => handleOpenSongDialog()}
              size="small"
            >
              <AddIcon />
            </Fab>
          </AdminToolbar>
        ) : (
          <SelectToolbar
            processing={processing}
            onCancel={handleCancelSelected}
            onDelete={handleOpenConfirmDeleteDialog}
            selected={selected}
          />
        )}
      </AdminAppBar>
      <SongTable
        processing={processing}
        onDelete={handleOpenConfirmDeleteDialog}
        onEdit={handleOpenSongDialog}
        onSelectedChange={handleSelectedChange}
        selected={selected}
        songs={data}
      />
      <ConfirmDialog
        description={t("songManagement.confirmations.delete")}
        pending={processing}
        onClose={handleCloseConfirmDeleteDialog}
        onConfirm={handleDeleteSongs}
        open={openConfirmDeleteDialog}
        title={t("common.confirmation")}
      />
      {openSongDialog && (
        <SongDialog
          onAdd={handleAddSong}
          onClose={handleCloseSongDialog}
          onUpdate={handleUpdateSong}
          open={openSongDialog}
          processing={processing}
          song={songUpdated}
        />
      )}
    </React.Fragment>
  );
};

export default SongManagement;
