import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";
import BtnAdd from "../components/BtnAdd";
import Form from "../components/Form";
import Header from "../components/Header";

type FormCommitment = {
  id: number;
  date: string; // no formato ISO: YYYY-MM-DD
  time: string;
  description: string;
};

type SortColumn = "date" | "time";
type SortCriterion = {
  column: SortColumn;
  direction: "asc" | "desc";
};

const Home: React.FC = () => {
  // estados
  const [modalOpen, setModalOpen] = useState(false);
  const [commitmentList, setCommitmentList] = useState<FormCommitment[]>([]);
  const [editingCommitment, setEditingCommitment] =
    useState<FormCommitment | null>(null);

  // múltiplos critérios de ordenação
  const [sortCriteria, setSortCriteria] = useState<SortCriterion[]>([]);

  // carregar lista compromisso ao iniciar
  useEffect(() => {
    const data = localStorage.getItem("list");
    if (data) {
      setCommitmentList(JSON.parse(data));
    }
  }, []);

  // atualiza lista compromisso no localStorage
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(commitmentList));
  }, [commitmentList]);

  // adiciona novo compromisso na lista
  const handleAdd = (newCommit: FormCommitment) => {
    const updateList = [...commitmentList, newCommit];
    setCommitmentList(updateList);
    setModalOpen(false);
  };

  // editar compromisso
  const handleEdit = (commitment: FormCommitment) => {
    setEditingCommitment(commitment);
    setModalOpen(true);
  };

  //atualiza compromisso
  const handleUpdate = (updated: FormCommitment) => {
    const listUpdate = commitmentList.map((i) =>
      i.id === updated.id ? updated : i
    );
    setCommitmentList(listUpdate);
    setEditingCommitment(null);
    setModalOpen(false);
  };

  // remove compromisso
  const handleRemove = (id: number) => {
    const updateList = commitmentList.filter((item) => item.id !== id);
    setCommitmentList(updateList);
  };
  const handleSortClick = (column: SortColumn) => {
    setSortCriteria((prev) => {
      const existingIndex = prev.findIndex((c) => c.column === column);

      if (existingIndex === 0) {
        const newDirection = prev[0].direction === "asc" ? "desc" : "asc";
        return [{ column, direction: newDirection }, ...prev.slice(1)];
      } else if (existingIndex > 0) {
        const newArray = prev.filter((c) => c.column !== column);
        return [{ column, direction: "asc" }, ...newArray];
      } else {
        return [{ column, direction: "asc" }, ...prev];
      }
    });
  };

  // ordena lista por criterio
  const getSortedList = (): FormCommitment[] => {
    if (sortCriteria.length === 0) return commitmentList;

    const sorted = [...commitmentList].sort((a, b) => {
      for (const { column, direction } of sortCriteria) {
        const aVal = a[column];
        const bVal = b[column];

        if (aVal < bVal) return direction === "asc" ? -1 : 1;
        if (aVal > bVal) return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  };

  const getSortSymbol = (column: SortColumn) => {
    if (sortCriteria.length === 0) return "";
    if (sortCriteria[0].column !== column) return "";
    return sortCriteria[0].direction === "asc" ? "▲" : "▼";
  };

  // converte data
  const formatDateBR = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  const sortedList = getSortedList();

  return (
    <>
      {modalOpen && (
        <div className="absolute w-full flex items-center justify-center h-svh z-10 text-white bg-black/50 ">
          <div className="m-2 w-full flex items-center justify-center">
            <button
              className="absolute top-2 right-2 text-xl"
              onClick={() => setModalOpen(false)}
            >
              ❌
            </button>
            <Form
              onAdd={handleAdd}
              editingCommitment={editingCommitment}
              onUpdate={handleUpdate}
            />
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
          <table>
            <thead>
              <tr className="border-b-2">
                <th
                  className="hover:bg-sky-700 rounded-tl-2xl  text-center cursor-pointer"
                  onClick={() => handleSortClick("date")}
                >
                  <span className="px-8 inline-flex items-center w-full justify-center gap-1">
                    Data
                    <strong className="text-gray-700">{getSortSymbol("date")}</strong>
                  </span>
                </th>
                <th
                  className="px-7 hover:bg-sky-700 border-l-2 text-center cursor-pointer"
                  onClick={() => handleSortClick("time")}
                >
                  <span className="inline-flex items-center justify-center gap-1">
                    Hora
                    <strong className="text-gray-700">{getSortSymbol("time")}</strong>
                  </span>
                </th>
                <th className="w-full hover:bg-sky-700 border-l-2 rounded-tr-2xl text-center">
                  Descrição
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedList.map((commitment) => (
                <tr className="border-b-2 my-4" key={commitment.id}>
                  <td className="text-center border-r-2">{formatDateBR(commitment.date)}</td>
                  <td className="text-center border-r-2">{commitment.time}</td>
                  <td>
                    <ul className="flex justify-between items-center px-4">
                      <li className="break-all">{commitment.description}</li>
                      <li className="flex gap-2">
                        <button onClick={() => handleEdit(commitment)}>
                          <CiEdit size={25} />
                        </button>
                        <button onClick={() => handleRemove(commitment.id)}>
                          <FaTrash size={20} />
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
