import { useState, useEffect } from "react";
import BarraLateral from "../../components/BarraLateral";
import * as Z from "./styles";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import { Icon } from "leaflet";
import Calendario from "../../components/Calendario";
import diario from "../../assets/diario.png";
import semanal from "../../assets/semanal.png";
import mensal from "../../assets/mensal.png";
import estoque from "../../assets/estoque.png";
import axios from "axios";

export default function Dashboard() {
  const [markers, setMarkers] = useState([]);

  const fetchLocations = async () => {
    try {
      const response = await axios.get("http://localhost:3001/dashboard");
      setMarkers(response.data); 
    } catch (error) {
      console.error("Erro ao buscar localizações:", error);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const customIcon = new Icon({
    iconUrl: require("../../assets/pin_laranja.png"),
    iconSize: [25, 25]
  });


  return (
    <Z.Tela>
      <BarraLateral />
      <Z.MainContent>
        <Z.Container>
          <Z.Titulo>Dashboard</Z.Titulo>
          <Z.Informacoes>
            <Z.Imagens>
              <Z.ImagemA src={diario} alt="diario" />
              <Z.ImagemA src={semanal} alt="semanal" />
              <Z.ImagemA src={mensal} alt="mensal" />
            </Z.Imagens>
            <Z.ImagemB src={estoque} alt="estoque" />
            <Z.Mapa>
              <MapContainer center={[-22.9191, -42.8183]} zoom={13} style={{ height: "100%", width: "100%" }}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {markers.map((marker, i) => (
                  <Marker key={i} position={marker.geocode} icon={customIcon}>
                    <Popup>{marker.popup}</Popup>
                  </Marker>
                  ))
                }
                
              </MapContainer>
            </Z.Mapa>
            <Z.CalendarioContainer>
              <Calendario />
            </Z.CalendarioContainer>
          </Z.Informacoes>
        </Z.Container>
      </Z.MainContent>
    </Z.Tela>
  )
};