import { Tag } from "./Tag.tsx";

export const Tags = () => {
  return (
    <div class="flex flex-col flex-grow gap-5 px-10">
      <Tag text={"Título"} dragValue={"{{ title }}"} />
      <Tag text={"Nome"} dragValue={"{{ name }}"} />
      <Tag text={"Sobrenome"} dragValue={"{{ lastName }}"} />
      <Tag text={"CPF"} dragValue={"{{ cpf }}"} />
      <Tag text={"Data"} dragValue={"{{ date }}"} />
      <Tag text={"Idade"} dragValue={"{{ age }}"} />
    </div>
  );
};
