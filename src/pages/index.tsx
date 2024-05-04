import Head from "next/head";
import Link from "next/link";

import { api } from "@/utils/api";
import { useState } from "react";

export default function Home() {
  const { data } = api.pokemon.getAllPokemon.useQuery();
  const newPokemonMutator = api.pokemon.createPokemon.useMutation();
  const [value, setValue] = useState("");
  const [link, setLink] = useState("");

  return (
    <>
      <div className="bg-black flex-1 min-h-screen">
        <div className="flex flex-col gap-8 p-32 text-white">
          <div>
            Create a pokemon
          </div>
          <div>
            Name
          </div>
          <input className="text-black" value={value} onChange={(e) => setValue(e.target.value)}>
          </input>
          <div>
            Image Link
          </div>
          <input className="text-black" value={link} onChange={(e) => setLink(e.target.value)}>
          </input>
          <button
            className="bg-white text-black p-2 rounded-md"
            onClick={() => {
              newPokemonMutator.mutate({
                name: value, imageLink: link
              }, {
                onSuccess: () => {
                  setValue("")
                  setLink("")
                }
              })
            }}
          >
            Create
          </button>


          {data?.map((pokemon) => (
            <div key={pokemon.id} >
              <div className="flex items-center gap-4">
                <img
                  className="h-16 w-16"
                  src={pokemon.imageLink}
                  alt={pokemon.name}
                />
                <span>{pokemon.name}</span>
              </div>
            </div>
          ))
          }
        </div>
      </div>
    </>
  );
}
