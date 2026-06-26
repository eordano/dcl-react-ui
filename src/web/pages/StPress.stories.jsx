import StPress from "./StPress.jsx";

export default {
  title: "Web/Pages/Press",
  component: StPress,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <StPress />,
};

export const Localized = {
  render: () => (
    <StPress
      title="Kit de Prensa de Decentraland"
      pageDescription="Hemos reunido todo tipo de recursos que puedes usar al escribir y hablar sobre nuestro proyecto. Dirige cualquier pregunta a "
      downloadButton="Descargar Kit de Prensa"
    />
  ),
};
