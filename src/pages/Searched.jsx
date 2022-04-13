import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import BeatLoader from "react-spinners/BeatLoader";

const Searched = () => {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  let params = useParams();

  const getSearched = async (name) => {
    const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=9&query=${name}`);
    const recipes = await data.json();

    // results untuk menampilkan masakannya
    // console.log(recipes.results);
    setLoading(false);
    return recipes.results;
  };

  useEffect(() => {
    let isMounted = true;
    // params.search parameter yang diberi pada Pages.jsx
    // params.search untuk mengambil nama pada menu
    getSearched(params.search).then((recipes) => {
      if (isMounted) setSearchedRecipes(recipes);
    });
    return () => {
      // kalau function getCuisine sudah dipanggil, ubah ke false
      isMounted = false;
    };
  }, [params.search]);

  return (
    <>
      {loading ? (
        <BeatLoader color={"#000000"} loading={loading} size={15} />
      ) : (
        !loading && (
          <Grid animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            {searchedRecipes.map((item) => {
              return (
                <Card key={item.id}>
                  <Link to={"/recipe/" + item.id}>
                    <img src={item.image} alt={item.title} />
                    <h4>{item.title}</h4>
                  </Link>
                </Card>
              );
            })}
          </Grid>
        )
      )}
    </>
  );
};

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 3rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Searched;
