import { type FC } from 'react'
import Modal from 'react-modal'
import { GoAlert } from "react-icons/go";

type Props = {
    active: boolean;
    handleClose: () => void;
    handleDelete: (id: number) => void;
    id: number
}
const ModalDelete: FC<Props> = ({ active, handleDelete, handleClose, id }) => {
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
                    width: "70%",
                    height: "30%",
                    borderRadius: "20px",
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    backdropFilter: "blur(10px)",
                },
            }}
        >

            {/* content */}
            <div className='w-full h-full flex flex-col justify-start items-center px-4'>
                {/* icon alert */}
                <GoAlert className='text-5xl text-red-500' />

                {/* description */}
                <p className='text-white font-semibold text-lg mt-4 text-center '>Apakah kamu yakin ingin menghapus data ini ?</p>

                {/* button action */}
                <div className='w-full flex flex-row justify-around items-center mt-4'>
                    {/* button cancel */}
                    <button type='button' className='text-white font-semibold text-base py-2.5 px-4 bg-white/10 rounded-2xl' onClick={handleClose}>Batal</button>

                    {/* button delete */}
                    <button type='button' className='text-white font-semibold text-base py-2.5 px-4 bg-red-500 rounded-2xl' onClick={() => handleDelete(id)}>Hapus</button>
                </div>
            </div>

        </Modal>
    )
}

export default ModalDelete
