import { type FC } from 'react'
import Modal from 'react-modal';


Modal.setAppElement("#root"); // <- ini wajib di React apps

type Props = {
    active: boolean;
    handleClose: () => void;
    message: string
}
const ModalErrorUp: FC<Props> = ({ active, handleClose, message }) => {
    return (
        <Modal
            isOpen={active}
            onRequestClose={handleClose}
            style={{
                overlay: {
                    backgroundColor: "rgba(0,0,0,0.5)",
                    zIndex: 9999, // pastikan lebih tinggi dari elemen lain
                },
                content: {
                    bottom: "0",
                    left: "50%",
                    top: "20%",
                    transform: "translateX(-50%)",
                    height: "20%",
                    borderRadius: "20px",
                    padding: "20px",
                    backgroundColor: "white",
                    zIndex: 10000, // content juga bisa diberi zIndex
                },
            }}
        >
            <h2>{message}</h2>
            <button onClick={handleClose}>Close</button>
        </Modal>
    )
}

export default ModalErrorUp;
