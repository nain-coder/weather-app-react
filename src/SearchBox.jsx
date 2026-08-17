// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import "./SearchBox.css"
// import { useState } from "react";

// export default function SearchBox({ updateInfo }) {
//   const API_URL = "http://api.openweathermap.org/data/2.5/weather";
//   const API_KEY = "f87b6fc556b197032caef68aab130fa1";

//   let [city, setCity] = useState("");
//   let [error,setError]=useState(false)

//   let getWeatherInfo = async () => {

//   try{
//  let response = await fetch(
//       `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`,
//     );
//     let jsonResponse = await response.json();

//     let result = {
//       city: city,
//       temp: jsonResponse.main.temp,
//       tempMin: jsonResponse.main.temp_min,
//       tempMax: jsonResponse.main.temp_max,
//       humidity: jsonResponse.main.humidity,
//       feelsLike: jsonResponse.main.feels_like,
//       weather: jsonResponse.weather[0].description,
//     };
//     console.log(result);
//     return result;
//   }
//  catch(err){
//   throw err;
//  }
// };

//   let handleChange = (evt) => {
//     setCity(evt.target.value);
//   };

//   let handleSubmit = async (event) => {
//     try {
//       event.preventDefault();
//     console.log(city);
//     setCity("");
//   let newInfo= await  getWeatherInfo();
//   updateInfo(newInfo);
//     }
//     catch(err){
//       setError(true)
//     }
//   };

//   return (
//     <div className="search-box">
//       <form className="search-box form " onSubmit={handleSubmit}>
//         <TextField
//           id="city"
//           label="City name"
//           variant="outlined"
//           required
//           value={city}
//           onChange={handleChange}
//         />
//         <br />
//         <br />
//         <Button variant="contained" type="submit">
//           Search
//         </Button>
//         {error && <p className="error">No such place exists!</p>}
//       </form>
//     </div>
//   );
// }

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SearchBox.css";
import { useState } from "react";

export default function SearchBox({ updateInfo }) {
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "f87b6fc556b197032caef68aab130fa1";

  const [city, setCity] = useState("");
  const [error, setError] = useState(false);

  const getWeatherInfo = async () => {
    const response = await fetch(
      `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`,
    );

    const jsonResponse = await response.json();

    // If the city doesn't exist, throw an error
    if (!response.ok) {
      throw new Error(jsonResponse.message);
    }

    return {
      city: jsonResponse.name,
      temp: jsonResponse.main.temp,
      tempMin: jsonResponse.main.temp_min,
      tempMax: jsonResponse.main.temp_max,
      humidity: jsonResponse.main.humidity,
      feelsLike: jsonResponse.main.feels_like,
      weather: jsonResponse.weather[0].description,
    };
  };

  const handleChange = (e) => {
    setCity(e.target.value);

    // Remove the error as soon as the user starts typing again
    if (error) {
      setError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newInfo = await getWeatherInfo();

      updateInfo(newInfo);

      setError(false); // Hide error after successful search
      setCity("");
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  return (
    <div className="search-box">
      <form className="search-form" onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="City name"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
        />

        <Button variant="contained" type="submit">
          Search
        </Button>

        {error && (
          <p className="error">
            ❌ City not found. Please enter a valid city name.
          </p>
        )}
      </form>
    </div>
  );
}