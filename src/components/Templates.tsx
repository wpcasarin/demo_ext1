import { Template } from "./Template.tsx";

interface TemplatesProps {
  onTemplateClick: (htmlContent: string) => void;
}

export const Templates = (props: TemplatesProps) => {
  const templates = [
    {
      name: "Template 1",
      htmlContent:
        "<h1>{{ title }}</h1> <p>Lorem ipsum odor amet, consectetuer {{ date }} adipiscing elit.</p>",
    },
    {
      name: "Template 2",
      htmlContent:
        "<p>Meu nome é {{ nome }} {{ lastName }}, tenho {{ age }} anos.</p>",
    },
    {
      name: "Template 3",
      htmlContent:
        "<h3>Template</h3><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis amet iusto quia nostrum? Corrupti qui at illo architecto! Numquam ducimus fuga cumque culpa unde accusamus pariatur, fugiat eveniet eos aspernatur.</p>",
    },
  ];

  return (
    <div class="flex flex-col flex-grow gap-5 px-10">
      {templates.map((template) => (
        <Template
          name={template.name}
          htmlContent={template.htmlContent}
          onClick={props.onTemplateClick}
        />
      ))}
    </div>
  );
};
