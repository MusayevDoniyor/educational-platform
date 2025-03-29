import {
  Box,
  Card,
  CardContent,
  //   CardMedia,
  Typography,
  Button,
  //   CardActions,
  //   Chip,
  LinearProgress,
  Paper,
  //   Grid,
  //   useTheme,
  //   useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { lessons } from "../data/lessons";
import LockIcon from "@mui/icons-material/Lock";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import SchoolIcon from "@mui/icons-material/School";
import { useProgress } from "../hooks/useProgress";

const LessonList = () => {
  const navigate = useNavigate();
  //   const theme = useTheme();
  //   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { getOverallProgress, isLessonCompleted } = useProgress(lessons);

  const { completed, total, percentage } = getOverallProgress();

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
          color: "white",
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Darslar ro'yxati
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          O'z bilimingizni sinab ko'ramiz
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            <LinearProgress
              variant="determinate"
              value={percentage}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "white",
                },
              }}
            />
          </Box>
          <Typography variant="body1">
            {completed}/{total} dars
          </Typography>
        </Box>
      </Paper>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
        }}
      >
        {lessons.map((lesson) => {
          const isCompleted = isLessonCompleted(lesson.id);
          const isLocked = !isCompleted && lesson.id > 1;

          return (
            <Card
              key={lesson.id}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                },
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: "linear-gradient(90deg, #2196F3, #21CBF3)",
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
                    {lesson.title}
                  </Typography>
                  {isCompleted && <CheckCircleIcon color="success" />}
                  {isLocked && !isCompleted && <LockIcon color="disabled" />}
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {lesson.description}
                </Typography>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
                >
                  <Typography variant="caption" color="text.secondary">
                    {lesson.duration}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    •
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {lesson.level}
                  </Typography>
                </Box>
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => navigate(`/lesson/${lesson.id}`)}
                  disabled={isLocked}
                  sx={{
                    background: isLocked
                      ? "linear-gradient(45deg, #9E9E9E 30%, #BDBDBD 90%)"
                      : "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                    color: "white",
                    "&:hover": {
                      background: isLocked
                        ? "linear-gradient(45deg, #757575 30%, #9E9E9E 90%)"
                        : "linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)",
                    },
                  }}
                >
                  {isLocked ? "Qulflangan" : "Boshlash"}
                </Button>
              </Box>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default LessonList;
