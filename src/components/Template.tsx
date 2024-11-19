interface TemplateProps {
  name: string;
  htmlContent: string;
  onClick: (htmlContent: string) => void;
}

export const Template = (props: TemplateProps) => {
  return (
    <div
      class="flex items-center px-4 py-2 font-semibold text-gray-500 transition duration-300 border border-gray-500 rounded cursor-pointer hover:bg-gray-500 hover:text-white"
      onClick={() => props.onClick(props.htmlContent)}
    >
      {props.name}
    </div>
  );
};
