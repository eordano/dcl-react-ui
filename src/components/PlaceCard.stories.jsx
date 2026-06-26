import PlaceCard from "./PlaceCard.jsx";
import "../explorer/pages/places.css";

export default {
  title: "Components/PlaceCard",
  component: PlaceCard,
  parameters: { layout: "centered" },
};

const Grid = ({ children }) => (
  <div className="pl" style={{ background: "#1c0a2e", padding: 24 }}>
    <div className="pl__grid" style={{ maxWidth: 280 }}>{children}</div>
  </div>
);

export const Featured = {
  render: () => (
    <Grid>
      <PlaceCard
        title="Genesis Plaza"
        creator="Decentraland Foundation"
        live={14}
        players={142}
        rating={100}
        coords="-3,-2"
        featured
        hue={0}
      />
    </Grid>
  ),
};

export const Standard = {
  render: () => (
    <Grid>
      <PlaceCard
        title="Bloom Garden"
        creator="limmagarden.dcl.eth"
        players={0}
        rating={100}
        coords="limmagarden.dcl.eth"
        hue={141}
      />
    </Grid>
  ),
};

export const Skeleton = {
  render: () => (
    <Grid>
      <PlaceCard title="" creator="" players={0} rating={0} hue={188} />
    </Grid>
  ),
};
