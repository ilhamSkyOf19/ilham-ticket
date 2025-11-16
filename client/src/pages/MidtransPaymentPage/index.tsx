import { useEffect, type FC } from "react";
import { useLocation } from "react-router-dom";

const MidtransPaymentPage: FC = () => {
  // get state from navigate
  const { state } = useLocation() as {
    state: {
      url: string;
    };
  };
  // redirect
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = state.url;
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-black">
      <h1 className="text-4xl font-bold text-white text-center">
        Open Midtrans <br /> Payment
      </h1>
    </div>
  );
};

export default MidtransPaymentPage;
