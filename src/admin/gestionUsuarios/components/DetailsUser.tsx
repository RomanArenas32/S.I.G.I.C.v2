import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { UsuarioUpdate } from "../../interfaces/usuario";
import { useState } from "react";
import { delegaciones, roles } from "../../../info";
import { Mensaje } from "../../../utils/interfaces/mensaje";
import { Alerta } from "../../../utils";
import axios from "axios";

const url = import.meta.env.VITE_API_URL;

interface UsuarioEdit {
  usuario: UsuarioUpdate;
}

export const DetailsUser: React.FC<UsuarioEdit> = ({ usuario }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mensaje, setMensaje] = useState<Mensaje>({});
  const [usEdit, setUsEdit] = useState<UsuarioUpdate>({
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    legajo: usuario.legajo,
    delegacion: usuario.delegacion,
    rol: usuario.rol,
    estado: usuario.estado,
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUsEdit((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const enviarEdiccionUsuario = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(usEdit);
    if (usEdit.delegacion[1] === "-" || usEdit.rol[1] === "-") {
      setMensaje({ error: true, msg: "Seleccione un rol y delegacion" });
      setTimeout(() => {
        setMensaje({});
      }, 3000);
      return;
    }

    if (
      usEdit.nombre.trim() === "" ||
      usEdit.apellido.trim() === "" ||
      usEdit.delegacion.trim() === "" ||
      usEdit.rol.trim() === "" ||
      usEdit.legajo.trim() === ""
    ) {
      setMensaje({ error: true, msg: "No puede haber campos vacios" });
      setTimeout(() => {
        setMensaje({});
      }, 3000);
      return;
    }
    try {
      const resp = await axios.patch(`${url}/api/v1/usuarios/edit`, usEdit);
      setMensaje({ error: false, msg: resp.data.mensaje });
      setMensaje({ error: false, msg: "Usuario actualizado correctamente" });
      setTimeout(() => {
        setMensaje({});
      }, 1500);
    } catch (error) {
      console.log(error);
      setMensaje({ error: true, msg: "Error al actualizar el usuario" });
      setTimeout(() => {
        setMensaje({});
      }, 1500);
      return;
    }
    setTimeout(() => {
      onClose();
    }, 2000);
  };
  const { msg } = mensaje;

  return (
    <>
      <Button onClick={onOpen} bg="blue.600" color="white">
        Editar
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          className="rounded-lg shadow-2xl p-2 grid place-items-center my-4 md:mx-6 pt-6"
          bg="gray.800"
          color="white"
        >
          <ModalHeader>Editar el usuario</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={3}>
              <FormLabel>Nombre</FormLabel>
              <Input
                placeholder="Nombre"
                value={usEdit.nombre}
                onChange={(e) =>
                  setUsEdit((prevUs) => ({
                    ...prevUs,
                    nombre: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Apellido</FormLabel>
              <Input
                placeholder="Apellido"
                value={usEdit.apellido}
                onChange={(e) =>
                  setUsEdit((prevUs) => ({
                    ...prevUs,
                    apellido: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Legajo</FormLabel>
              <Input
                placeholder="Legajo"
                value={usEdit.legajo}
                onChange={(e) =>
                  setUsEdit((prevUs) => ({
                    ...prevUs,
                    legajo: e.target.value,
                  }))
                }
              />
            </FormControl>

            <FormControl mt={3}>
              <FormLabel>Delegacion</FormLabel>
              <Select
                id="delegacion"
                name="delegacion"
                onChange={handleInputChange}
                value={usEdit.delegacion}
              >
                {delegaciones.map((deleg) => (
                  <option
                    className="bg-gray-800 text-black font-semibold"
                    key={deleg}
                  >
                    {deleg}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt={3}>
              <FormLabel>Rol</FormLabel>
              <Select
                id="rol"
                name="rol"
                onChange={handleInputChange}
                value={usEdit.rol}
              >
                {roles.map((rol) => (
                  <option
                    className="bg-gray-800 text-black font-semibold"
                    key={rol}
                  >
                    {rol}
                  </option>
                ))}
              </Select>
            </FormControl>

            <label className="relative inline-flex items-center cursor-pointer mt-4">
              <input
                className="sr-only peer"
                type="checkbox"
                onChange={() =>
                  setUsEdit({ ...usEdit, estado: !usEdit.estado })
                }
              />
              <div className="  group peer ring-0 bg-gray-800  rounded-full outline-none duration-700 after:duration-200 w-24 h-12  shadow-md peer-checked:bg-gradient-to-r  peer-focus:outline-none  after:content-[''] after:rounded-full after:absolute after:bg-gray-900 after:outline-none after:h-10 after:w-10 after:top-1 after:left-1  peer-checked:after:translate-x-12 peer-hover:after:scale-95">
                <svg
                  y="0"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0"
                  width="100"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid meet"
                  height="100"
                  className="absolute  top-1 left-12 fill-green-600 w-10 h-10"
                >
                  <path
                    d="M50,18A19.9,19.9,0,0,0,30,38v8a8,8,0,0,0-8,8V74a8,8,0,0,0,8,8H70a8,8,0,0,0,8-8V54a8,8,0,0,0-8-8H38V38a12,12,0,0,1,23.6-3,4,4,0,1,0,7.8-2A20.1,20.1,0,0,0,50,18Z"
                    className="svg-fill-primary"
                  ></path>
                </svg>

                <svg
                  y="0"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0"
                  width="100"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid meet"
                  height="100"
                  className="absolute top-1 left-1 fill-red-600  w-10 h-10"
                >
                  <path
                    fillRule="evenodd"
                    d="M30,46V38a20,20,0,0,1,40,0v8a8,8,0,0,1,8,8V74a8,8,0,0,1-8,8H30a8,8,0,0,1-8-8V54A8,8,0,0,1,30,46Zm32-8v8H38V38a12,12,0,0,1,24,0Z"
                  ></path>
                </svg>
              </div>
              {usEdit.estado ? (
                <p className="pl-4 font-semibold">DESABILITAR</p>
              ) : (
                <p className="pl-4 font-semibold">HABILITAR</p>
              )}
            </label>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={enviarEdiccionUsuario}>
              Guardar Cambios
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
          {msg && <Alerta mensaje={mensaje} />}
        </ModalContent>
      </Modal>
    </>
  );
};
