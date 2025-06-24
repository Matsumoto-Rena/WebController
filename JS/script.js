async function connectBluetooth() {
  try {
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true
    });

    document.getElementById("deviceName").textContent = `接続中: ${device.name || "名前なしデバイス"}`;
    const server = await device.gatt.connect();
    console.log("接続成功:", device.name);
  } catch (error) {
    console.error("接続失敗:", error);
  }
}
