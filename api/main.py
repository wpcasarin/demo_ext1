from fastapi import FastAPI, BackgroundTasks
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pypandoc
import os
import uuid
from jinja2 import Template

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ConvertRequest(BaseModel):
    content: str


def cleanup_file(file_path: str):
    if os.path.exists(file_path):
        os.remove(file_path)


@app.post("/api/convert-to-odt")
async def convert_html_to_odt(request: ConvertRequest, background_tasks: BackgroundTasks = None):
    output_filename = f"{uuid.uuid4().hex}.odt"

    try:
        template = Template(request.content)
        rendered_html = template.render(title="Requerimento", name="João", lastName="Silva", cpf="03202354000",
                                        date="28/10/1999", age="28")
        pypandoc.convert_text(rendered_html, 'odt', format='html', outputfile=output_filename)

        background_tasks.add_task(cleanup_file, output_filename)

        return FileResponse(
            output_filename,
            media_type="application/vnd.oasis.opendocument.text",
            filename="converted.odt",
        )
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
