let device, characteristic;

async function connect() {
  try {
    device = await navigator.bluetooth.requestDevice({
      filters: [{ name: 'ESP32-BLE' }],
      optionalServices: ['12345678-1234-5678-1234-56789abcdef0']
    });

    document.getElementById("status").textContent = `接続中: ${device.name}`;

    const server = await device.gatt.connect();
    const service = await server.getPrimaryService('12345678-1234-5678-1234-56789abcdef0');
    characteristic = await service.getCharacteristic('abcdefab-1234-5678-1234-56789abcdef0');

    document.getElementById("status").textContent = `✅ 接続成功: ${device.name}`;
  } catch (error) {
    console.error("接続エラー:", error);
    document.getElementById("status").textContent = "❌ 接続失敗";
  }
}

async function writeLED(value) {
  if (!characteristic) {
    alert("先にBluetooth接続してください");
    return;
  }
  try {
    const encoder = new TextEncoder();
    await characteristic.writeValue(encoder.encode(value));
    console.log("送信成功:", value);
  } catch (error) {
    console.error("送信エラー:", error);
  }
}