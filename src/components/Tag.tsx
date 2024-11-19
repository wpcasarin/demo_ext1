interface TagProps {
  text: string;
  dragValue: string;
  onDragStart?: (e: DragEvent, dragValue: string) => void;
}

export const Tag = (props: TagProps) => {
  const handleDragStart = (e: DragEvent) => {
    if (props.onDragStart) {
      props.onDragStart(e, props.dragValue);
    } else {
      e.dataTransfer?.setData("text/plain", props.dragValue);
    }
  };

  return (
    <div
      class="flex items-center w-full px-4 py-2 font-semibold text-blue-500 transition duration-300 border border-blue-500 rounded hover:bg-blue-500 hover:text-white max-h-20"
      draggable="true"
      onDragStart={handleDragStart}
    >
      {props.text}
    </div>
  );
};
