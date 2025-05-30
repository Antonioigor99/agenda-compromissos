<<<<<<< HEAD
import { useEffect, useState } from "react";
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
    const [modalOpen, setModalOpen] = useState(false)
    const [commitmentList, setCommitmentList] = useState<FormCommitment[]>([]);

    //carregar lista compromisso ao iniciar
    useEffect(() => {
        const data = localStorage.getItem('list');
        if (data) {
            setCommitmentList(JSON.parse(data));
        }
    }, []);

    // atualiza lista compromisso
    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(commitmentList));
    }, [commitmentList]);

    //remove compromisso
    const handleRemove = (id: number) => {
        const updateList = commitmentList.filter(item => item.id !== id);
        setCommitmentList(updateList);
    }
    //adiciona novo compromisso na lista
    const handleAdd = (newCommint: FormCommitment) => {
        const updateList = [...commitmentList, newCommint];
        setCommitmentList(updateList);
        setModalOpen(false);
    }
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
            <section className="w-full h-180 border flex flex-col items-center  py-4">
                <div className="text-center">
                    <h1 className="text-6xl font-bold pb-4">Agenda de compromisso</h1>
                    <BtnAdd onClick={() => setModalOpen(true)} />
                </div>
                <ul>
                    {commitmentList.map(commitment => (
                        <li key={commitment.id}>
                            <p><strong>Data: </strong>{commitment.date}</p>
                            <p><strong>Hora: </strong>{commitment.time}</p>
                            <p><strong>Descrição: </strong>{commitment.description}</p>
                            <button onClick={() => handleRemove(commitment.id)}></button>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    )
}
=======
import { useEffect, useState } from "react";
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
    const [modalOpen, setModalOpen] = useState(false)
    const [commitmentList, setCommitmentList] = useState<FormCommitment[]>([]);

    //carregar lista compromisso ao iniciar
    useEffect(() => {
        const data = localStorage.getItem('list');
        if (data) {
            setCommitmentList(JSON.parse(data));
        }
    }, []);

    // atualiza lista compromisso
    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(commitmentList));
    }, [commitmentList]);

    //remove compromisso
    const handleRemove = (id: number) => {
        const updateList = commitmentList.filter(item => item.id !== id);
        setCommitmentList(updateList);
    }
    //adiciona novo compromisso na lista
    const handleAdd = (newCommint: FormCommitment) => {
        const updateList = [...commitmentList, newCommint];
        setCommitmentList(updateList);
        setModalOpen(false);
    }
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
            <section className="w-full h-180 border flex flex-col items-center  py-4">
                <div className="text-center">
                    <h1 className="text-6xl font-bold pb-4">Agenda de compromisso</h1>
                    <BtnAdd onClick={() => setModalOpen(true)} />
                </div>
                <ul>
                    {commitmentList.map(commitment => (
                        <li key={commitment.id}>
                            <p><strong>Data: </strong>{commitment.date}</p>
                            <p><strong>Hora: </strong>{commitment.time}</p>
                            <p><strong>Descrição: </strong>{commitment.description}</p>
                            <button onClick={() => handleRemove(commitment.id)}></button>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    )
}
>>>>>>> 6366c8d (atualização pastas)
export default Home;