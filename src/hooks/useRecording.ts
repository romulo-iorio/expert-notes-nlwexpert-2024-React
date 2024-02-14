import { useState } from "react";
import { toast } from "sonner";

interface Props {
  setShouldShowOnboarding: React.Dispatch<React.SetStateAction<boolean>>;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

export const useRecording = ({
  setShouldShowOnboarding,
  setContent,
}: Props) => {
  const [isRecording, setIsRecording] = useState(false);

  const handleStartRecording = () => {
    const isSpeechRecognitionSupported =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

    if (!isSpeechRecognitionSupported) {
      toast.error(
        "Infelizmente seu navegador não suporta a API de gravação de áudio."
      );
      return setIsRecording(false);
    }

    setIsRecording(true);
    setShouldShowOnboarding(false);

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const speechRecognition = new SpeechRecognitionAPI();

    speechRecognition.lang = "pt-BR";
    speechRecognition.continuous = true;
    speechRecognition.maxAlternatives = 1;
    speechRecognition.interimResults = true;

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce(
        (text, resultItem) => {
          return text.concat(resultItem[0].transcript);
        },
        ""
      );
      setContent(transcription);
    };

    speechRecognition.onerror = (event) => {
      console.error(event.error);
    };

    speechRecognition.start();
  };

  const handleStopRecording = () => {
    setIsRecording(false);

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const speechRecognition = new SpeechRecognitionAPI();

    speechRecognition.stop();
  };

  return { handleStartRecording, handleStopRecording, isRecording };
};
