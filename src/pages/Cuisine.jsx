import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  const [loading, setLoading] = useState(true);
  let params = useParams();

  const getCuisine = async (name) => {
    const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=9&cuisine=${name}`);
    const recipes = await data.json();

    // results untuk menampilkan masakannya
    // console.log(recipes.results);
    setLoading(false);
    return recipes.results;
  };

  useEffect(() => {
    document.title = `Recipe App | ${params.type}`;
    let isMounted = true;
    // params.type untuk mengambil nama pada menu
    getCuisine(params.type).then((recipes) => {
      if (isMounted) setCuisine(recipes);
    });
    return () => {
      // kalau function getCuisine sudah dipanggil, ubah ke false
      isMounted = false;
    };
  }, [params.type]);

  return (
    <>
      {loading ? (
        <LoadingIcon>
          <BeatLoader color={"#000000"} loading={loading} size={15} />
        </LoadingIcon>
      ) : (
        !loading && (
          <Grid animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }}>
            {cuisine.map((item) => {
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
}

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

const LoadingIcon = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
  height: 100vh;
`;

export default Cuisine;
