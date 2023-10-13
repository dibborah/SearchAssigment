import { useEffect, useState } from "react";

export default function Home() {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");
  const [singleSearch, setSingleSearch] = useState(null);

  const fetchData = () => {
    let p = fetch("https://pokeapi.co/api/v2/pokemon?limit=10");

    p.then((response) => response.json())
      .then((data) => {
        console.log(data.results);
        return setResults(data.results);
      })
      .catch((err) => console.log(err));
      
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  console.log(results)

  const handleSearch = (e) => {
    e.preventDefault();
    let p = fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);

    p.then((response) => response.json())
      .then((data) => {
        console.log(data);
        return setSingleSearch(data);
      })
      .catch((err) => console.log(err));
  };

  console.log(singleSearch);

  const handleDelete=(deleteName)=>{
    const newList = results.filter((poke)=>{
      return poke.name !== deleteName;
    })
    console.log(newList)
    setResults(newList);
  }

  useEffect(()=>{
    console.log(results);
  },[results])

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-black outline-gray-50 outline"
        />

        <button>Search</button>
      </form>

      {singleSearch === null ? (
        results.map((i) => (
          <div key={i.name}>
            {i.name}
            <img src={i.url} alt="" height={100} width={100} />
            <button onClick={()=>handleDelete(i.name)}>Delete</button>
          </div>
        ))
      ) : (

        <div>
          <p>
          {singleSearch.species.name 
          }
          </p>
          <img
          src= {singleSearch.sprites.back_default}
          alt={singleSearch.species.name}
          />

        </div>

      )}

    </div>
  );
}

// const newList = pokemons.filter((poke)=>poke.name !== deleteName);

// setPokemons(newList)

// Aitu jabo handleDelete ot and handle delete will take an argument of deleteName which will be passed from the map function, as the pokemon api returns name and url


