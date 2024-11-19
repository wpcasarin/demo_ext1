import { createSignal } from "solid-js";
import { QuillEditor, Tags, Templates } from "./components";

export const App = () => {
  const [content, setContent] = createSignal("<p>Seu texto aqui.</p>");

  const loadTemplate = (htmlContent: string) => {
    setContent(htmlContent);
  };

  const sendContent = async () => {
    const url = "http://127.0.0.1:8000/api/convert-to-odt/";
    const body = { content: content() };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Error response:", error);
        alert("Failed to send content: " + JSON.stringify(error));
        return;
      }

      const blob = await response.blob();
      const fileName = "converted-file.odt";

      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = fileName;
      downloadLink.click();

      URL.revokeObjectURL(downloadLink.href);
    } catch (err: any) {
      console.error("Request failed:", err);
      alert("An error occurred: " + err.message);
    }
  };

  return (
    <main class="flex flex-row h-dvh items-center">
      <Tags />
      <div class="flex-grow rounded-2xl shadow-lg p-5 w-[800px]">
        <div class="flex flex-row justify-between items-center py-5">
          <h1 class="text-2xl font-bold">Quill Editor</h1>
          <button
            class="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700 transition duration-300"
            onClick={sendContent}
          >
            Converter
          </button>
        </div>

        <QuillEditor value={content()} onChange={setContent} />
      </div>
      <Templates onTemplateClick={loadTemplate} />
    </main>
  );
};
