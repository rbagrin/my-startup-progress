import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Mutations from "../graphql/mutations";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../routes";
import Queries from "../graphql/queries";

export const AddPhase = () => {
  const [name, setName] = useState<string>("");
  const [phaseDescription, setDescription] = useState<string>("");

  const [addPhase] = useMutation(Mutations.ADD_PHASE, {
    variables: { name, phaseDescription },
    refetchQueries: [{ query: Queries.GET_PHASES }],
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const navigate = useNavigate();

  const goHome = () => navigate(HOME_ROUTE);

  return (
    <div>
      <div
        className="flex flex-row gap-5 mb-5 cursor-pointer w-fit"
        onClick={goHome}
      >
        <FaHome size={20} />
        <p className="text-md font-bold">My startup</p>
      </div>

      <h1 className="text-xl font-semibold mb-3">Add new phase</h1>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        id="description"
        type="text"
        placeholder="Phase name"
      />
      <input
        value={phaseDescription}
        onChange={(e) => setDescription(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        id="description"
        type="text"
        placeholder="Phase description"
      />

      {name && phaseDescription && (
        <button
          onClick={() => {
            addPhase({ variables: { name, phaseDescription } });
            setName("");
            setDescription("");
            goHome();
          }}
        >
          Add
        </button>
      )}
    </div>
  );
};
