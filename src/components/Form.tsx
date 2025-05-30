import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

type formCommitment = {
    id: number;
    date: string;
    time: string;
    description: string;
};

type FormProps = {
    onAdd: (commitment: formCommitment) => void;
};

const Form = ({ onAdd }: FormProps) => {
    // Estados do formulário
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');

    // Controle de data mínima e hora mínima
    const [today, setToday] = useState('');
    const [minTime, setMinTime] = useState('');

    // Atualiza today e minTime uma vez
    useEffect(() => {
        const now = new Date();
        const formattedDate = now.toISOString().split('T')[0]; // YYYY-MM-DD
        const formattedTime = now.toTimeString().slice(0, 5);   // HH:MM
        setToday(formattedDate);
        setMinTime(formattedTime);
    }, []);

    // Envio do formulário
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!date || !time || !description) {
            toast.error('Preencha todos os campos!');
            return;
        }

        // Verifica se a data e hora são no passado
        const selectedDateTime = new Date(`${date}T${time}`);
        const now = new Date();

        if (selectedDateTime < now) {
            toast.error('Não é possível adicionar um compromisso no passado!');
            return;
        }

        const newCommitment = {
            id: Date.now(),
            date,
            time,
            description,
        };

        onAdd(newCommitment);

        // Limpa os campos
        setDate('');
        setTime('');
        setDescription('');
        toast.success('Compromisso adicionado com sucesso');
    };

    return (
        <form
            className="max-h-9/12 flex flex-col p-8 justify-center items-center rounded-2xl border-4 border-black bg-blue-400 mt-20"
            onSubmit={handleSubmit}
        >
            <div className="h-full w-full flex flex-col justify-center gap-10 text-xl">
                <p className="px-20 ">
                    Data: <input
                        type="date"
                        min={today}
                        className="border px-4 rounded-xl outline-none text-white"
                        name="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </p>

                <p className="px-20">
                    Hora: <input
                        type="time"
                        name="time"
                        value={time}
                        className="border px-4 rounded-xl outline-none"
                        min={date === today ? minTime : undefined}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </p>

                <div className="">
                    <p className="px-20">Descrição:</p>
                    <textarea
                        className="rounded-xl outline-none text-black resize-none w-full px-2 py-2 bg-white h-40"
                        name="description"
                        placeholder="Descreva seu compromisso."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
            </div>

            <button className="border rounded-xl p-2" type="submit">
                Salvar compromisso
            </button>
        </form>
    );
};

export default Form;
