import { Box, Center, Input, Spinner, Stack } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router";
import { ConfirmButtons } from "../../components/confirm-buttons";
import { DefaultPage } from "../../components/default-page";
import { useNiveis } from "../../hooks/useNiveis";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toaster } from "../../components/ui/toaster";
import { Field } from "../../components/ui/field";
import { Nivel } from "../../@types/nivel.types";
import { useYup } from "../../hooks/useYup";
import * as yup from "yup";

export function EditNivel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleGoBack = () => navigate("/niveis");
  const [loading, setLoading] = useState(false);
  const { getNivelById, editNivel } = useNiveis();
  const { createNivelSchema } = useYup();

  const { isLoading, data, error } = useQuery({
    queryKey: ["NIVEL-BY-ID", id],
    queryFn: async () => getNivelById(String(id)),
  });

  const { handleSubmit, handleChange, values, setValues, validateForm } =
    useFormik({
      initialValues: {
        nivel: "",
      },
      onSubmit: handleSave,
      validationSchema: createNivelSchema,
      validateOnBlur: false,
      validateOnChange: false,
    });

  useEffect(() => {
    if (error) {
      toaster.create({
        type: "error",
        title: "Erro ao buscar nível!",
      });
      navigate("/niveis");
    }
  }, [error]);

  useEffect(() => {
    if (data && data.length > 0) {
      setValues({
        nivel: data[0].nivel,
      });
    }
  }, [data]);

  async function handleSave(value: Nivel) {
    setLoading(true);
    try {
      await editNivel(Number(id), value.nivel);
      toaster.create({
        type: "success",
        title: "Nível atualizado com sucesso!",
      });
      navigate("/niveis");
    } catch (error: any) {
      if (error instanceof yup.ValidationError) {
        toaster.create({ type: "error", title: error.message });
      }
      const title =
        error?.response?.data?.message ?? "Erro ao atualizar nível!";
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
    <DefaultPage pageTitle={`Editando nível: ${id}`}>
      <Stack align={"center"} justify={"center"} gap={"30px"}>
        <Box bg={"gray.200"} h={"1px"} w={"100%"} />

        {isLoading ? (
          <Center>
            <Spinner size={"lg"} />
          </Center>
        ) : null}

        {values.nivel && (
          <Field label="Nível" required w={{ base: "80%", md: "60%" }}>
            <Input
              value={values.nivel}
              name={"nivel"}
              type="text"
              aria-label="Informe o nível"
              placeholder="Informe o nível"
              h={"50px"}
              onChange={handleChange}
            />
          </Field>
        )}

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
