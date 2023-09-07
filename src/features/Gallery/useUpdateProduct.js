import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditProduct } from "../../services/apiProduct";
import { toast } from "react-hot-toast";
function useUpdateProduct({ setShowModal, reset }) {
    const queryClient = useQueryClient();
    const { mutate: updateProduct, isLoading: isUpdating } = useMutation({
        mutationFn: ({ newProductData, id }) =>
            createEditProduct(newProductData, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success("Cập nhật thành công sản phẩm");
            setShowModal(false)
            reset()
        },
        onError: (err) => toast.error(err.message),
    });
    return { isUpdating, updateProduct }
}

export default useUpdateProduct
