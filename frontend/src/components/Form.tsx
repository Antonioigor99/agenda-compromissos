import {  useState } from "react";
type formCommitment = {
    id: number;
    date: string;
    time: string;
    description: string;
}
type FormProps = {
    onAdd:(commitment: formCommitment) => void;
}
const Form = ({onAdd}:FormProps) => {
    //criando estados
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');

    //pegar formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const newCommitment = {
            id: Date.now(),
            date,
            time,
            description,
        };
        onAdd(newCommitment);

        //Limpar campos
        setDate('');
        setTime('');
        setDescription('');
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <p>
                    Data: <input className="border" type="date" name="date" value={date} onChange={e => setDate(e.target.value)} />
                </p>
                <p>
                    Hora: <input className="border" type="time" name="time" value={time} onChange={e => setTime(e.target.value)} />
                </p>
                <textarea className="border"
                    name="description"
                    placeholder="Descição do compromisso"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                ></textarea>
            </div>
            <button className="border p-2" type="submit" >Salvar compromisso</button>
        </form>
    )
}
export default Form