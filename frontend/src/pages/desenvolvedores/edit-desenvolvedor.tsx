import { Box, HStack, Input, Spinner, Stack } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router";
import { ConfirmButtons } from "../../components/confirm-buttons";
import { DefaultPage } from "../../components/default-page";
import { useDesenvolvedores } from "../../hooks/useDesenvolvedores";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toaster } from "../../components/ui/toaster";
import { useFormik } from "formik";
import { Field } from "../../components/ui/field";
import { SelectNivel } from "../../components/desenvolvedores/select-nivel";
import { Radio, RadioGroup } from "../../components/ui/radio";
import { Desenvolvedor } from "../../@types/desenvolvedores.types";
import { useYup } from "../../hooks/useYup";

export function EditDesenvolvedor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleGoBack = () => navigate("/desenvolvedores");
  const [loading, setLoading] = useState(false);
  const { getDesenvolvedoresById, editDesenvolvedor } = useDesenvolvedores();
  const [isNivelOpen, setIsNivelOpen] = useState(false);
  const { desenvolvedoresSchema } = useYup();
  const { isLoading, data, error } = useQuery({
    queryKey: ["DESENVOLVEDOR-BY-ID", id],
    queryFn: async () => getDesenvolvedoresById(String(id)),
  });

  const {
    handleSubmit,
    handleChange,
    values,
    validateForm,
    setValues,
    setFieldValue,
  } = useFormik({
    initialValues: {
      data_nascimento: "",
      hobby: "",
      nivel_id: 0,
      nivel: "",
      nome: "",
      sexo: "",
    },
    onSubmit: handleSave,
    validationSchema: desenvolvedoresSchema,
    validateOnBlur: false,
    validateOnChange: false,
  });

  useEffect(() => {
    if (error) {
      toaster.create({
        type: "error",
        title: "Erro ao buscar desenvolvedor!",
      });
      navigate("/desenvolvedores");
    }
  }, [error]);

  useEffect(() => {
    if (data && data.length > 0) {
      setValues({
        data_nascimento: data[0].data_nascimento.split("T")[0],
        hobby: data[0].hobby,
        nivel_id: Number(data[0].nivel_id),
        nivel: data[0].nivel.nivel,
        nome: data[0].nome,
        sexo: data[0].sexo,
      });
    }
  }, [data]);

  async function handleSave(value: Desenvolvedor) {
    setLoading(true);
    try {
      await editDesenvolvedor(Number(id), value);
      toaster.create({
        type: "success",
        title: "Desenvolvedor atualizado com sucesso!",
      });
      navigate("/desenvolvedores");
    } catch (error: any) {
      const title =
        error?.response?.data?.message ?? "Erro ao atualizar desenvolvedor!";
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

  const handleOpenNivel = () => {
    setIsNivelOpen(true);
  };

  const handleSelectNivel = (values: { id: number; nivel: string } | null) => {
    if (values?.id && values.nivel) {
      setFieldValue("nivel_id", values.id);
      setFieldValue("nivel", values.nivel);
    }
    setIsNivelOpen(false);
  };

  const renderForm = () => {
    if (isLoading) {
      return <Spinner size={"lg"} />;
    }

    if (isNivelOpen) {
      return (
        <SelectNivel isOpen={isNivelOpen} onNivelSelect={handleSelectNivel} />
      );
    }

    return (
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
            value={values.sexo}
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
    );
  };

  return (
    <DefaultPage pageTitle={`Novo desenvolvedor`}>{renderForm()}</DefaultPage>
  );
}
