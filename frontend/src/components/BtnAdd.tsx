    type BtnAddProps = {
        onClick: () => void;
    }
const BtnAdd = ({onClick}:BtnAddProps) => {
    return (
        <button className="border text-center w-36 rounded-2xl" onClick={onClick}>Adicionar</button>
    )
}
export default BtnAdd