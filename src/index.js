const {createWindow} = require('./main');
const { app } = require('electron');

require('./database/db');
require('electron-reload')(__dirname);

app.allowRendererProcessReuse = false;
app.whenReady().then(() => {
	createWindow()

	app.on('activate', () => {
	  if (BrowserWindow.getAllWindows().length === 0) {
		createWindow()
	  }
	})
})