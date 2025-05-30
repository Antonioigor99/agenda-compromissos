import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useEffect, useState } from 'react'

const Header = (): any => {
    const [dataFormatada, setDataFormatada] = useState('');
    const [horaFormatada, setHoraFormatada] = useState('');
    useEffect(() => {
        const atualizar = () => {
            const agora = new Date();

            // set Data
            const data = format(agora, "EEEE dd MMMM yyyy", { locale: ptBR });
            const dataComPrimeiraMaiuscula = data.charAt(0).toUpperCase() + data.slice(1);
            setDataFormatada(dataComPrimeiraMaiuscula);

            // set Hora
            const hora = format(agora, "HH:mm:ss");
            setHoraFormatada(hora);
        };

        atualizar();
        const timer = setInterval(atualizar, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <header className=" w-full  py-20 text-center">
            <p className='text-6xl'>{dataFormatada}</p>
            <p className='text-4xl'>{horaFormatada}</p>
        </header>
    )
}
export default Header