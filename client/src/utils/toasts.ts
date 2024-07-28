import { toast, ToastOptions } from "react-toastify";

const options: ToastOptions<unknown> = {
	position: "bottom-center",
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: "dark",
};

export const showErrorToast = (message: string) => {
	toast.error(message, options);
};

export const showSuccessToast = (message: string) => {
	toast.success(message, options);
};

export const showWarningToast = (message: string) => {
	toast.warning(message, options);
};

// for all errors from api
export const handleErrorToast = (e: unknown) => {
	if (e instanceof Error) {
		showErrorToast(e.message);
	} else {
		showErrorToast("An unexpected error");
	}
};
