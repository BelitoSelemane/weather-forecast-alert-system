const queue = [];
let processing = false;

function addToQueue(task) {
    queue.push(task);
    console.log(`[Queue] Task added. Queue size: ${queue.length}`);
    processQueue();
}

async function processQueue() {
    if (processing || queue.length === 0) return;

    processing = true;
    const task = queue.shift();

    console.log(`[Queue] Processing task:`, task);

    // Simula processamento assíncrono (ex: enviar notificação, gravar log)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log(`[Queue] Task completed:`, task);
    processing = false;

    processQueue(); // processa a próxima, se houver
}

module.exports = { addToQueue };