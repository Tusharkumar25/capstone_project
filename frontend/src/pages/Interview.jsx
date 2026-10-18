import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FaceDetector, FilesetResolver } from "@mediapipe/tasks-vision";
import axios from "axios";
import toast from "react-hot-toast";
 import { useNavigate } from "react-router-dom";



function Interview() {
  const { id } = useParams();

  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");

  // voice recognition state
  const [isListening, setIsListening] = useState(false);
  const multipleFacesDetectedRef = useRef(false);
const recognitionRef = useRef(null);
const answerRef = useRef("");



  const [submitting, setSubmitting] = useState(false);

  const videoRef = useRef(null);
const [cameraOn, setCameraOn] = useState(false);
 const [cameraStream, setCameraStream] = useState(null);

// face detection state
 const faceDetectorRef = useRef(null);

const [faceDetectorReady, setFaceDetectorReady] = useState(false);
const [faceCount, setFaceCount] = useState(null);
const [faceDetectionStatus, setFaceDetectionStatus] =
  useState("Camera is off");



  const navigate = useNavigate();

async function saveCurrentAnswer() {
  try {
    await axios.post(
      `http://localhost:3000/api/interview/${id}/answer`,
      {
        questionIndex: currentQuestion,
        answer: answerRef.current,
      },
      {
        withCredentials: true,
      }
    );

    return true;

  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
        "Failed to save answer"
    );

    return false;
  }
}


async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

    setCameraStream(stream);
    setCameraOn(true);

  } catch (error) {
    console.error("Camera error:", error);

    toast.error("Camera permission is required");
  }
}

function stopCamera() {
  if (cameraStream) {
    cameraStream.getTracks().forEach((track) => {
      track.stop();
    });
  }

  if (videoRef.current) {
    videoRef.current.srcObject = null;
  }

  setCameraStream(null);
  setCameraOn(false);
}




async function submitInterview() {
    
  try {
    setSubmitting(true);
const response = await axios.post(
  `http://localhost:3000/api/interview/${id}/submit`,
  {
    multipleFacesDetected: multipleFacesDetectedRef.current,
  },
  {
    withCredentials: true,
  }
);

    console.log("Interview evaluation:", response.data);

    toast.success(response.data.message);

    navigate(`/interview/${id}/result`);

    // Next step mein result page par navigate karenge

  } catch (error) {
    console.error("Submit interview error:", error);
    console.log("Status:", error.response?.status);
    console.log("Data:", error.response?.data);

    toast.error(
      error.response?.data?.message ||
        "Failed to submit interview"
    );
  } finally {
    setSubmitting(false);
  }
}

// Voice recognition functions
const startListening = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    toast.error(
      "Speech recognition is not supported. Please use Chrome or Edge."
    );
    return;
  }

  // Create the recognition instance only once
  if (!recognitionRef.current) {
    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      let spokenText = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        if (event.results[i].isFinal) {
          spokenText += event.results[i][0].transcript;
        }
      }

      if (spokenText.trim()) {
        const currentAnswer = answerRef.current;
        const updatedAnswer = currentAnswer
          ? `${currentAnswer.trimEnd()} ${spokenText.trim()}`
          : spokenText.trim();

        answerRef.current = updatedAnswer;
        setAnswer(updatedAnswer);
      }
    };

    recognition.onerror = (event) => {
      setIsListening(false);

      if (event.error === "not-allowed") {
        toast.error("Please allow microphone access in your browser.");
      } else if (event.error !== "no-speech" && event.error !== "aborted") {
        toast.error("Speech recognition failed. Please try again.");
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }

  try {
    recognitionRef.current.start();
    setIsListening(true);
  } catch (error) {
    if (error.name !== "InvalidStateError") {
      toast.error("Could not start the microphone.");
    }
  }
};

const stopListening = () => {
  if (recognitionRef.current) {
    recognitionRef.current.stop();
  }

  setIsListening(false);
};

//voice recognition effect
useEffect(() => {
  answerRef.current = answer;
}, [answer]);

useEffect(() => {
  return () => {
    if (recognitionRef.current) {
      recognitionRef.current.onresult = null;
      recognitionRef.current.onend = null;
      recognitionRef.current.onerror = null;
      recognitionRef.current.stop();
    }
  };
}, []);


//////////////// face recognition effect

useEffect(() => {
  let cancelled = false;
  let detectorInstance = null;

  const initializeFaceDetector = async () => {
    try {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

      detectorInstance = await FaceDetector.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite",
        },
        runningMode: "VIDEO",
        minDetectionConfidence: 0.5,
      });

      if (cancelled) {
        detectorInstance.close();
        return;
      }

      faceDetectorRef.current = detectorInstance;
      setFaceDetectorReady(true);
    } catch (error) {
      console.error("MediaPipe initialization failed:", error);
      setFaceDetectionStatus("Face detection unavailable");
    }
  };

  initializeFaceDetector();

  return () => {
    cancelled = true;
    faceDetectorRef.current?.close();
    faceDetectorRef.current = null;
  };
}, []);

useEffect(() => {
  if (!cameraStream) {
    setFaceCount(null);
    setFaceDetectionStatus("Camera is off");
    return;
  }

  if (!faceDetectorReady || !faceDetectorRef.current) {
    setFaceDetectionStatus("Loading face detector...");
    return;
  }

  let animationFrameId;
  let lastDetectionTime = 0;

  const detectFaces = (timestamp) => {
    const video = videoRef.current;

    if (
      video &&
      video.readyState >= 2 &&
      faceDetectorRef.current &&
      timestamp - lastDetectionTime >= 250
    ) {
      lastDetectionTime = timestamp;

      try {
        const result = faceDetectorRef.current.detectForVideo(
          video,
          timestamp
        );

const count = result.detections.length;

   // count of faces detected
 
if (count > 3) {
  multipleFacesDetectedRef.current = true;
  console.log("Multiple faces detected");
}

setFaceCount(count);

        if (count === 0) {
          setFaceDetectionStatus("No face detected");
        } else if (count === 1) {
          setFaceDetectionStatus("Face detected");
        } else {
          setFaceDetectionStatus("Multiple faces detected");
        }
      } catch (error) {
        console.error("Face detection error:", error);
      }
    }

    animationFrameId = requestAnimationFrame(detectFaces);
  };

  animationFrameId = requestAnimationFrame(detectFaces);

  return () => {
    cancelAnimationFrame(animationFrameId);
  };
}, [cameraStream, faceDetectorReady]);

//////

useEffect(() => {
  if (videoRef.current && cameraStream) {
    videoRef.current.srcObject = cameraStream;
  }
}, [cameraStream]);


  useEffect(() => {
    async function fetchInterview() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/interview/${id}`,
          {
            withCredentials: true,
          }
        );

        setInterview(response.data.interview);
      } catch (error) {
        console.error(error);

        toast.error(
          error.response?.data?.message ||
            "Failed to load interview"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchInterview();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08090b] text-white">
        Loading interview...
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08090b] text-red-400">
        Interview not found
      </div>
    );
  }

  const question = interview.questions[currentQuestion];

  const isFirstQuestion = currentQuestion === 0;

  const isLastQuestion =
    currentQuestion === interview.questions.length - 1;

  return (
    <div className="min-h-screen bg-[#08090b] px-6 py-10 text-white">

       {submitting && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">

    <div className="rounded-2xl border border-white/10 bg-[#0d0f12] px-10 py-8 text-center shadow-2xl">

      <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-orange-500" />

      <h2 className="mt-5 text-xl font-semibold text-white">
        Evaluating Your Interview
      </h2>

      <p className="mt-2 text-sm text-gray-400">
        AI is analyzing your answers...
      </p>

      <p className="mt-4 text-xs text-gray-500">
        Generating your score and feedback
      </p>

    </div>

  </div>
)}



      <div className="mx-auto max-w-4xl">

        {/* Header */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold">
            {interview.jobRole} Interview
          </h1>

          <p className="mt-2 text-gray-400">
            {interview.technology} •{" "}
            {interview.difficulty}
          </p>

        </div>


        {/* Progress */}

        <div className="mb-6">

          <div className="mb-2 flex justify-between text-sm">

            <span className="text-gray-400">
              Question {currentQuestion + 1} of{" "}
              {interview.questions.length}
            </span>

            <span className="text-orange-400">
              {Math.round(
                ((currentQuestion + 1) /
                  interview.questions.length) *
                  100
              )}
              %
            </span>

          </div>


          <div className="h-2 overflow-hidden rounded-full bg-white/10">

            <div
              className="h-full rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 transition-all duration-500"
              style={{
                width: `${
                  ((currentQuestion + 1) /
                    interview.questions.length) *
                  100
                }%`,
              }}
            />

          </div>

        </div>



{/* Camera */}
{/* Camera Preview */}
<div className="fixed right-6 top-6 z-50 w-80 overflow-hidden rounded-2xl border border-white/10 bg-[#0d0f12] shadow-2xl">

  <div className="relative aspect-video bg-black">

    {cameraOn ? (
      <>
        {/* Video */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="h-full w-full object-cover"
        />



      {/* Face Detection Status */}


      <div
  className={`mt-2 rounded-lg border px-3 py-2 text-sm font-medium ${
    !cameraStream
      ? "border-white/10 bg-white/5 text-gray-400"
      : faceCount === 1
      ? "border-green-500/30 bg-green-500/10 text-green-400"
      : faceCount === 0
      ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
      : faceCount > 1
      ? "border-red-500/30 bg-red-500/10 text-red-400"
      : "border-white/10 bg-white/5 text-gray-300"
  }`}
>
  <div className="flex items-center justify-between gap-2">
    <span>{faceDetectionStatus}</span>

    {cameraStream && faceCount !== null && (
      <span className="rounded-md bg-black/20 px-2 py-1 text-xs">
        Faces: {faceCount}
      </span>
    )}
  </div>
</div>


        {/* Camera Status */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg bg-black/70 px-3 py-1.5 text-xs text-white backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-green-400" />
          Camera On
        </div>

        {/* Stop */}
        <button
          onClick={stopCamera}
          className="absolute right-3 top-3 rounded-lg bg-black/70 px-3 py-1.5 text-xs text-white backdrop-blur-sm transition hover:bg-red-500"
        >
          Stop
        </button>
      </>
    ) : (
      /* Camera Off */
      <div className="flex h-full flex-col items-center justify-center gap-3">

        <p className="text-sm text-gray-500">
          Camera is off
        </p>

        <button
          onClick={startCamera}
          className="rounded-lg bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 px-4 py-2 text-sm font-semibold text-black transition hover:scale-105"
        >
          Start Camera
        </button>

      </div>
    )}

  </div>

</div>








        {/* Question Card */}

        <div className="rounded-3xl border border-white/10 bg-[#0d0f12] p-8 shadow-2xl">

          <p className="text-sm text-orange-400">
            Question {currentQuestion + 1}
          </p>

          <h2 className="mt-4 text-xl font-semibold leading-relaxed">
            {question.question}
          </h2>


          {/* Answer */}

          <div className="mt-8">

            <label className="mb-2 block text-sm font-medium text-gray-300">
              Your Answer
            </label>

            <button
  type="button"
  onClick={isListening ? stopListening : startListening}
  className={`mb-3 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition ${
    isListening
      ? "bg-red-600 hover:bg-red-700"
      : "bg-orange-500 hover:bg-orange-600"
  }`}
>
  {isListening ? "🎙️ Stop Recording" : "🎤 Speak Answer"}
</button>

<textarea
  value={answer}
  onChange={(e) => {
    answerRef.current = e.target.value;
    setAnswer(e.target.value);
  }}
  placeholder="Type your answer here..."
  rows={8}
  className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none transition placeholder:text-gray-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
/>
          </div>


          {/* Navigation */}

          <div className="mt-6 flex items-center justify-between">

            <button
              type="button"
              disabled={isFirstQuestion}
              onClick={() =>
                setCurrentQuestion(
                  (prev) => prev - 1
                )
              }
              className="rounded-xl border border-white/10 px-6 py-3 font-medium text-gray-300 transition hover:border-orange-500/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              ← Previous
            </button>


            {!isLastQuestion ? (

              <button
                type="button"
                onClick={async () => {

                if (!answer.trim()) {
                    toast.error("Please enter your answer");
                    return;
                }

                const saved = await saveCurrentAnswer();

                if (!saved) return;

                setCurrentQuestion((prev) => prev + 1);

                setAnswer("");
                }}
                className="rounded-xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 px-7 py-3 font-semibold text-black transition hover:scale-105"
              >
                Next →
              </button>

            ) : (

                                    <button
                    type="button"
                    disabled={submitting}
                    onClick={async () => {
                        if (!answer.trim()) {
                        toast.error("Please enter your answer");
                        return;
                        }

                        const saved = await saveCurrentAnswer();

                        if (!saved) return;

                        await submitInterview();
                    }}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 px-7 py-3 font-semibold text-black transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                    {submitting ? (
                        <>
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                        Evaluating...
                        </>
                    ) : (
                        "Submit Interview"
                    )}
                    </button>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Interview;