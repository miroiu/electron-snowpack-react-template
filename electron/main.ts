import { app, BrowserWindow } from 'electron';
import path from 'path';

function createWindow(isProduction: boolean) {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			contextIsolation: true,
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	if (isProduction) {
		win.loadFile('./index.html');
	} else {
		win.webContents.openDevTools();
		win.loadURL('http://localhost:8080');
	}
}

app.whenReady().then(() => {
	const isProd = !process.argv.includes('--dev');
	createWindow(isProd);

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow(isProd);
		}
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
