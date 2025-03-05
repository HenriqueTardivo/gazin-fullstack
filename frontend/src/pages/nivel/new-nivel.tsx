import { Box, Input, Spinner, Stack } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Nivel } from "../../@types/nivel.types";
import { ConfirmButtons } from "../../components/confirm-buttons";
import { DefaultPage } from "../../components/default-page";
import { Field } from "../../components/ui/field";
import { toaster } from "../../components/ui/toaster";
import { useNiveis } from "../../hooks/useNiveis";
import { useYup } from "../../hooks/useYup";
import * as yup from "yup";

export function NewNivel() {
  const navigate = useNavigate();
  const handleGoBack = () => navigate("/niveis");
  const [loading, setLoading] = useState(false);
  const { createNivelSchema } = useYup();

  const { handleSubmit, handleChange, validateForm } = useFormik({
    initialValues: {
      nivel: "",
    },
    onSubmit: handleSave,
    validationSchema: createNivelSchema,
    validateOnBlur: false,
    validateOnChange: false,
  });

  const { createNivel } = useNiveis();

  async function handleSave(value: Nivel) {
    setLoading(true);
    try {
      await createNivel(value.nivel);
      toaster.create({ type: "success", title: "Nível criado com sucesso!" });
      navigate("/niveis");
    } catch (error: any) {
      console.log(error);
      if (error instanceof yup.ValidationError) {
        toaster.create({ type: "error", title: error.message });
      }
      const title = error?.response?.data?.message ?? "Erro ao criar nível!";
      toaster.create({ type: "error", title });
    } finally {
      setLoading(false);
    }
  }

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

  return (
    <DefaultPage pageTitle={`Novo nível`}>
      <Stack align={"center"} justify={"center"} gap={"30px"}>
        <Box bg={"gray.200"} h={"1px"} w={"100%"} />

        <Field label="Nível" required w={{ base: "80%", md: "60%" }}>
          <Input
            name={"nivel"}
            type="text"
            aria-label="Informe o nível"
            placeholder="Informe o nível"
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
    </DefaultPage>
  );
}
