import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import BeatLoader from "react-spinners/BeatLoader";

function Recipe() {
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");
  const [loading, setLoading] = useState(true);
  let params = useParams();

  const fetchDetails = async () => {
    const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
    const detailData = await data.json();

    setLoading(false);
    setDetails(detailData);
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  return (
    <>
      {loading ? (
        <LoadingIcon>
          <BeatLoader color={"#000000"} loading={loading} size={15} />
        </LoadingIcon>
      ) : (
        !loading && (
          <DetailWrapper animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }}>
            <div>
              <h2>{details.title}</h2>
              <img src={details.image} alt={details.title} />
            </div>
            <Info>
              <Button className={activeTab === "instructions" ? "active" : ""} onClick={() => setActiveTab("instructions")}>
                Instructions
              </Button>
              <Button className={activeTab === "ingredients" ? "active" : ""} onClick={() => setActiveTab("ingredients")}>
                Ingredients
              </Button>
              {activeTab === "instructions" ? (
                <div>
                  <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
                  <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
                </div>
              ) : (
                <ul>
                  {details.extendedIngredients.map((ingredient) => {
                    return <li key={ingredient.id}>{ingredient.original}</li>;
                  })}
                </ul>
              )}
            </Info>
          </DetailWrapper>
        )
      )}
    </>
  );
}

const DetailWrapper = styled(motion.div)`
  margin-top: 2rem;
  margin-bottom: 5rem;

  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }

  h2 {
    margin-bottom: 2rem;
  }
  h3 {
    font-size: 1rem;
    line-height: 1.8rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: #fff;
  border: 2px solid #000;
  margin-right: 2rem;
  font-weight: 600;
  cursor: pointer;
`;

const Info = styled.div`
  margin-left: 5rem;
`;

const LoadingIcon = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
  height: 100vh;
`;

export default Recipe;
