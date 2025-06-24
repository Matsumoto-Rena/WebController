async function connectBluetooth() {
  try {
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true
    });

    const server = await device.gatt.connect();
    console.log("接続されたデバイス名:", device.name);
    document.getElementById("deviceName").textContent = `接続中: ${device.name || "名前なしデバイス"}`;
  } catch (error) {
    console.error("接続失敗:", error);
  }
}

