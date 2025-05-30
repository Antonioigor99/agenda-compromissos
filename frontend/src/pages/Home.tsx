import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";
import BtnAdd from "../components/BtnAdd";
import Form from "../components/Form";
import Header from "../components/Header";

type FormCommitment = {
  id: number;
  date: string;
  time: string;
  description: string;
};

const Home: any = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [commitmentList, setCommitmentList] = useState<FormCommitment[]>([]);

  //carregar lista compromisso ao iniciar
  useEffect(() => {
    const data = localStorage.getItem("list");
    if (data) {
      setCommitmentList(JSON.parse(data));
    }
  }, []);

  // atualiza lista compromisso
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(commitmentList));
  }, [commitmentList]);

  //remove compromisso
  const handleRemove = (id: number) => {
    const updateList = commitmentList.filter((item) => item.id !== id);
    setCommitmentList(updateList);
  };
  //adiciona novo compromisso na lista
  const handleAdd = (newCommint: FormCommitment) => {
    const updateList = [...commitmentList, newCommint];
    setCommitmentList(updateList);
    setModalOpen(false);
  };
  return (
    <>
      {modalOpen && (
        <div className="absolute w-full h-svh z-10 text-white bg-black opacity-55 ">
          <div>
            <button onClick={() => setModalOpen(false)}>❌</button>
            <Form onAdd={handleAdd} />
          </div>
        </div>
      )}
      <Header />
      <section className="w-full flex flex-col items-center py-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold pb-4">Agenda de compromisso</h1>
          <BtnAdd onClick={() => setModalOpen(true)} />
        </div>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 px-10 gap-4">
          {commitmentList.map((commitment) => (
            <div
              key={commitment.id}
              className="border rounded-2xl bg-blue-300 p-4 shadow-md flex flex-col justify-between"
            >
              <div className="mb-2">
                <div className="flex justify-between items-center border-b pb-1">
                  <span className="font-semibold">Data:</span>
                  <span>{commitment.date}</span>
                </div>
                <div className="flex justify-between items-center border-b py-1">
                  <span className="font-semibold">Hora:</span>
                  <span>{commitment.time}</span>
                </div>
                <div className="flex justify-between items-start pt-1">
                  <span className="font-semibold">Descrição:</span>
                  <p className="ml-2 break-words flex-1">
                    {commitment.description}
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-2">
                <button onClick={() => console.log("Editar", commitment.id)}>
                  <CiEdit size={25} className="hover:text-blue-800" />
                </button>
                <button onClick={() => handleRemove(commitment.id)}>
                  <FaTrash
                    size={20}
                    className="text-red-600 hover:text-red-800"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
export default Home;
