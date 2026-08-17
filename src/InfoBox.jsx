import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import SunnyIcon from "@mui/icons-material/Sunny";
import AcUnitIcon from "@mui/icons-material/AcUnit";

import hotImg from "./assets/hot.jpg";
import rainImg from "./assets/rain.jpg";
import coldImg from "./assets/cold.jpg";

import "./InfoBox.css";

export default function InfoBox({ info }) {
  return (
    <div className="info-box">
      <Card className="weather-card">
        <CardMedia
          sx={{ height: 220 }}
          image={
            info.humidity > 80 ? rainImg : info.temp > 15 ? hotImg : coldImg
          }
        />

        <CardContent>
          <Typography variant="h5" gutterBottom>
            {info.city}{" "}
            {info.humidity > 80 ? (
              <ThunderstormIcon />
            ) : info.temp > 15 ? (
              <SunnyIcon />
            ) : (
              <AcUnitIcon />
            )}
          </Typography>

          <Typography component="div">
            <p>
              <strong>🌡 Temperature:</strong> {info.temp}°C
            </p>
            <p>
              <strong>🤗 Feels Like:</strong> {info.feelsLike}°C
            </p>
            <p>
              <strong>💧 Humidity:</strong> {info.humidity}%
            </p>
            <p>
              <strong>⬆ Max Temp:</strong> {info.tempMax}°C
            </p>
            <p>
              <strong>⬇ Min Temp:</strong> {info.tempMin}°C
            </p>
            <p>
              <strong>🌥 Weather:</strong> {info.weather}
            </p>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
