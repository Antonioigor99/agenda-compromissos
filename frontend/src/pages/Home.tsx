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

    //carregar ao iniciar
    useEffect(() => {
        const data = localStorage.getItem('list');
        if (data) {
            setCommitmentList(JSON.parse(data));
        }
    },[]);

    // atualizar ao mudar
    useEffect(()=>{
        localStorage.setItem('list', JSON.stringify(commitmentList));
    },[commitmentList]);
    const handleRemove = (id: number) => {
        const updateList = commitmentList.filter(item => item.id !== id);
        setCommitmentList(updateList);
    }
    const handleAdd = (newCommint:FormCommitment) =>{
        const updateList = [...commitmentList, newCommint];
        setCommitmentList(updateList);
        setModalOpen(false);
    }
    return (
        <>
            <Header />
            <section className="w-full h-180 border flex flex-col items-center">
                <BtnAdd onClick={() => setModalOpen(true)} />
                {modalOpen && (
                    <div>
                        <div>
                            <button onClick={() => setModalOpen(false)}>❌</button>
                            <Form onAdd={handleAdd} />
                        </div>
                    </div>
                )}
                <ul>
                    {commitmentList.map(commitment =>(
                        <li key={commitment.id}>
                            <p><strong>Data: </strong>{commitment.date}</p>
                            <p><strong>Hora: </strong>{commitment.time}</p>
                            <p><strong>Descrição: </strong>{commitment.description}</p>
                            <button onClick={()=> handleRemove(commitment.id)}></button>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    )
}
export default Home;