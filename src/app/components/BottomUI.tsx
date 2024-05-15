import clsx from "clsx";
import { Direction } from "../types";
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon } from "@radix-ui/react-icons";

interface BottomUIProps {
  show: boolean;
  move: (direction: Direction, distance: number) => void;
  distance: number;
}

export const BottomUI: React.FC<BottomUIProps> = ({ show, move, distance }) => {
  return (
    <div
      className={clsx(
        show ? `opacity-100` : `opacity-0`,
        `fixed bottom-0 left-0 transition-opacity w-full flex justify-center mb-4`
      )}
    >
      <div className="grid grid-cols-3">
        <div></div>
        <button
          onClick={() => move("up", distance)}
          className="p-2 rounded-xl bg-opacity-35 bg-blue-500 text-white mr-2"
        >
          <ArrowUpIcon />
        </button>
        <div></div>
        <button
          onClick={() => move("left", distance)}
          className="p-2 rounded-xl bg-opacity-35 bg-blue-500 text-white mr-2"
        >
          <ArrowLeftIcon />
        </button>
        <div></div>
        <button
          onClick={() => move("right", distance)}
          className="p-2 rounded-xl bg-opacity-35 bg-blue-500 text-white mr-2"
        >
          <ArrowRightIcon />
        </button>
        <div></div>
        <button
          onClick={() => move("down", distance)}
          className="p-2 rounded-xl bg-opacity-35 bg-blue-500 text-white mr-2"
        >
          <ArrowDownIcon />
        </button>
        <div></div>
      </div>
    </div>
  );
};
