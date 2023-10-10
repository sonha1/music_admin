import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import LoadingButton from "@material-ui/lab/LoadingButton";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { Song } from "../types/song";

const genders = [
  { label: "songManagement.form.gender.options.f", value: "F" },
  { label: "songManagement.form.gender.options.m", value: "M" },
  { label: "songManagement.form.gender.options.n", value: "NC" },
];
const roles = ["Admin", "Member"];

type SongDialogProps = {
  onAdd: (song: Partial<Song>) => void;
  onClose: () => void;
  onUpdate: (song: Song) => void;
  open: boolean;
  processing: boolean;
  song?: Song;
};

const SongDialog = ({
  onAdd,
  onClose,
  onUpdate,
  open,
  processing,
  song,
}: SongDialogProps) => {
  const { t } = useTranslation();

  const editMode = Boolean(song && song.id);

  const handleSubmit = (values: Partial<Song>) => {
    if (song && song.id) {
      onUpdate({ ...values, id: song.id } as Song);
    } else {
      onAdd(values);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: song ? song.name : "",
      author: song ? song.author : "",
      singer: song ? song.singer : "",
      ownerUser: song ? song.ownerUser : "",
      url: song ? song.url : ""
    },
    validationSchema: {},
    onSubmit: handleSubmit,
  });

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="song-dialog-title">
      <form onSubmit={formik.handleSubmit} noValidate>
        <DialogTitle id="song-dialog-title">
          {editMode
            ? t("songManagement.modal.edit.title")
            : t("songManagement.modal.add.title")}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            id="ownerUser"
            label={t("songManagement.form.ownerUser.label")}
            name="ownerUser"
            autoComplete="family-name"
            autoFocus
            disabled={processing}
            value={formik.values.ownerUser}
            onChange={formik.handleChange}
            error={formik.touched.ownerUser && Boolean(formik.errors.ownerUser)}
            helperText={formik.touched.ownerUser && formik.errors.ownerUser}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="singer"
            label={t("songManagement.form.singer.label")}
            name="singer"
            autoComplete="given-name"
            disabled={processing}
            value={formik.values.singer}
            onChange={formik.handleChange}
            error={formik.touched.singer && Boolean(formik.errors.singer)}
            helperText={formik.touched.singer && formik.errors.singer}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label={t("songManagement.form.name.label")}
            name="name"
            autoComplete="name"
            disabled={processing}
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
              margin="normal"
              required
              fullWidth
              id="url"
              label={t("songManagement.form.url.label")}
              name="url"
              autoComplete="url"
              disabled={processing}
              value={formik.values.url}
              onChange={formik.handleChange}
              error={formik.touched.url && Boolean(formik.errors.url)}
              helperText={formik.touched.url && formik.errors.url}
          />
          <TextField
            margin="normal"
            required
            id="author"
            disabled={processing}
            fullWidth
            select
            label={t("songManagement.form.author.label")}
            name="author"
            value={formik.values.author}
            onChange={formik.handleChange}
            error={formik.touched.author && Boolean(formik.errors.author)}
            helperText={formik.touched.author && formik.errors.author}
          >
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{t("common.cancel")}</Button>
          <LoadingButton loading={processing} type="submit" variant="contained">
            {editMode
              ? t("songManagement.modal.edit.action")
              : t("songManagement.modal.add.action")}
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SongDialog;
