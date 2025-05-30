    type BtnAddProps = {
        onClick: () => void;
    }
const BtnAdd = ({onClick}:BtnAddProps) => {
    return (
        <button className="border text-center bg-blue-300 hover:bg-sky-700 w-36 rounded-2xl font-bold" onClick={onClick}>Adicionar</button>
    )
}
export default BtnAdd