const { app, BrowserWindow } = require("electron");

const mainWindow = () => {
  const win = new BrowserWindow({
    height: 800,
    width: 500,
  });

  win.loadFile("main_window/index.html");
};

app.whenReady().then(() => {
  mainWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
