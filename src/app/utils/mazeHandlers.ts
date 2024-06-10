"use client";
import { useState, useEffect, useCallback } from "react";
import { Direction, Move, Point, RecordIndex } from "../types";
import { useSearchParams, useRouter } from "next/navigation";
import { decodeMaze, encodeMaze } from "./encode";

export const useMazeHandlers = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [maze, setMaze] = useState<Point[]>([{ x: 50, y: 50 }]);
  const [currentColor, setCurrentColor] = useState<string>("#ffffff");
  const [recording, setRecording] = useState<Move[]>([]);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordIndex, setRecordIndex] = useState<RecordIndex>({
    start: 0,
    end: 0,
  });
  const [records, setRecords] = useState<RecordIndex[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [distance, setDistance] = useState<number>(20);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [showMobileControls, setShowMobileControls] = useState(false);

  const clearMaze = () => {
    setMaze([{ x: 50, y: 50 }]);
    setRecordIndex({ start: 0, end: 0 });
    setIsRecording(false);
    setRecords([]);
    setRecording([]);
    setIsPlaying(false);
    router.replace("/");
  };

  const undo = useCallback(() => {
    setRecording((prevRecording) => {
      if (prevRecording.length === 0) return prevRecording;
      return prevRecording.slice(0, -1);
    });
    setMaze((prevMaze) => {
      if (prevMaze.length === 1) return prevMaze;
      return prevMaze.slice(0, -1);
    });
  }, []);

  useEffect(() => {
    const encodedMaze = encodeMaze(recording);
    router.push(`?maze=${encodedMaze}`);
  }, [recording, router]);

const move = useCallback(
  (direction: Direction, moveDistance: number, isPlayback = false) => {
    if (!isPlayback) {
      setRecording((prevRecording) => [
        ...prevRecording,
        { direction, distance: moveDistance },
      ]);
    }
    console.log('moving: ', direction, ' distance: ', moveDistance, ' isPlayback: ', isPlayback);
    
    setMaze((prevMaze) => {
      const currentPoint = prevMaze[prevMaze.length - 1];
      let newPoint = { x: currentPoint.x, y: currentPoint.y };

      switch (direction) {
        case "up":
          newPoint.y -= moveDistance;
          break;
        case "down":
          newPoint.y += moveDistance;
          break;
        case "left":
          newPoint.x -= moveDistance;
          break;
        case "right":
          newPoint.x += moveDistance;
          break;
        default:
          newPoint = currentPoint; // If the direction is not recognized, do not move.
      }

      // Adjust coordinates to avoid fractional pixels
      newPoint.x = Math.round(newPoint.x);
      newPoint.y = Math.round(newPoint.y);

      const newMaze = [...prevMaze, newPoint];
      return newMaze;
    });
  },
  []
);


  const playback = useCallback(
    async (record: Move[], resetMaze = false) => {
      if (resetMaze) {
        setMaze([{ x: 50, y: 50 }]);
      }
      for (let i = 0; i < record.length; i++) {
        const { direction, distance } = record[i];
        move(direction, distance, true);
      }
    },
    [move]
  );

  const loadMaze = useCallback(() => {
    const maze = searchParams.get("maze");
    if (maze) {
      const decodedMaze = decodeMaze(maze);
      setRecording(decodedMaze);
      playback(decodedMaze, true);
    }
  }, [searchParams, playback]);

  useEffect(() => {
    if (!loaded) {
      loadMaze();
      setLoaded(true);
    }
  }, [loaded, loadMaze]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          move("up", distance);
          break;
        case "ArrowDown":
          move("down", distance);
          break;
        case "ArrowLeft":
          move("left", distance);
          break;
        case "ArrowRight":
          move("right", distance);
          break;
        case "Backspace":
          undo();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [move, distance, undo]);

  const handleChangeColor = (hexColor: string) => {
    setCurrentColor(hexColor);
  };

  const startRecording = () => {
    setRecordIndex({ start: recording.length, end: recordIndex.end });
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setRecords([
      ...records,
      { start: recordIndex.start, end: recording.length },
    ]);
    setRecordIndex({ start: 0, end: 0 });
  };
  const playRecordIndex = async (recordIndexIndex: number) => {
    setIsPlaying(true);

    const fullRecord = records[recordIndexIndex];
    const record = recording.slice(fullRecord.start, fullRecord.end);
    await playback(record, true);

    setIsPlaying(false);
  };

  return {
    maze,
    currentColor,
    recording,
    isRecording,
    records,
    isPlaying,
    distance,
    colorPickerOpen,
    undo,
    move,
    handleChangeColor,
    startRecording,
    stopRecording,
    playRecordIndex,
    setDistance,
    setColorPickerOpen,
    showMobileControls,
    setShowMobileControls,
    clearMaze,
  };
};
