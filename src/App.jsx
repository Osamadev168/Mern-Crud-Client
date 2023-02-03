import axios from "axios";
import { useState, useEffect } from "react";
import BarChart from "./Bar";
const defaultValues = {
  productname: "",
  Price: 0,
  Quantity: 0,
};

const App = () => {
  const [data, setData] = useState(defaultValues);
  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState({
    labels: products.map((product) => product.productname),
    datasets: [
      {
        label: "Prices",
        data: products.map((product) => product.Price),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "red",
        borderWidth: 3,
      },
    ],
  });

  const getData = () => {
    axios.get("http://localhost:5000/products").then((res) => {
      setProducts(res.data);
    });
  };

  useEffect(() => {
    getData();
  }, [products]);
  const sendData = async () => {
    try {
      await axios.post("http://localhost:5000/post", data).then(() => {
        alert("Data Posted");
        console.log(data);
      });
    } catch (e) {
      console.log(e);
    }
  };
  const defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "right",
    location: "City",
  };
  return (
    <div>
      <div style={{ margin: 100 }}>
        <BarChart chartData={userData} />
      </div>
      <input
        name="productname"
        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
      />
      <input
        name="Price"
        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
      />
      <input
        name="Quantity"
        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
      />
      <button onClick={() => sendData()}>Send</button>

      <div>
        {products.length > 0 ? (
          products.map((product) => {
            const delData = () => {
              axios
                .delete(`http://localhost:5000/remove/${product._id}`)
                .then(() => {
                  alert("product removed");
                });
            };
            const updateData = () => {
              axios
                .patch(`http://localhost:5000/update/${product._id}`, data)
                .then(() => {
                  alert("product updated");
                });
            };
            return (
              <div>
                <h1>ProductName :{product.productname}</h1>
                <h1>Price : {product.Price}</h1>
                <h1>Quantity :{product.Quantity}</h1>

                <button onClick={() => delData()}>delete</button>
                <button onClick={() => updateData()}>update</button>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default App;
