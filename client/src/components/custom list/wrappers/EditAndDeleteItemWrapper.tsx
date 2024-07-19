import Modal from "@/components/Modal";
import { TextInput } from "@/components/TextInput";
import React, { useState } from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

interface PropsEditAndDeleteItemWrapper {
	onEdit: (id: number, amount: number) => void;
	onDelete: (id: number) => void;
	children: React.ReactNode;
	id: number;
}

const EditAndDeleteItemWrapper = ({
	children,
	onEdit,
	onDelete,
	id,
}: PropsEditAndDeleteItemWrapper) => {
	const [editModal, setEditModal] = useState<boolean>(false);
	const [amount, setAmount] = useState<number>(0);
	return (
		<>
			<div className="relative group">
				{children}
				<div className="absolute top-0 right-0 bg-gray-400 bg-opacity-90 p-2 rounded hidden group-hover:flex justify-around items-center space-x-2 w-full h-full">
					<FaEdit
						className="text-blue-500 cursor-pointer"
						onClick={() => setEditModal(true)}
					/>
					<FaRegTrashAlt
						className="text-red-500 cursor-pointer"
						onClick={() => onDelete(id)}
					/>
				</div>
			</div>
			{editModal && (
				<Modal
					title={`Edit the amount`}
					closeModal={() => setEditModal(false)}
					handleNext={() => {
						onEdit(id, amount);
					}}
					searchPart={false}
				>
					<TextInput
						inputText="Amount"
						placeholderText={amount + ""}
						value={amount + ""}
						setValue={e => setAmount(Number.parseInt(e.target.value))}
						icon={<></>}
					/>
				</Modal>
			)}
		</>
	);
};

export default EditAndDeleteItemWrapper;
