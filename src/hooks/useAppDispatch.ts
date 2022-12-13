import { AppDispatch } from "store";
import { useDispatch } from "react-redux";

const useAppDispatch: () => AppDispatch = useDispatch; // Export
export default useAppDispatch;
