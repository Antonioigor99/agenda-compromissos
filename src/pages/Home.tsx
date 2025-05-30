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
        <div className="absolute w-full flex items-center justify-center h-svh z-10 text-white bg-black/50 ">
          <div className="m-2 w-full flex items-center justify-center">
            <button className="absolute top-2 right-2 text-xl" onClick={() => setModalOpen(false)}>❌</button>
            <Form onAdd={handleAdd} />
          </div>
        </div>
      )}
      <Header />
      <section className="w-full flex flex-col px-4 items-center py-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold pb-4">Agenda de compromisso</h1>
          <BtnAdd onClick={() => setModalOpen(true)} />
        </div>
        <div className="mt-5 max-w-7xl w-full pb-5 border-4 rounded-2xl bg-blue-300 text-xl">
          <table className="">
          <thead>
            <tr className="border-b-2">
              <th className="px-8 hover:bg-sky-700 rounded-tl-2xl text-center">
                Data
              </th>
              <th className="px-7 hover:bg-sky-700 border-l-2 text-center">
                Hora
              </th>
              <th className="w-full hover:bg-sky-700 border-l-2 rounded-tr-2xl text-center">
                Descrição
              </th>
            </tr>
          </thead>
          <tbody className="">
            {commitmentList.map((commitment) => (
              <tr
                className="border-b-2 my-4"
                key={commitment.id}
              >
                <td className="text-center border-r-2">
                  {commitment.date}
                </td>
                <td className="text-center border-r-2">
                  {commitment.time}
                </td>
                <td className="">
                  <ul className="flex justify-between items-center px-4">
                    <li className="break-all">{commitment.description}</li>
                    <li className="flex gap-2">
                        <p><CiEdit size={25} /></p>
                        <button
                  className=""
                  onClick={() => handleRemove(commitment.id)}
                ><FaTrash size={20} />  
                </button>
                    </li>
                  </ul>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        
      </section>
    </>
  );
};
export default Home;
