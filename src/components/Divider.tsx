interface DividerProps {
    style?: React.CSSProperties; // Permite estilos adicionais
}

const Divider: React.FC<DividerProps> = ({ style }) => {
    return (
        <hr className="my-4 border-gray-300"
        />
    );
};

export default Divider;