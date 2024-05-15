import { DistanceSlider } from "@/components/DistanceSlider";
import {
  Button,
  Transition,
  Dialog,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  CounterClockwiseClockIcon,
  StopIcon,
  MoveIcon,
  ColorWheelIcon,
  CircleIcon, PlayIcon, TrashIcon
} from "@radix-ui/react-icons";
import * as Tooltip from "@radix-ui/react-tooltip";
import { SketchPicker } from "react-color";
import { RecordIndex, Direction, Move } from "../types";

interface TopUIProps {
  currentColor: string;
  recording: Move[];
  isRecording: boolean;
  records: RecordIndex[];
  isPlaying: boolean;
  distance: number;
  colorPickerOpen: boolean;
  undo: () => void;
  handleChangeColor: (color: string) => void;
  startRecording: () => void;
  stopRecording: () => void;
  playRecordIndex: (index: number) => void;
  setDistance: (distance: number) => void;
  setColorPickerOpen: (open: boolean) => void;
  clearMaze: () => void;
  toggleMobileControls: () => void;
}

export const TopUI: React.FC<TopUIProps> = ({
  currentColor,
  recording,
  isRecording,
  records,
  isPlaying,
  distance,
  colorPickerOpen,
  undo,
  handleChangeColor,
  startRecording,
  stopRecording,
  playRecordIndex,
  setDistance,
  setColorPickerOpen,
  clearMaze,
  toggleMobileControls
}) => {
  return (
    <div className="fixed top-0 right-0">
      <div className="mt-4">
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button
              onClick={undo}
              className="p-2 rounded-xl bg-opacity-35 bg-blue-500 text-white mr-2"
            >
              <CounterClockwiseClockIcon />
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className="TooltipContent bg-blue-500 bg-opacity-85 rounded-lg p-1">
              Undo
              <Tooltip.Arrow className="TooltipArrow" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>

        {!isRecording ? (
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                onClick={startRecording}
                disabled={isRecording}
                className="p-2 rounded-xl bg-opacity-35 bg-blue-500 text-white mr-2"
              >
                <CircleIcon />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content className="TooltipContent bg-blue-500 bg-opacity-85 rounded-lg p-1">
                Record Moves
                <Tooltip.Arrow className="TooltipArrow" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        ) : (
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                onClick={stopRecording}
                disabled={!isRecording}
                className="p-2 rounded-xl bg-opacity-35 bg-red-500 text-white mr-2"
              >
                <StopIcon />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content className="TooltipContent bg-blue-500 bg-opacity-85 rounded-lg p-1">
                Stop Recording
                <Tooltip.Arrow className="TooltipArrow" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        )}

        {records.map((record, index) => (
          <Tooltip.Root key={index}>
            <Tooltip.Trigger asChild>
              <button
                onClick={() => playRecordIndex(index)}
                disabled={isPlaying || !recording.length}
                className="p-2 rounded-xl bg-opacity-35 bg-green-500 text-white mr-2"
              >
                <PlayIcon />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content className="TooltipContent bg-blue-500 bg-opacity-85 rounded-lg p-1">
                Play Record {index + 1}
                <Tooltip.Arrow className="TooltipArrow" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        ))}

        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button
              onClick={() => setColorPickerOpen(true)}
              className="p-2 rounded-xl bg-opacity-35 bg-blue-500 text-white mr-2"
            >
              <ColorWheelIcon />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className="TooltipContent bg-blue-500 bg-opacity-85 rounded-lg p-1">
              Open Color Picker
              <Tooltip.Arrow className="TooltipArrow" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>

        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button
              onClick={() => clearMaze()}
              className="p-2 rounded-xl bg-opacity-35 bg-blue-500 text-white mr-2"
            >
              <TrashIcon />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className="TooltipContent bg-blue-500 bg-opacity-85 rounded-lg p-1">
              Clear Maze
              <Tooltip.Arrow className="TooltipArrow" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>

                <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button
              onClick={() => toggleMobileControls()}
              className="p-2 rounded-xl bg-opacity-35 bg-blue-500 text-white mr-2"
            >
              <MoveIcon />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className="TooltipContent bg-blue-500 bg-opacity-85 rounded-lg p-1">
              Toggle Movement Buttons
              <Tooltip.Arrow className="TooltipArrow" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>

        <Transition appear show={colorPickerOpen}>
          <Dialog
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={() => setColorPickerOpen(false)}
          >
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <TransitionChild
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 transform-[scale(95%)]"
                  enterTo="opacity-100 transform-[scale(100%)]"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 transform-[scale(100%)]"
                  leaveTo="opacity-0 transform-[scale(95%)]"
                >
                  <DialogPanel className="w-max max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl">
                    <DialogTitle
                      as="h3"
                      className="text-base/7 font-medium text-white"
                    >
                      Color Picker
                    </DialogTitle>
                    <SketchPicker
                      color={currentColor}
                      className="mt-4 -mb-4"
                      onChangeComplete={(color) => handleChangeColor(color.hex)}
                    />
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>

      <div className="mt-4 text-black mr-2">
        <DistanceSlider value={distance} setValue={setDistance} />
      </div>
    </div>
  );
};
