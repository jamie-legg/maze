"use client";;
import * as Tooltip from "@radix-ui/react-tooltip";
import { useMazeHandlers } from "../utils/mazeHandlers";
import { TopUI } from "./TopUI";
import { BottomUI } from "./BottomUI";



const Maze: React.FC = () => {
  const {
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
    clearMaze,
    showMobileControls,
    setShowMobileControls
  } = useMazeHandlers();
  

  return (
    <Tooltip.Provider>
      <div className="flex">
        <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-tr from-sky-950 to-sky-900">
          {maze.map((point, index) => {
            if (index === 0) return null;
            const prevPoint = maze[index - 1];
            const isVertical = prevPoint.x === point.x;
            const top = Math.min(prevPoint.y, point.y);
            const left = Math.min(prevPoint.x, point.x);
            const width = isVertical ? 2 : Math.abs(prevPoint.x - point.x);
            const height = isVertical ? Math.abs(prevPoint.y - point.y) : 2;

            return (
              <div
                key={index}
                className="absolute shadow-xl bg-opacity-45 transition-transform duration-1000 ease-in-out transform hover:scale-110"
                style={{
                  top: `${top}px`,
                  left: `${left}px`,
                  width: `${width}px`,
                  height: `${height}px`,
                  backgroundColor: currentColor,
                }}
              />
            );
          })}
        </div>
        <TopUI
          currentColor={currentColor}
          recording={recording}
          isRecording={isRecording}
          records={records}
          isPlaying={isPlaying}
          distance={distance}
          colorPickerOpen={colorPickerOpen}
          undo={undo}
          handleChangeColor={handleChangeColor}
          startRecording={startRecording}
          stopRecording={stopRecording}
          playRecordIndex={playRecordIndex}
          setDistance={setDistance}
          setColorPickerOpen={setColorPickerOpen}
          clearMaze={clearMaze}
          toggleMobileControls={() => setShowMobileControls(!showMobileControls)}
        />
        <BottomUI
          show={showMobileControls}
          move={move}
          distance={distance}
          />
      </div>
    </Tooltip.Provider>
  );
};

export default Maze;
