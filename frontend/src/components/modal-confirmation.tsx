import { Button, Center, Spinner, Text } from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../components/ui/dialog";

type Props = {
  data: ModalConfirmationData;
  isLoading: boolean;
  onConfirm: (confirm: boolean) => void;
};

export type ModalConfirmationData = {
  title: string;
  id: number;
} | null;

export function ModalConfirmation({ isLoading, data, onConfirm }: Props) {
  return (
    <DialogRoot
      placement={"center"}
      motionPreset="slide-in-bottom"
      open={!!data}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle color={"blue.700"}>Atenção!</DialogTitle>
        </DialogHeader>
        <DialogBody>
          {isLoading ? (
            <Center>
              <Spinner />
            </Center>
          ) : (
            <Text fontSize={"lg"}>{data?.title}</Text>
          )}
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" onClick={() => onConfirm(false)}>
              Cancelar
            </Button>
          </DialogActionTrigger>
          <Button
            bg={"blue.700"}
            onClick={() => onConfirm(true)}
            _hover={{ opacity: 0.8 }}
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
