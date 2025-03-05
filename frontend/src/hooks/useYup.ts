import * as yup from "yup";

export function useYup() {
  const createNivelSchema = yup.object().shape({
    nivel: yup
      .string()
      .required("O nível é obrigatório")
      .max(250, "O nível deve ter no máximo 250 caracteres"),
  });

  const desenvolvedoresSchema = yup.object().shape({
    data_nascimento: yup
      .string()
      .matches(/^\d{4}-\d{2}-\d{2}$/, "Data inválida, use o formato YYYY-MM-DD")
      .required("A data de nascimento é obrigatória"),

    hobby: yup
      .string()
      .max(250, "O hobby deve ter no máximo 250 caracteres")
      .required("O hobby é obrigatório"),

    nivel_id: yup
      .number()
      .typeError("O nível deve ser um número")
      .positive("O nível deve ser um número positivo")
      .integer("O nível deve ser um número inteiro")
      .required("O nível é obrigatório"),

    nivel: yup
      .string()
      .max(250, "O nível deve ter no máximo 250 caracteres")
      .required("O nível é obrigatório"),

    nome: yup
      .string()
      .max(250, "O nome deve ter no máximo 250 caracteres")
      .required("O nome é obrigatório"),

    sexo: yup
      .string()
      .oneOf(["M", "F"], "Sexo inválido")
      .required("O sexo é obrigatório"),
  });

  return { createNivelSchema, desenvolvedoresSchema };
}
