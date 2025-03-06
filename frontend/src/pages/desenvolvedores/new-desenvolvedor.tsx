import { Box, HStack, Input, Spinner, Stack } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ConfirmButtons } from "../../components/confirm-buttons";
import { DefaultPage } from "../../components/default-page";
import { Field } from "../../components/ui/field";
import { toaster } from "../../components/ui/toaster";
import { useDesenvolvedores } from "../../hooks/useDesenvolvedores";
import { Radio, RadioGroup } from "../../components/ui/radio";
import { SelectNivel } from "../../components/desenvolvedores/select-nivel";
import { useYup } from "../../hooks/useYup";

export function NewDesenvolvedor() {
  const navigate = useNavigate();
  const handleGoBack = () => navigate("/desenvolvedores");
  const [loading, setLoading] = useState(false);
  const [isNivelOpen, setIsNivelOpen] = useState(false);
  const { desenvolvedoresSchema } = useYup();

  const { handleSubmit, handleChange, setFieldValue, values, validateForm } =
    useFormik({
      initialValues: {
        data_nascimento: "",
        hobby: "",
        nivel_id: "",
        nivel: "",
        nome: "",
        sexo: "",
      },
      onSubmit: handleSave,
      validationSchema: desenvolvedoresSchema,
      validateOnBlur: false,
      validateOnChange: false,
    });

  const handleOpenNivel = () => {
    setIsNivelOpen(true);
  };

  const submitForm = async () => {
    const errors = await validateForm();
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((message) => {
        toaster.create({ type: "error", title: message });
      });
      return;
    }

    handleSubmit();
  };

  const handleSelectNivel = (values: { id: number; nivel: string } | null) => {
    if (values?.id && values.nivel) {
      setFieldValue("nivel_id", values.id);
      setFieldValue("nivel", values.nivel);
    }
    setIsNivelOpen(false);
  };

  const { createDesenvolvedor } = useDesenvolvedores();

  async function handleSave(value: any) {
    setLoading(true);
    try {
      await createDesenvolvedor(value);
      toaster.create({
        type: "success",
        title: "Desenvolvedor criado com sucesso!",
      });
      navigate("/desenvolvedores");
    } catch (error: any) {
      const title =
        error?.response?.data?.message ?? "Erro ao criar desenvolvedor!";
      toaster.create({ type: "error", title });
    } finally {
      setLoading(false);
    }
  }

  return (
    <DefaultPage
      pageTitle={isNivelOpen ? "Selecione o nível" : `Novo desenvolvedor`}
    >
      {isNivelOpen ? (
        <SelectNivel isOpen={isNivelOpen} onNivelSelect={handleSelectNivel} />
      ) : (
        <Stack align={"center"} justify={"center"} gap={"30px"}>
          <Box bg={"gray.200"} h={"1px"} w={"100%"} />

          <Field label="Nome" required w={{ base: "80%", md: "60%" }}>
            <Input
              name={"nome"}
              value={values.nome}
              type="text"
              aria-label="Informe o nome"
              placeholder="Informe o nome"
              h={"50px"}
              onChange={handleChange}
            />
          </Field>

          <Field
            label="Data de nascimento"
            required
            w={{ base: "80%", md: "60%" }}
          >
            <Input
              name={"data_nascimento"}
              value={values.data_nascimento}
              type="date"
              aria-label="Informe a data de nascimento"
              placeholder="Informe a data de nascimento"
              h={"50px"}
              onChange={handleChange}
            />
          </Field>

          <Field label="Sexo" required w={{ base: "80%", md: "60%" }}>
            <RadioGroup
              size="md"
              colorPalette={"blue"}
              defaultValue={values.sexo}
              onValueChange={({ value }) => setFieldValue("sexo", value)}
            >
              <HStack gap="4">
                <Radio value="M">Masculino</Radio>
                <Radio value="F">Feminino</Radio>
              </HStack>
            </RadioGroup>
          </Field>

          <Field label="Nível" required w={{ base: "80%", md: "60%" }}>
            <Input
              name={"hobby"}
              onFocus={handleOpenNivel}
              readOnly={true}
              value={values.nivel}
              type="text"
              aria-label="Selecione o nível"
              placeholder="Selecione o nível"
              h={"50px"}
              onChange={handleChange}
            />
          </Field>

          <Field label="Hobby" required w={{ base: "80%", md: "60%" }}>
            <Input
              name={"hobby"}
              type="text"
              value={values.hobby}
              aria-label="Informe o hobby"
              placeholder="Informe o hobby"
              h={"50px"}
              onChange={handleChange}
            />
          </Field>

          <Box bg={"gray.200"} h={"1px"} w={"100%"} />

          {loading ? (
            <Spinner size={"lg"} />
          ) : (
            <ConfirmButtons onSave={submitForm} goBack={handleGoBack} />
          )}
        </Stack>
      )}
    </DefaultPage>
  );
}
