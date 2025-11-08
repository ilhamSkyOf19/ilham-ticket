import { type FC } from 'react'
import { IoClose } from 'react-icons/io5';
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
                    display: "flex",
                    justifyContent: "center", // horizontal center
                    alignItems: "center", // vertical center
                },
                content: {
                    position: 'relative',
                    inset: 'unset',
                    width: "75%",
                    height: "20%",
                    borderRadius: "20px",
                    backgroundColor: "white",
                },
            }}
        >
            <div className='w-full h-full flex flex-col justify-center items-center relative'>

                {/* icon close  */}
                <button type="button" className='absolute -top-3.5 -right-2.5' onClick={handleClose}>
                    <IoClose className='w-8 h-8' onClick={handleClose} />
                </button>


                <h2 className='text-black text-base font-semibold'>{message}</h2>
            </div>
        </Modal>
    )
}

export default ModalErrorUp;
