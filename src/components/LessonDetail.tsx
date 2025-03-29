import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  Alert,
  Paper,
  LinearProgress,
  useTheme,
  useMediaQuery,
  Fade,
  Collapse,
} from "@mui/material";
import { lessons } from "../data/lessons";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SchoolIcon from "@mui/icons-material/School";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ErrorIcon from "@mui/icons-material/Error";

const LessonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const lesson = lessons.find((l) => l.id === Number(id));

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showTest, setShowTest] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (!lesson) {
      navigate("/");
      return;
    }

    if (lesson.isLocked) {
      navigate("/");
      return;
    }
  }, [lesson, navigate]);

  if (!lesson) {
    return <Typography>Dars topilmadi</Typography>;
  }

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    const isAnswerCorrect =
      answer === lesson.questions[currentQuestion].correctAnswer;
    setIsCorrect(isAnswerCorrect);
    setShowExplanation(true);

    if (isAnswerCorrect) {
      setScore(score + 1);
      setProgress(progress + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < lesson.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
      setShowExplanation(false);
      setIsCorrect(false);
    } else {
      // Mark lesson as completed and unlock next lesson
      lesson.isCompleted = true;
      const nextLesson = lessons.find((l) => l.id === lesson.id + 1);
      if (nextLesson) {
        nextLesson.isLocked = false;
      }
      setShowResult(true);
    }
  };

  const handleStartTest = () => {
    setShowTest(true);
    setProgress(0);
  };

  const handleFinish = () => {
    if (score === lesson.questions.length && lesson.id < lessons.length) {
      navigate(`/lesson/${lesson.id + 1}`);
    } else {
      navigate("/");
    }
  };

  const currentProgress =
    ((currentQuestion + 1) / lesson.questions.length) * 100;

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: { xs: 1, sm: 2 } }}>
      <Paper
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 4,
          background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          variant={isMobile ? "h5" : "h4"}
          gutterBottom
          sx={{
            color: "white",
            fontWeight: "bold",
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          {lesson.title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 2,
            flexWrap: "wrap",
            justifyContent: { xs: "center", sm: "flex-start" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "white",
            }}
          >
            <AccessTimeIcon />
            <Typography>{lesson.duration}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "white",
            }}
          >
            <SchoolIcon />
            <Typography>{lesson.level}</Typography>
          </Box>
        </Box>
        <Typography
          variant="body1"
          sx={{
            color: "white",
            mb: 2,
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          {lesson.description}
        </Typography>
        {showTest && (
          <Box sx={{ width: "100%", mt: 2 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "white",
                },
              }}
            />
          </Box>
        )}
      </Paper>

      {!showTest && (
        <Card sx={{ mb: 4, borderRadius: 2, overflow: "hidden" }}>
          <CardContent>
            <Box sx={{ position: "relative", paddingTop: "56.25%", mb: 2 }}>
              <iframe
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
                src={lesson.videoUrl}
                title={lesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Box>
            <Button
              variant="contained"
              onClick={handleStartTest}
              fullWidth
              sx={{
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)",
                },
                borderRadius: 2,
                py: 1.5,
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Testni boshlash
            </Button>
          </CardContent>
        </Card>
      )}

      {showTest && !showResult && (
        <Fade in={true}>
          <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
            <CardContent>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Savol {currentQuestion + 1}/{lesson.questions.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {Math.round(currentProgress)}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={currentProgress}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "primary.light",
                  }}
                />
              </Box>

              <Typography variant="h6" gutterBottom>
                {lesson.questions[currentQuestion].question}
              </Typography>

              <FormControl component="fieldset" sx={{ width: "100%", mt: 2 }}>
                <RadioGroup
                  value={selectedAnswer}
                  onChange={(e) => handleAnswerSelect(e.target.value)}
                  sx={{ gap: 2 }}
                >
                  {lesson.questions[currentQuestion].options.map(
                    (option, index) => (
                      <FormControlLabel
                        key={index}
                        value={option}
                        control={<Radio />}
                        label={option}
                        disabled={!!selectedAnswer}
                        sx={{
                          m: 0,
                          p: 2,
                          border: "1px solid",
                          borderColor:
                            selectedAnswer === option
                              ? isCorrect
                                ? "success.main"
                                : "error.main"
                              : "divider",
                          borderRadius: 1,
                          "&:hover": {
                            backgroundColor: !selectedAnswer
                              ? "action.hover"
                              : "transparent",
                          },
                        }}
                      />
                    )
                  )}
                </RadioGroup>
              </FormControl>

              <Collapse in={showExplanation}>
                <Alert
                  severity={isCorrect ? "success" : "error"}
                  sx={{ mt: 2 }}
                  icon={isCorrect ? <CheckCircleIcon /> : <ErrorIcon />}
                >
                  {isCorrect ? (
                    <Typography variant="body2">
                      To'g'ri! {lesson.questions[currentQuestion].explanation}
                    </Typography>
                  ) : (
                    <Typography variant="body2">
                      Noto'g'ri. To'g'ri javob:{" "}
                      {lesson.questions[currentQuestion].correctAnswer}
                    </Typography>
                  )}
                </Alert>
              </Collapse>

              {selectedAnswer && (
                <Box
                  sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}
                >
                  <Button
                    variant="contained"
                    onClick={handleNextQuestion}
                    sx={{
                      background:
                        "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                      color: "white",
                      "&:hover": {
                        background:
                          "linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)",
                      },
                    }}
                  >
                    {currentQuestion === lesson.questions.length - 1
                      ? "Yakunlash"
                      : "Keyingi savol"}
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Fade>
      )}

      {showResult && (
        <Fade in={true}>
          <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  color: "primary.main",
                  textAlign: "center",
                }}
              >
                Test natijalari
              </Typography>
              <Alert
                severity={
                  score === lesson.questions.length ? "success" : "warning"
                }
                sx={{
                  mb: 3,
                  borderRadius: 2,
                }}
              >
                Siz {lesson.questions.length} ta savoldan {score} tasiga to'g'ri
                javob berdingiz!
              </Alert>
              <Button
                variant="contained"
                onClick={handleFinish}
                fullWidth
                sx={{
                  background:
                    "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                  "&:hover": {
                    background:
                      "linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)",
                  },
                  borderRadius: 2,
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                {score === lesson.questions.length && lesson.id < lessons.length
                  ? "Keyingi darsga o'tish"
                  : "Darslar ro'yxatiga qaytish"}
              </Button>
            </CardContent>
          </Card>
        </Fade>
      )}
    </Box>
  );
};

export default LessonDetail;
