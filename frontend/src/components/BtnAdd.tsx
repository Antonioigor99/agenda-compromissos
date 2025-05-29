    type BtnAddProps = {
        onClick: () => void;
    }
const BtnAdd = ({onClick}:BtnAddProps) => {
    return (
        <button className="border px-4 py-1 rounded-2xl" onClick={onClick}>Adicionar</button>
    )
}
export default BtnAdd