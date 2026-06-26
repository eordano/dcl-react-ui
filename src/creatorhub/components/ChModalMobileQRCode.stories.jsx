import ChModalMobileQRCode from "./ChModalMobileQRCode.jsx";

export default {
  title: "CreatorHub/Components/Mobile QR Code",
  component: ChModalMobileQRCode,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: {
    open: true,
    url: "http://192.168.1.42:8000/?realm=LocalPreview&position=0,0",
  },
};

export const Waiting = {
  args: {
    open: true,
    url: "http://192.168.1.42:8000/?realm=LocalPreview&position=0,0",
    sessions: [],
  },
};

export const Connected = {
  args: {
    open: true,
    url: "http://192.168.1.42:8000/?realm=LocalPreview&position=0,0",
    sessions: [{ id: 1, messageCount: 1284 }],
  },
};

export const MultipleSessions = {
  args: {
    open: true,
    url: "http://192.168.1.42:8000/?realm=LocalPreview&position=0,0",
    sessions: [
      { id: 1, messageCount: 1284 },
      { id: 2, messageCount: 57 },
    ],
  },
};

export const Live = {
  args: {
    open: true,
    url: "http://192.168.1.42:8000/?realm=LocalPreview&position=0,0",
    simulateLive: true,
  },
};
